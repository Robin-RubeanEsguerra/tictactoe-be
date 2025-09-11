import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/User"; // Assuming you still need this for types

// ✅ User validation schemas
export const Schemas = {
  user: {
    create: Joi.object<IUser>({
      username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
          "string.base": "Username must be a string",
          "string.empty": "Username is required",
          "string.min": "Username must be at least 3 characters",
          "string.max": "Username must be at most 30 characters",
        }),

      password: Joi.string()
        .min(6)
        .required()
        .messages({
          "string.base": "Password must be a string",
          "string.empty": "Password is required",
          "string.min": "Password must be at least 6 characters",
        }),

      email: Joi.string()
        .email()
        .required()
        .messages({
          "string.email": "Email must be a valid email address",
          "string.empty": "Email is required",
        }),
    }),

    login: Joi.object<IUser>({
      email: Joi.string()
        .email()
        .required()
        .messages({
          "string.email": "Email must be a valid email address",
          "string.empty": "Email is required",
        }),

      password: Joi.string()
        .min(6)
        .required()
        .messages({
          "string.empty": "Password is required",
          "string.min": "Password must be at least 6 characters",
        }),
    }),
  },
};

// ✅ Validation middleware
export function validateUser(schema: ObjectSchema<IUser>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        const details = error.details.map(detail => detail.message);
        return res.status(400).json({ message: "Validation failed", errors: details });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
