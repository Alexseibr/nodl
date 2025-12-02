import { Schema, model, Document, Model } from "mongoose";
import { GeoPoint } from "../types";
import { GeoPointSchema } from "../schemas/common/geoPoint.schema";

export interface HeatmapEvent extends Document {
  adId: string;
  userId?: string;
  viewType: "list" | "details" | "map";
  location?: GeoPoint;
  cityId?: string;
  createdAt: Date;
}

const HeatmapEventSchema = new Schema<HeatmapEvent>(
  {
    adId: {
      type: Schema.Types.ObjectId,
      ref: "Ad",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
      sparse: true,
    },
    viewType: {
      type: String,
      enum: ["list", "details", "map"],
      default: "list",
      index: true,
    },
    location: GeoPointSchema,
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "GeoCity",
      index: true,
      sparse: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

HeatmapEventSchema.index({ "location.coordinates": "2dsphere" });

export const HeatmapEventModel: Model<HeatmapEvent> =
  model<HeatmapEvent>("HeatmapEvent", HeatmapEventSchema);

