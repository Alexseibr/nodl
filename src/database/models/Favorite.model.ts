import { Schema, model, Document } from 'mongoose';

export interface Favorite extends Document {
  user: Schema.Types.ObjectId;
  target: Schema.Types.ObjectId;
  type: 'ad' | 'store' | 'tender';
  createdAt: Date;
}

const FavoriteSchema = new Schema<Favorite>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  target: { type: Schema.Types.ObjectId, required: true, refPath: 'typeModel' },
  type: { type: String, enum: ['ad', 'store', 'tender'], required: true },
  typeModel: { type: String, enum: ['Ad', 'Store', 'Tender'], required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

FavoriteSchema.index({ user: 1, target: 1, type: 1 }, { unique: true });

export const FavoriteModel = model<Favorite>('Favorite', FavoriteSchema);
