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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.healthCheckUser = healthCheckUser;
const userService_1 = require("../services/userService");
const errors_1 = require("../utils/errors");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = req.body;
        try {
            const newUser = yield (0, userService_1.create)(user);
            newUser.accessToken = "";
            newUser.refreshToken = "";
            newUser.accessTokenExpiration = 0;
            res.status(201).json(newUser);
        }
        catch (err) {
            if (err.message.includes("E11000 duplicate key error collection:"))
                res.status(409).json({ message: "Username or email already exists" });
            else
                res.status(500).json({ message: err.message });
        }
    });
}
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const credentials = req.body;
        try {
            const user = yield (0, userService_1.login)(credentials);
            res.status(200).json(user);
        }
        catch (err) {
            if (err instanceof errors_1.InvalidCredentialsError)
                res.status(401).json({ message: err.message });
            else
                res.status(500).json({ message: err.message });
        }
    });
}
function logoutUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Access token missing or malformed" });
        }
        const accessToken = authHeader.split(' ')[1];
        try {
            const result = yield (0, userService_1.logout)(accessToken);
            if (!result.success) {
                return res.status(400).json({ message: "Logout failed" });
            }
            // If you use refresh tokens in cookies, clear them here as well (optional)
            res.clearCookie("bcjwt", {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            });
            return res.sendStatus(204);
        }
        catch (error) {
            console.error("Logout error:", error);
            return res.status(500).json({ message: "Server error during logout" });
        }
    });
}
function healthCheckUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Access token missing or malformed" });
        }
        const accessToken = authHeader.split(' ')[1];
        try {
            const result = yield (0, userService_1.healthCheck)(accessToken);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error("Health check error:", error);
            return res.status(500).json({ message: "Server Health check failed" });
        }
    });
}
exports.default = { createUser, loginUser, logoutUser, healthCheckUser };
