import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME:string = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD:string = process.env.MONGO_PASSWORD || "";

const MONGO_URL:string = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@be-tic-tac-toe.e9upvfl.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=be-tic-tac-toe`;

const PORT: number = +(process.env.SERVER_PORT || 8000);
const ROUNDS: number = +(process.env.SERVER_ROUNDS || Math.floor(Math.random()*11));
const JWT_SECRET_TOKEN: string = process.env.JWT_SECRET_TOKEN || "";
export const config = {
    mongo:{
        url: MONGO_URL
    },
    server:{
        port: PORT,
        rounds: ROUNDS,
        jwt_secret:JWT_SECRET_TOKEN
    },
}