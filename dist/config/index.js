"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@be-tic-tac-toe.e9upvfl.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=be-tic-tac-toe`;
const PORT = +(process.env.SERVER_PORT || 8000);
const ROUNDS = +(process.env.SERVER_ROUNDS || Math.floor(Math.random() * 11));
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN || "";
exports.config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: PORT,
        rounds: ROUNDS,
        jwt_secret: JWT_SECRET_TOKEN
    },
};
