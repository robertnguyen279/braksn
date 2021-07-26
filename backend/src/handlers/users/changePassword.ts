import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { authMiddleware } from '@src/middlewares/middy';
import createError from 'http-errors';
import User from '@src/models/User';
import bcrypt from 'bcryptjs';

const changePassword: APIGatewayProxyHandler = async (event) => {
  try {
    const { authUser, oldPassword, newPassword } = JSON.parse(event.body);

    if (oldPassword === newPassword) {
      throw new Error('New password must be different from old one.');
    }

    const user = await User.findById(authUser._id);

    if (!user) throw new Error('User not found.');

    if (!user.password || !bcrypt.compareSync(oldPassword, user.password)) {
      throw new Error('Incorrect password.');
    }

    user.password = await User.generateHashPassword(newPassword);
    await user.save();

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

export const handler = authMiddleware(changePassword);
