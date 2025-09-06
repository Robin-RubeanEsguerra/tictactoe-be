import mongoose, { Schema, model, Document } from "mongoose";
import { IMoves } from "../models/Moves";
import { randomUUID } from "crypto";

export interface IMovesModel extends IMoves, Document {}

const movesSchema = new Schema(
  {
    moveUuid: { type: String, required: true, default: randomUUID },
    gameRoundUuid: {
      type: String,
      required: true,
      ref: "GameRound",
    },
    turnNumber: { type: Number, required: true },
    player: { type: String, required: true },
    x: { type: Number, required: true,  },
    y: { type: Number, required: true, },
  },
  { timestamps: true }
);

export default mongoose.model<IMovesModel>("Moves", movesSchema);
