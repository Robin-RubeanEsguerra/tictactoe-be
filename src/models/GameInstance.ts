import { IGameRound } from "./GameRound";
import { IUser } from "./User";

export interface IGameInstance {
  gameUuid: string;
  userUuid: string|IUser;
  gameRounds: Array<string | IGameRound>; 
  winner: number;
  score: { player1: number; player2: number };
  roundsPlayed: number;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
}
