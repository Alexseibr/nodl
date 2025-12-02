import { Schema, model, Document, Model } from "mongoose";

export interface Review extends Document {
  targetType: "store" | "user";
  targetId: string;
  authorId: string;
  rating: number;
  comment?: string;
  tags?: string[];
  fraudScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<Review>(
  {
    targetType: {
      type: String,
      enum: ["store", "user"],
      required: true,
      index: true,
    },
    targetId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,

    tags: [String],

    fraudScore: { type: Number, min: 0, max: 1 },
  },
  { timestamps: true }
);

ReviewSchema.index({ targetType: 1, targetId: 1, createdAt: -1 });

export const ReviewModel: Model<Review> = model<Review>(
  "Review",
  ReviewSchema
);

