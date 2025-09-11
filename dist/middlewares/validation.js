"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schemas = void 0;
exports.validateUser = validateUser;
const joi_1 = __importDefault(require("joi"));
// ✅ User validation schemas
exports.Schemas = {
    user: {
        create: joi_1.default.object({
            username: joi_1.default.string()
                .min(3)
                .max(30)
                .required()
                .messages({
                "string.base": "Username must be a string",
                "string.empty": "Username is required",
                "string.min": "Username must be at least 3 characters",
                "string.max": "Username must be at most 30 characters",
            }),
            password: joi_1.default.string()
                .min(6)
                .required()
                .messages({
                "string.base": "Password must be a string",
                "string.empty": "Password is required",
                "string.min": "Password must be at least 6 characters",
            }),
            email: joi_1.default.string()
                .email()
                .required()
                .messages({
                "string.email": "Email must be a valid email address",
                "string.empty": "Email is required",
            }),
        }),
        login: joi_1.default.object({
            email: joi_1.default.string()
                .email()
                .required()
                .messages({
                "string.email": "Email must be a valid email address",
                "string.empty": "Email is required",
            }),
            password: joi_1.default.string()
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
function validateUser(schema) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield schema.validateAsync(req.body, { abortEarly: false });
            next();
        }
        catch (error) {
            if (error instanceof joi_1.default.ValidationError) {
                const details = error.details.map(detail => detail.message);
                return res.status(400).json({ message: "Validation failed", errors: details });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
