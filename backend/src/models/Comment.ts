import mongoose, { Document, model, Schema, Model } from 'mongoose';

export interface Comment {
  content: string;
  postBy: mongoose.Types.ObjectId;
  comments: Array<mongoose.Types.ObjectId>;
}

type CommentDocument = Comment & Document;

type CommentModel = Model<CommentDocument>;

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      href: 'User',
    },
    comments: [{ type: mongoose.Types.ObjectId, href: 'Comment' }],
  },
  {
    timestamps: true,
  },
);

const Comment =
  (mongoose.models.Comment as CommentModel) ||
  model<CommentDocument, CommentModel>('Comment', CommentSchema);

export default Comment;
