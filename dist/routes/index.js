"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const authRoutes_1 = __importDefault(require("./authRoutes"));
function registerRoutes(app) {
    app.use('/auth', authRoutes_1.default);
    app.get("/health", (req, res) => {
        res.status(200).json({ message: "Server is healthy" });
    });
}
