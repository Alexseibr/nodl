import { Schema, model, Document, Model } from "mongoose";
import {
  LocalizedString,
  LocalizedStringSchema,
} from "../schemas/common/localizedString.schema";

export interface GeoRegion extends Document {
  countryCode: string;
  name: LocalizedString;
}

const GeoRegionSchema = new Schema<GeoRegion>(
  {
    countryCode: { type: String, required: true, index: true },
    name: { type: LocalizedStringSchema, required: true },
  },
  { timestamps: true }
);

GeoRegionSchema.index({ countryCode: 1, "name.ru": 1 });

export const GeoRegionModel: Model<GeoRegion> =
  model<GeoRegion>("GeoRegion", GeoRegionSchema);

