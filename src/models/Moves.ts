import { Types } from "mongoose";
import { IGameRound } from "./GameRound";

export interface IMoves {
  moveUuid: string;
  gameRoundUuid: Types.ObjectId | IGameRound;
  turnNumber: number;
  player: string;
  x: number;
  y: number;
  createdAt?: Date;
  updatedAt?: Date;
}
