import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";


type Decoded = {
    data: {
        email: string;
        username: string;
    };
};

type RequestAuthUser = Request & {
    user?: {
        email: string;
        username: string;
    };
};
export function validateJwt(req: RequestAuthUser, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access token missing or malformed" });
    }
    const token = authHeader.split(" ")[1];
   
    try{
        const decode = verify(
            token,
            String(process.env.JWT_SECRET_TOKEN)
        ) as Decoded;
        req.user = {
            email: decode.data.email,
            username: decode.data.username,
        };
        next();
    }catch(error){
        console.log(error);
        if (error instanceof Error) {
            if (error.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Unauthorized: Missingss or invalid token" });
            } else if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Unauthorized: Token Expired" });
            }
        }
        res.status(500).json({ message: "Internal Server Error: Invalid token" });
        return;
    }
}