import { Request, Response } from "express";
import { all, create, endGame } from "../services/gameInstanceService";
import { AppError } from "../utils/errors";


export async function createGameInstance(req: Request, res: Response) {
  try {
    const gameInstanceData = req.body;
    const newGameInstance = await create(gameInstanceData);
    res.status(201).json(newGameInstance);
  } catch (error: any) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An error occurred while creating the game instance" });
    }
  }
}

export async function getGameInstanceAll(req: Request, res: Response) {
  try {
    const gameInstances = await all();
    res.status(200).json(gameInstances);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export async function endGameInstance(req: Request, res: Response) {
  try {
    const { gameUuid } = req.params;
    const updatedGameInstance = await endGame(gameUuid,);
    res.status(200).json(updatedGameInstance);
  } catch (error: any) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An error occurred while ending the game instance" });
    }
  }
}