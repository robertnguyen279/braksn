import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import createError from 'http-errors';
import { commonMiddleware } from '@src/middlewares/middy';
import Article from '@src/models/Article';
import Comment from '@src/models/Comment';
import Category from '@src/models/Category';
import User from '@src/models/User';
import { Error } from 'mongoose';

const readArticle: APIGatewayProxyHandler = async (event) => {
  try {
    const id = event.pathParameters.id;
    const article = await Article.findByIdAndUpdate(
      id,
      {
        $inc: { view: 1 },
      },
      { new: true },
    )
      .populate({
        path: 'comments',
        model: Comment,
        populate: [
          {
            path: 'postBy',
            model: User,
            select: 'firstName lastName avatar -_id',
          },
          {
            path: 'comments',
            model: Comment,
            populate: {
              path: 'postBy',
              model: User,
              select: 'firstName lastName avatar -_id',
            },
          },
        ],
        select: 'content postBy -_id',
      })
      .populate({
        path: 'category',
        model: Category,
        select: 'name -_id',
      });

    if (!article) {
      throw new Error('No article found.');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ article }),
    };
  } catch (error) {
    throw new createError.InternalServerError(
      JSON.stringify({ message: error.message }),
    );
  }
};

export const handler = commonMiddleware(readArticle);
