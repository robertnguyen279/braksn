import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { authMiddleware } from '@src/middlewares/middy';
import createError from 'http-errors';
import User from '@src/models/User';

const updateAvatar: APIGatewayProxyHandler = async (event) => {
  try {
    const { authUser, newAvatarUrl } = JSON.parse(event.body);

    await User.findByIdAndUpdate(authUser._id, {
      avatar: newAvatarUrl,
    });

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

export const handler = authMiddleware(updateAvatar);
