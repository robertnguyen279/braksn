import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import createError from 'http-errors';
import { commonMiddleware } from '@src/middlewares/middy';
import Article from '@src/models/Article';
import axios from 'axios';
import mongoose from 'mongoose';
import Category from '@src/models/Category';

const addArticle: APIGatewayProxyHandler = async () => {
  try {
    const categories = await Category.find();
    await Promise.all(
      categories.map(async (category) => {
        const results = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=sg&category=${category.name.toLowerCase()}&apiKey=${
            process.env.NEWS_API_KEY
          }`,
        );

        const articles = results.data.articles.filter(
          (article) => article.content && article.urlToImage,
        );
        await Promise.all(
          articles.map(async (article) => {
            const articleDoc = new Article({
              ...article,
              articleId: `${article.title}-${article.publishedAt}`,
              source: article.source.name,
              category: mongoose.Types.ObjectId(category._id),
            });

            try {
              await articleDoc.save();
            } catch (err) {
              return true;
            }
          }),
        );
      }),
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'OK' }),
    };
  } catch (error) {
    throw new createError.InternalServerError(
      JSON.stringify({ message: error.message }),
    );
  }
};

export const handler = commonMiddleware(addArticle);
