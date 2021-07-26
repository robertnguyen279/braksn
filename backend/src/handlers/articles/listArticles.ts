import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import createError from 'http-errors';
import { commonMiddleware } from '@src/middlewares/middy';
import Article from '@src/models/Article';
import Category from '@src/models/Category';
import { Error } from 'mongoose';
import { parseQueryText } from '@src/helpers/common';

const listArticles: APIGatewayProxyHandler = async (event) => {
  let findArgs = {};
  const findTextKeys = ['title', 'description', 'content', 'author'];
  const skip = event.queryStringParameters.skip
    ? parseInt(event.queryStringParameters.skip)
    : 0;
  const limit = event.queryStringParameters.limit
    ? parseInt(event.queryStringParameters.limit)
    : 6;
  const sortBy = event.queryStringParameters.sortBy
    ? event.queryStringParameters.sortBy
    : 'createdAt';
  const order = event.queryStringParameters.order
    ? event.queryStringParameters.order
    : 'desc';

  const setTextArgs = (textKeys: Array<string>) => {
    let textArgs = [];

    textKeys.map((key) => {
      let findObj = {};
      findObj[key] = {
        $regex: parseQueryText(
          parseQueryText(event.queryStringParameters.text),
        ),
        $options: 'i',
      };
      textArgs.push(findObj);
    });

    return textArgs;
  };

  for (let key in event.queryStringParameters) {
    if (
      key !== 'skip' &&
      key !== 'limit' &&
      key !== 'sortBy' &&
      key !== 'order' &&
      key !== 'text' &&
      key !== 'author'
    ) {
      findArgs[key] = event.queryStringParameters[key].toLowerCase();
    } else if (key === 'text') {
      findArgs['$or'] = setTextArgs(findTextKeys);
    }
  }

  try {
    const articles = await Article.find(findArgs)
      .skip(skip)
      .limit(limit)
      .sort([[sortBy, order]])
      .populate({
        path: 'category',
        model: Category,
        select: 'name -_id',
      });

    if (!articles) {
      throw new Error('No article found.');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, size: articles.length, articles }),
    };
  } catch (error) {
    throw new createError.InternalServerError(
      JSON.stringify({ message: error.message }),
    );
  }
};

export const handler = commonMiddleware(listArticles);
