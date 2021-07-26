import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { authMiddleware } from '@src/middlewares/middy';
import User from '@src/models/User';
import Article from '@src/models/Article';
import createError from 'http-errors';

const listSavedArticles: APIGatewayProxyHandler = async (event) => {
  try {
    const { authUser } = JSON.parse(event.body);

    const skip = event.queryStringParameters.skip
      ? parseInt(event.queryStringParameters.skip)
      : 0;
    const limit = event.queryStringParameters.limit
      ? parseInt(event.queryStringParameters.limit)
      : 6;

    const user = await User.findById(authUser._id)
      .select('saveArticles -_id')
      .populate({
        path: 'saveArticles',
        model: Article,
        options: {
          limit,
          skip,
        },
      });

    if (!user.saveArticles) {
      throw new Error('No articles found.');
    }

    return {
      statusCode: 200,
      body: JSON.stringify(user.saveArticles),
    };
  } catch (error) {
    return new createError.InternalServerError(
      JSON.stringify({ message: error.message }),
    );
  }
};

export const handler = authMiddleware(listSavedArticles);
