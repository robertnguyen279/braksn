import mongoose, { Document, model, Schema, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  genders?: 'Male' | 'Female';
  type: 'GoogleAuth' | 'FacebookAuth' | 'TraditionalAuth';
  birthday?: string;
  role: Number;
  favoriteCategories?: Array<string>;
  saveArticles?: Array<string>;
  token: Array<string>;
}

interface UserDocument extends User, Document {
  generateSessionToken(): Promise<string>;
  generateFullName(): string;
}

interface UserModel extends Model<UserDocument> {
  generateHashPassword(password: string): Promise<string>;
  findByToken(token: string): Promise<Model<UserDocument>>;
}

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: (value: string) => {
        if (!validator.isEmail(value)) throw new Error('Email is invalid.');
      },
    },
    password: {
      type: String,
      validate: (value: string) => {
        if (/\s/.test(value))
          throw new Error('Password cannot contain whitespace.');
        if (!/[a-zA-Z]/.test(value) || !/\d/.test(value))
          throw new Error('Password must contain both number and character.');
      },
    },
    avatar: {
      type: String,
    },
    role: {
      type: Number,
      enum: [0, 1, 2],
      default: 0,
    },
    accountType: {
      type: String,
      enum: ['GoogleAuth', 'FacebookAuth', 'TraditionalAuth'],
      default: 'TraditionalAuth',
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    token: {
      type: Array,
    },
    saveArticles: [
      {
        type: Schema.Types.ObjectId,
        ref: 'New',
      },
    ],
  },
  {
    timestamps: true,
  },
);

UserSchema.statics.generateHashPassword = async (password: string) =>
  bcrypt.hash(password, 8);

interface Token {
  email: string;
  userId: string;
}

UserSchema.statics.findByToken = async (token: string) => {
  const { email, userId }: Token = jwtDecode(token);

  return User.findOne({
    email,
    _id: userId,
    // @ts-ignore
    token: { $in: token },
  }).select('-password -token -saveArticles');
};

UserSchema.methods.generateSessionToken = async function (
  this: UserDocument,
): Promise<any> {
  const sessionToken = await jwt.sign(
    { userId: this.id, email: this.email, type: 'BeehiveAuth' },
    process.env.JWT_SECRET,
  );

  this.token = this.token.concat(sessionToken);
  await this.save();
  return sessionToken;
};
const User =
  (mongoose.models.User as UserModel) ||
  model<UserDocument, UserModel>('User', UserSchema);

export default User;
