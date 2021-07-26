import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import createError from 'http-errors';
import User from '@src/models/User';
import { commonMiddleware } from '@src/middlewares/middy';
import bcrypt from 'bcryptjs';

const loginUser: APIGatewayProxyHandler = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);
    const user = await User.findOne({ email });

    if (!user)
      throw new createError.InternalServerError(
        JSON.stringify('User not found.'),
      );

    if (!user.password || !bcrypt.compareSync(password, user.password)) {
      throw new createError.InternalServerError(
        JSON.stringify('Incorrect password.'),
      );
    }

    const token = await user.generateSessionToken();
    user.password = undefined;
    user.token = undefined;

    return {
      statusCode: 200,
      body: JSON.stringify({ user, token }),
    };
  } catch (error) {
    throw new createError.InternalServerError(
      JSON.stringify({ message: error.message }),
    );
  }
};

export const handler = commonMiddleware(loginUser);
