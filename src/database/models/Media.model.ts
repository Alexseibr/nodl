import { Schema, model, Document, Model } from "mongoose";
import { MediaItemSchema, MediaItem } from "../schemas/common/mediaItem.schema";

export interface MediaDoc extends Document, MediaItem {
  ownerUserId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<MediaDoc>(
  {
    url: { type: String, required: true },
    type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },
    width: Number,
    height: Number,
    sizeKb: Number,
    order: Number,
    ownerUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

MediaSchema.index({ ownerUserId: 1, createdAt: -1 });

export const MediaModel: Model<MediaDoc> = model<MediaDoc>(
  "Media",
  MediaSchema
);

