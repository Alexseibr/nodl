import { Schema, model, Document, Model } from "mongoose";

export interface LogEvent extends Document {
  level: "info" | "warn" | "error";
  source: string;
  message: string;
  context?: any;
  createdAt: Date;
}

const LogEventSchema = new Schema<LogEvent>(
  {
    level: {
      type: String,
      enum: ["info", "warn", "error"],
      default: "info",
    },
    source: { type: String, required: true },
    message: { type: String, required: true },
    context: Schema.Types.Mixed,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

LogEventSchema.index({ level: 1, createdAt: -1 });

export const LogEventModel: Model<LogEvent> = model<LogEvent>(
  "LogEvent",
  LogEventSchema
);

