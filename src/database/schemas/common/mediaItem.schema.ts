import { Schema } from "mongoose";

export interface MediaItem {
  url: string;
  type: "image" | "video";
  width?: number;
  height?: number;
  sizeKb?: number;
  order?: number;
}

export const MediaItemSchema = new Schema<MediaItem>(
  {
    url: { type: String, required: true },
    type: {
      type: String,
      enum: ["image", "video"],
      required: true,
      default: "image",
    },
    width: Number,
    height: Number,
    sizeKb: Number,
    order: Number,
  },
  { _id: false }
);

