import * as mongoose from 'mongoose';
import { User } from './user.interface';

export const UserSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
