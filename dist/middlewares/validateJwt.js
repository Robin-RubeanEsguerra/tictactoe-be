"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJwt = validateJwt;
const jsonwebtoken_1 = require("jsonwebtoken");
function validateJwt(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access token missing or malformed" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decode = (0, jsonwebtoken_1.verify)(token, String(process.env.JWT_SECRET_TOKEN));
        req.user = {
            email: decode.data.email,
            username: decode.data.username,
            userUuid: decode.data.userUuid,
        };
        next();
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            if (error.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Unauthorized: Missingss or invalid token" });
            }
            else if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Unauthorized: Token Expired" });
            }
        }
        res.status(500).json({ message: "Internal Server Error: Invalid token" });
        return;
    }
}
