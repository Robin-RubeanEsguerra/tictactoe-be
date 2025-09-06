import GameInstanceDao, { IGameInstanceModel } from "../daos/GameInstanceDao";
import { IGameInstance } from "../models/GameInstance";
import {
  GameInstanceAlreadyCompletedError,
  UnableToCreateGameInstanceError,
  UnableToFindGameInstanceError,
} from "../utils/errors";

export async function create(gameInstanceData: Partial<IGameInstance>) {
  try {
    const newGameInstance = await GameInstanceDao.create(gameInstanceData);
    return newGameInstance;
  } catch (error: any) {
    throw error
  }
}

export async function findByUuid(
  gameUuid: string
): Promise<IGameInstanceModel | null> {
  try {
    const gameInstance = await GameInstanceDao.findOne({ gameUuid }).populate(
      "gameRounds"
    );
    return gameInstance;
  } catch (error: any) {
    throw error
  }
}

export async function all() {
  try {
    const gameInstances = await GameInstanceDao.find();
    return gameInstances;
  } catch (error: any) {
    throw error;
  }
}

export async function endGame(gameUuid: string) {
  try {
    const gameInstance = await GameInstanceDao.findOne({ gameUuid });

    if (!gameInstance) {
      throw new UnableToFindGameInstanceError();
    }
    if (gameInstance.status === "completed") {
      throw new GameInstanceAlreadyCompletedError();
    }

    let victor: 0 | 1 | 2 = 0;

    if (gameInstance.score.player1 > gameInstance.score.player2) {
      victor = 1;
    } else if (gameInstance.score.player2 > gameInstance.score.player1) {
      victor = 2;
    }
    gameInstance.winner = victor;
    gameInstance.status = "completed";

    await gameInstance.save();
    return gameInstance;
  } catch (error: any) {
    throw error; 
  }
}
