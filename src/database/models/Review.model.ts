import { Schema, model, Document } from 'mongoose';

export interface Review extends Document {
  author: Schema.Types.ObjectId;
  targetUser: Schema.Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<Review>({
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  targetUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
}, { timestamps: { createdAt: true, updatedAt: false } });

ReviewSchema.index({ targetUser: 1, createdAt: -1 });

export const ReviewModel = model<Review>('Review', ReviewSchema);
