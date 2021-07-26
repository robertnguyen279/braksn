import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { authMiddleware } from '@src/middlewares/middy';
import createError from 'http-errors';
import User from '@src/models/User';

const readUser: APIGatewayProxyHandler = async (event) => {
  try {
    const { authUser } = JSON.parse(event.body);

    const user = await User.findById(authUser._id);

    return {
      statusCode: 200,
      body: JSON.stringify({ totalCount: user.saveArticles.length }),
    };
  } catch (error) {
    return new createError.InternalServerError(
      JSON.stringify({ message: error.message }),
    );
  }
};

export const handler = authMiddleware(readUser);
