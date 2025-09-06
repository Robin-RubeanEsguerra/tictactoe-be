import {Express,Request,Response} from "express";
import authRoutes from "./authRoutes";

export function registerRoutes(app: Express){
    app.use('/auth', authRoutes);
      app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is healthy" });
});
}