import { Types } from "mongoose";

export interface IUser  {
    id: Types.ObjectId;
    userUuid: string;
    username: string;
    password: string;
    email:string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiration: number;
} 