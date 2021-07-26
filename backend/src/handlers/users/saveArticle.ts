import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { authMiddleware } from '@src/middlewares/middy';
import createError from 'http-errors';
import User from '@src/models/User';
import Article from '@src/models/Article';

const saveArticle: APIGatewayProxyHandler = async (event) => {
  try {
    const { authUser } = JSON.parse(event.body);
    const newsId = event.pathParameters.id;
    const action = event.queryStringParameters.action;

    if (!action) {
      throw new Error('Action must be provided.');
    }

    const article = await Article.findById(newsId);
    if (!article) {
      throw new Error('No article found.');
    }

    if (action === 'save') {
      if (authUser.saveArticles.includes(newsId)) {
        throw new Error('Article already exists.');
      }

      await User.findByIdAndUpdate(authUser._id, {
        $push: { saveArticles: newsId },
      });
    } else if (action === 'remove') {
      if (!authUser.saveArticles.includes(newsId)) {
        throw new Error('Article does not exist.');
      }

      await User.findByIdAndUpdate(authUser._id, {
        $pull: { saveArticles: newsId },
      });
    } else {
      throw new Error('Action does not correct.');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    throw new createError.InternalServerError(
      JSON.stringify({ message: error.message }),
    );
  }
};

export const handler = authMiddleware(saveArticle);
