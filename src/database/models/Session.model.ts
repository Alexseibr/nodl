import { Schema, model, Document } from 'mongoose';

export interface Session extends Document {
  user: Schema.Types.ObjectId;
  token: string;
  userAgent?: string;
  ip?: string;
  expiresAt: Date;
  createdAt: Date;
}

const SessionSchema = new Schema<Session>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true, unique: true },
  userAgent: String,
  ip: String,
  expiresAt: { type: Date, required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

SessionSchema.index({ user: 1, expiresAt: -1 });
SessionSchema.index({ token: 1 });

export const SessionModel = model<Session>('Session', SessionSchema);
