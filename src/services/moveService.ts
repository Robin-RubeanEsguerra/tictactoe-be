import GameInstanceDao from "../daos/GameInstanceDao";
import GameRoundDao from "../daos/GameRoundDao";
import MovesDao from "../daos/MovesDao";
import { IMoves } from "../models/Moves";
import { DuplicateMoveError, GameInstanceAlreadyCompletedError, UnableToCreateGameInstanceError, UnableToFindGameRoundError } from "../utils/errors";

export async function create(
  moveData: IMoves,
  gameRoundUuid: string,
) {
  try {
    if (!gameRoundUuid ) {
      throw new UnableToFindGameRoundError();
    }

    const gameRound = await GameRoundDao.findOne({ gameRoundUuid });

    if (!gameRound) {
      throw new UnableToCreateGameInstanceError();
    }

    if(gameRound.status === "completed") {
      throw new GameInstanceAlreadyCompletedError();
    }

    const existingMoves = await MovesDao.find({ gameRoundUuid });
        const isDuplicate = existingMoves.some(
      (move) => move.x === moveData.x && move.y === moveData.y
    );
    if (isDuplicate) {
      throw new DuplicateMoveError();
    }

    const turnNumber = existingMoves.length + 1;

    const newMove = new MovesDao({
      ...moveData,
      gameRoundUuid: gameRound.gameRoundUuid,
      turnNumber: turnNumber,
    });

    await newMove.save();
    return newMove;
  } catch (err: any) {
    throw err;
  }
}
