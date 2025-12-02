import { Schema } from "mongoose";
import { GeoPoint } from "../../types";

export const GeoPointSchema = new Schema<GeoPoint>(
  {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
      // [lng, lat]
      validate: {
        validator: (arr: number[]) =>
          Array.isArray(arr) &&
          arr.length === 2 &&
          arr.every((v) => typeof v === "number"),
        message: "GeoPoint coordinates must be [lng, lat]",
      },
    },
  },
  { _id: false }
);

GeoPointSchema.index({ coordinates: "2dsphere" });

