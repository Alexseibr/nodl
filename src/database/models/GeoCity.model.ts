import { Schema, model, Document, Model } from "mongoose";
import {
  LocalizedString,
  LocalizedStringSchema,
} from "../schemas/common/localizedString.schema";
import { GeoPoint, GeoAddressRef } from "../types";
import { GeoPointSchema } from "../schemas/common/geoPoint.schema";

export interface GeoCity extends Document {
  countryCode: string;
  regionId?: string;
  name: LocalizedString;
  geoPoint?: GeoPoint;
  meta?: {
    population?: number;
    timezone?: string;
  };
}

const GeoCitySchema = new Schema<GeoCity>(
  {
    countryCode: { type: String, required: true, index: true },
    regionId: {
      type: Schema.Types.ObjectId,
      ref: "GeoRegion",
      index: true,
      sparse: true,
    },

    name: { type: LocalizedStringSchema, required: true },

    geoPoint: GeoPointSchema,

    meta: {
      population: Number,
      timezone: String,
    },
  },
  { timestamps: true }
);

GeoCitySchema.index({ countryCode: 1, "name.ru": 1 });
GeoCitySchema.index({ "geoPoint.coordinates": "2dsphere" });

export const GeoCityModel: Model<GeoCity> = model<GeoCity>(
  "GeoCity",
  GeoCitySchema
);

