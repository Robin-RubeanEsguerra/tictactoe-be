import { Request, Response } from "express";
import { create } from "../services/moveService";
import { AppError } from "../utils/errors";

export async function createMove(req: Request, res: Response) {
  try {
    const { gameRoundUuid } = req.params;
    const moveData = req.body;
    const newMove = await create(moveData, gameRoundUuid);
    res.status(201).json(newMove);
  } catch (error: any) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An error occurred while creating the move" });
    }
  }
}
