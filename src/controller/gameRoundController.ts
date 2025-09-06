import { Request, Response } from "express";
import { create, endRound } from "../services/gameRoundService";
import { AppError } from "../utils/errors";

export async function createGameRound(req: Request, res: Response) {
  try {
    const { gameUuid } = req.params;
    const gameRoundData = req.body;
    
    const newGameRound = await create(gameRoundData, gameUuid);
    res.status(201).json(newGameRound);
  } catch (error: any) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An error occurred while creating the game round" });
    }
  }
}

export async function endGameRound(req: Request, res: Response) {
  try {
    const { gameRoundUuid } = req.params;
    const { winner } = req.body; 
    const updatedRound = await endRound(gameRoundUuid, winner);
    res.status(200).json(updatedRound);
  } catch (error: any) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An error occurred while ending the game round" });
    }
  }
}