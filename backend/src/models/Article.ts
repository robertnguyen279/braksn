import mongoose, { Document, model, Schema, Model } from 'mongoose';

export interface Article {
  articleId: string;
  title: string;
  description: string;
  content: string;
  source: string;
  category: mongoose.Types.ObjectId;
  urlToImage: string;
  view: number;
  author: string;
  url: string;
  publishedAt: string;
  comment: Array<mongoose.Types.ObjectId>;
}

type ArticleDocument = Article & Document;

type ArticleModel = Model<ArticleDocument>;

const ArticleSchema = new Schema(
  {
    articleId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    source: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
      href: 'Category',
    },
    urlToImage: {
      type: String,
      required: true,
    },
    view: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: String,
      required: true,
    },
    comments: [{ type: mongoose.Types.ObjectId, href: 'Comment' }],
  },
  {
    timestamps: true,
  },
);

const Article =
  (mongoose.models.Article as ArticleModel) ||
  model<ArticleDocument, ArticleModel>('Article', ArticleSchema);

export default Article;
