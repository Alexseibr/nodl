import { Schema, model, Document } from 'mongoose';

export interface LogEvent extends Document {
  level: 'info' | 'warn' | 'error';
  message: string;
  context?: Record<string, unknown>;
  createdAt: Date;
}

const LogEventSchema = new Schema<LogEvent>({
  level: { type: String, enum: ['info', 'warn', 'error'], default: 'info' },
  message: { type: String, required: true },
  context: Schema.Types.Mixed,
}, { timestamps: { createdAt: true, updatedAt: false } });

LogEventSchema.index({ level: 1, createdAt: -1 });

export const LogEventModel = model<LogEvent>('LogEvent', LogEventSchema);
