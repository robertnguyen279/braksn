import mongoose, { Document, model, Schema, Model } from 'mongoose';

export interface Category {
  name: string;
}

type CategoryDocument = Category & Document;

type CategoryModel = Model<CategoryDocument>;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const Category =
  (mongoose.models.Category as CategoryModel) ||
  model<CategoryDocument, CategoryModel>('Category', CategorySchema);

export default Category;
