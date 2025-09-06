import mongoose, { Schema, model, Document } from "mongoose";
import { IGameInstance } from "../models/GameInstance";
import { randomUUID } from "crypto";

export interface IGameInstanceModel extends IGameInstance, Document {
  // Add any instance methods here if needed
}

// Define schema
const gameInstanceSchema = new Schema(
  {
    gameUuid: {
      type: String,
      required: true,
      default: randomUUID,
      unique: true,
      index: true,
    },
   status: { type: String, required: true, default: "ongoing" },
   gameRounds: [{ type: String, ref: "GameRound" }],
    winner: { type: String },
    score: {
      player1: { type: Number, required:false },
      player2: { type: Number, required:false },
    },
    roundsPlayed: { type: Number },
  },
  { timestamps: true }
);


interface IGameInstanceModelStatic extends mongoose.Model<IGameInstanceModel> {
  findOneByGameUuid(gameUuid: string): Promise<IGameInstanceModel | null>;
}

const GameInstanceModel = model<IGameInstanceModel, IGameInstanceModelStatic>(
  "GameInstance",
  gameInstanceSchema
);

export default GameInstanceModel;
