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
      (move) => move.index === moveData.index
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

export async function createBulk(
  movesData: IMoves[], 
  gameRoundUuid: string,
) {
  try {
    if (!gameRoundUuid) {
      throw new UnableToFindGameRoundError();
    }

    const gameRound = await GameRoundDao.findOne({ gameRoundUuid });

    if (!gameRound) {
      throw new UnableToCreateGameInstanceError();
    }

    if (gameRound.status === "completed") {
      throw new GameInstanceAlreadyCompletedError();
    }

    const existingMoves = await MovesDao.find({ gameRoundUuid });

    const existingIndexes = new Set(existingMoves.map(m => m.index));

    const incomingIndexes = new Set<number>();

    for (const move of movesData) {
      if (existingIndexes.has(move.index)) {
        throw new DuplicateMoveError(`Duplicate move at index ${move.index} already exists`);
      }
      if (incomingIndexes.has(move.index)) {
        throw new DuplicateMoveError(`Duplicate move at index ${move.index} in request`);
      }
      incomingIndexes.add(move.index);
    }

    // Calculate turn numbers for each new move
    const startingTurnNumber = existingMoves.length + 1;

    const movesToInsert = movesData.map((move, idx) => ({
      ...move,
      gameRoundUuid: gameRound.gameRoundUuid,
      turnNumber: startingTurnNumber + idx,
    }));

    // Bulk insert all moves (assuming MongoDB with Mongoose)
    const newMoves = await MovesDao.insertMany(movesToInsert);

    return newMoves;

  } catch (err: any) {
    throw err;
  }
}
