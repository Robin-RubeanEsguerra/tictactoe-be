import mongoose, { Schema, model } from "mongoose";
import { IUser } from "../models/User";

export interface IUserModel extends IUser,Document{};

const userSchema = new Schema({
  username: { type: String, required: true, },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  accessToken: { type: String },
  refreshToken: { type: String },
  accessTokenExpiration: { type: Number },
});


export default mongoose.model<IUserModel>("User", userSchema);
