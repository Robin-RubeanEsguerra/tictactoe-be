import { Types } from "mongoose";

export interface IUser  {
    id: Types.ObjectId;
    username: string;
    password: string;
    email:string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiration: number;
} 