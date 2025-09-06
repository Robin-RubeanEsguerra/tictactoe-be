import {Express,Request,Response} from "express";
import authRoutes from "./authRoutes";
import gameInstanceRouter from "./gameInstanceRouter";
import gameRoundRouter from "./gameRoundRouter";
import moveRouter from "./moveRouter";

export function registerRoutes(app: Express){
    app.use('/auth', authRoutes);
    app.use('/game-instance', gameInstanceRouter);
    app.use('/game-round', gameRoundRouter);
    app.use('/move', moveRouter);

// Health check endpoint
    app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is healthy" });
});
}