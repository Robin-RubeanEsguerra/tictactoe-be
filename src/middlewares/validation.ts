import Joi, { ObjectSchema } from "joi";

import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/User";
import { login } from "../services/userService";

export function validateUser(schema: ObjectSchema<IUser>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(400).json({ message: "Object validation failed" });
    }
  };
}

export const Schemas = {
  user:{
  create: Joi.object<IUser>({
      username: Joi.string().min(3).max(30).required(),
      password: Joi.string().min(6).required(),
      email: Joi.string().email().required(),
    }),
    login: Joi.object<IUser>({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
      }),   
}
};