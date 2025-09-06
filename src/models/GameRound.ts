import { Types } from "mongoose";
import { IGameInstance } from "./GameInstance";

export interface IGameRound {
  gameRoundUuid: string;
  gameUuid: String | IGameInstance;
  winner: number;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
}
