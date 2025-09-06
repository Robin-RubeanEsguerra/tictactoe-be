"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = registerRoutes;
const authRoutes_1 = __importDefault(require("./authRoutes"));
const gameInstanceRouter_1 = __importDefault(require("./gameInstanceRouter"));
const gameRoundRouter_1 = __importDefault(require("./gameRoundRouter"));
const moveRouter_1 = __importDefault(require("./moveRouter"));
function registerRoutes(app) {
    app.use('/auth', authRoutes_1.default);
    app.use('/game-instance', gameInstanceRouter_1.default);
    app.use('/game-round', gameRoundRouter_1.default);
    app.use('/move', moveRouter_1.default);
    // Health check endpoint
    app.get("/health", (req, res) => {
        res.status(200).json({ message: "Server is healthy" });
    });
}
