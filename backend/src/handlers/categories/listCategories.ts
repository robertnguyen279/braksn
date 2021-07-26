import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import createError from 'http-errors';
import { commonMiddleware } from '@src/middlewares/middy';
import Category from '@src/models/Category';

const listCategories: APIGatewayProxyHandler = async () => {
  try {
    const categories = await Category.find();
    if (!categories) {
      throw new Error('No category found.');
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ categories }),
    };
  } catch (error) {
    throw new createError.InternalServerError(
      JSON.stringify({ message: error.message }),
    );
  }
};

export const handler = commonMiddleware(listCategories);
