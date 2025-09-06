import GameInstanceDao from "../daos/GameInstanceDao";
import GameRoundDao from "../daos/GameRoundDao";
import { IGameRound } from "../models/GameRound";
import { GameInstanceAlreadyCompletedError, GameRoundAlreadyCompletedError, MissingGameUuidError, UnableToCreateGameInstanceError, UnableToFindGameInstanceError, UnableToFindGameRoundError } from "../utils/errors";

export async function create(
  gameRoundData: Partial<IGameRound>,
  gameUuid?: string
) {
  try {
    if (!gameUuid) {
      throw new MissingGameUuidError();
    }

    const gameInstance = await GameInstanceDao.findOne({ gameUuid });
    if (!gameInstance) {
      throw new UnableToFindGameInstanceError();
    }

    if(gameInstance.status === "completed") {
      throw new GameInstanceAlreadyCompletedError();
    }
    
    const newGameRound = new GameRoundDao({
      ...gameRoundData,
      gameUuid: gameInstance.gameUuid,
      gameInstance: gameInstance._id,
      status: "ongoing", 
    });

    const updateGameInstance = await GameInstanceDao.findOneAndUpdate(
      { gameUuid },
      {
        $push: { gameRounds: newGameRound.gameRoundUuid },
        $inc: { roundsPlayed: 1 },
      },
      { new: true }
    );

    const savedGameRound = await newGameRound.save();

    return { savedGameRound, savedGameInstance: updateGameInstance };
  } catch (error: any) {
    throw  error;
  }
}
export async function endRound(
  gameRoundUuid: string,
  winner: number 
) {
  try {
    const gameRound = await GameRoundDao.findOne({ gameRoundUuid });

    if (!gameRound) {
      throw new UnableToFindGameRoundError();
    }

    if (gameRound.status === "completed") {
      throw new GameRoundAlreadyCompletedError();
    }

    gameRound.winner = winner;
    gameRound.status = "completed";
    await gameRound.save();

    const gameInstance = await GameInstanceDao.findOne({ gameUuid: gameRound.gameUuid });
    if (!gameInstance) {
      throw new UnableToCreateGameInstanceError();
    }

    const scoreUpdates: Record<string, number> = {};

    if (winner === 1) scoreUpdates["score.player1"] = 1;
    if (winner === 2) scoreUpdates["score.player2"] = 1;

    const updatedGameInstance = await GameInstanceDao.findOneAndUpdate(
      { gameUuid: gameRound.gameUuid },
      {
        $inc: scoreUpdates,
      },
      { new: true }
    );

    return {
      updatedGameRound: gameRound,
      updatedGameInstance,
    };
  } catch (error: any) {
    throw error;
  }
}
