import mongoose, { Schema, model } from "mongoose";
import { IUser } from "../models/User";
import { randomUUID } from "crypto";

export interface IUserModel extends IUser, Document {}

const userSchema = new Schema({
  userUuid: {
    type: String,
    required: true,
    default: randomUUID,
    unique: true,
    index: true,
  },
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  accessToken: { type: String },
  refreshToken: { type: String },
  accessTokenExpiration: { type: Number },
});

export default mongoose.model<IUserModel>("User", userSchema);
