import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import createError from 'http-errors';
import { authMiddleware } from '@src/middlewares/middy';
import Comment from '@src/models/Comment';
import Article from '@src/models/Article';

const postComment: APIGatewayProxyHandler = async (event) => {
  try {
    const { content, postFor, postType, authUser } = JSON.parse(event.body);

    if (postType === 'article') {
      const comment = new Comment({ content, postBy: authUser._id });
      await comment.save();
      await Article.findByIdAndUpdate(postFor, {
        $push: { comments: comment._id },
      });
    } else if (postType === 'comment') {
      const comment = new Comment({ content, postBy: authUser._id });
      await comment.save();
      await Comment.findByIdAndUpdate(postFor, {
        $push: { comments: comment._id },
      });
    } else {
      throw new Error('postType is invalid.');
    }
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

export const handler = authMiddleware(postComment);
