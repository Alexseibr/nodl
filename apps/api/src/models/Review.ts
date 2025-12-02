import { Schema, model, Document, Types } from 'mongoose';

export interface Review extends Document {
  targetType: 'user' | 'store' | 'builder';
  targetId: Types.ObjectId;
  authorId: Types.ObjectId;
  rating: number;
  comment?: string;
  tags?: string[];
  fraudScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<Review>(
  {
    targetType: { type: String, enum: ['user', 'store', 'builder'], required: true },
    targetId: { type: Types.ObjectId, required: true, index: true },
    authorId: { type: Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
    tags: [String],
    fraudScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ReviewSchema.index({ targetType: 1, targetId: 1 });
ReviewSchema.index({ rating: -1 });

export const ReviewModel = model<Review>('Review', ReviewSchema);
