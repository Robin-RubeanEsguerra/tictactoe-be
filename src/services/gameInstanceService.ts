import GameInstanceDao, { IGameInstanceModel } from "../daos/GameInstanceDao";
import GameRoundDao from "../daos/GameRoundDao";
import { IGameInstance } from "../models/GameInstance";
import {
  GameInstanceAlreadyCompletedError,
  UnableToCreateGameInstanceError,
  UnableToFindGameInstanceError,
} from "../utils/errors";

export async function create(
  gameInstanceData: Partial<IGameInstance>,
  userUuid: string
) {
  try {
    const newGameInstance = await GameInstanceDao.create(gameInstanceData);
    newGameInstance.userUuid = userUuid;
    newGameInstance.save();
    return newGameInstance;
  } catch (error: any) {
    throw error;
  }
}

export async function findByUuid(gameUuid: string): Promise<any | null> {
  try {
    const gameInstances = await GameInstanceDao.aggregate([
      { $match: { gameUuid } },
      {
        $lookup: {
          from: "gamerounds",
          localField: "gameRounds",
          foreignField: "gameUuid",
          as: "gameRound",
        },
      },
    ]);

    if (!gameInstances || gameInstances.length === 0) {
      throw new UnableToFindGameInstanceError();
    }

    return gameInstances[0]; // Return the first matched game instance
  } catch (error: any) {
    throw error;
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

    const gameRounds = await GameRoundDao.find({ gameUuid });

    let player1Score = 0;
    let player2Score = 0;
    let draws = 0;

    for (const round of gameRounds) {
      if (round.winner === 1) {
        player1Score++;
      } else if (round.winner === 2) {
        player2Score++;
      } else if (round.winner === 0) {
        draws++;
      }
    }

    // ✅ Update the instance's score first
    gameInstance.score = {
      player1: player1Score,
      player2: player2Score,
    };

    // ✅ Now determine the winner from updated scores
    const victor =
      player1Score > player2Score
        ? "1"
        : player2Score > player1Score
        ? "2"
        : "tie";

    gameInstance.winner = victor;
    gameInstance.status = "completed";
    gameInstance.roundsPlayed = gameRounds.length;
    gameInstance.updatedAt = new Date();

    await gameInstance.save();
    return gameInstance;
  } catch (error: any) {
    throw error;
  }
}

export async function getByUser(userUuid: string) {
  try {
    const gameInstances = await GameInstanceDao.find({ userUuid });
    if (!gameInstances || gameInstances.length === 0) {
      return null;
    }

    const cleanedGameInstances = await Promise.all(
      gameInstances.map(async (gameInstance) => {
        const gameRounds = await GameRoundDao.find({
          gameUuid: gameInstance.gameUuid,
        });
        return {
          ...gameInstance.toObject(), 
          gameRounds,
        };
      })  
    );

    return {items:cleanedGameInstances};
  } catch (error: any) {
    throw error;
  }
}
