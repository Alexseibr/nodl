import { Schema } from "mongoose";
import { ModerationInfo } from "../../types";

export const ModerationSchema = new Schema<ModerationInfo>(
  {
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      required: true,
    },
    reason: { type: String },
    moderatorId: { type: String },
    updatedAt: { type: Date },
  },
  { _id: false }
);

