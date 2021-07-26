import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { authMiddleware } from '@src/middlewares/middy';
import User from '@src/models/User';
import createError from 'http-errors';

const logOut: APIGatewayProxyHandler = async (event) => {
  try {
    const { authUser } = JSON.parse(event.body);

    const token = event.headers.Authorization.split(' ')[1];

    await User.findByIdAndUpdate(authUser._id, { $pull: { token } });

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

export const handler = authMiddleware(logOut);
