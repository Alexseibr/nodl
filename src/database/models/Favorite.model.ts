import { Schema, model, Document, Model } from "mongoose";

export interface Favorite extends Document {
  userId: string;
  adId: string;
  createdAt: Date;
}

const FavoriteSchema = new Schema<Favorite>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    adId: {
      type: Schema.Types.ObjectId,
      ref: "Ad",
      required: true,
      index: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

FavoriteSchema.index({ userId: 1, adId: 1 }, { unique: true });

export const FavoriteModel: Model<Favorite> = model<Favorite>(
  "Favorite",
  FavoriteSchema
);

