import { Document, Schema, model, models } from "mongoose";
export interface IUser {
  clerkId: string;
  planId?: string;
  creditBalance: number;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  photo: string;
}

export const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  planId: { type: String },
  creditBalance: {
    type: Number,
    default: 10,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

const User = models.User || model("User", UserSchema);
export default User;
