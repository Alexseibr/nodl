import { Schema, model, Document, Model } from "mongoose";

export interface Session extends Document {
  userId: string;
  token: string;
  deviceType?: "web" | "mobile" | "miniapp";
  userAgent?: string;
  lastIp?: string;
  createdAt: Date;
  expiresAt?: Date;
}

const SessionSchema = new Schema<Session>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    token: { type: String, required: true, unique: true },

    deviceType: {
      type: String,
      enum: ["web", "mobile", "miniapp"],
    },
    userAgent: String,
    lastIp: String,

    expiresAt: { type: Date, index: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

SessionSchema.index({ userId: 1, token: 1 });

export const SessionModel: Model<Session> = model<Session>(
  "Session",
  SessionSchema
);

