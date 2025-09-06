import mongoose, { Schema, model, Document } from "mongoose";
import { IGameRound } from "../models/GameRound";
import { randomUUID } from "crypto";

export interface IGameRoundModel extends IGameRound, Document {}

const gameRoundSchema = new Schema(
  {
    gameRoundUuid: {
      type: String,
      required: true,
      default: randomUUID,
      unique: true,
      index: true,
    },
    status: { type: String, required: true, default: "ongoing" },
    gameUuid: { type: String, required: true, ref: "GameInstance" },
    winner: { type: Number, required: false },
  },
  { timestamps: true }
);

export default mongoose.model<IGameRoundModel>("GameRound", gameRoundSchema);
