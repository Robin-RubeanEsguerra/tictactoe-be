import { IGameRound } from "./GameRound";

export interface IGameInstance {
  gameUuid: string;
  gameRounds: Array<string | IGameRound>; 
  winner: number;
  score: { player1: number; player2: number };
  roundsPlayed: number;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
}
