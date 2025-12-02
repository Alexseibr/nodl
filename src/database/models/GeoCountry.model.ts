import { Schema, model, Document, Model } from "mongoose";
import {
  LocalizedString,
  LocalizedStringSchema,
} from "../schemas/common/localizedString.schema";

export interface GeoCountry extends Document {
  code: string; // BY/RU/PL
  name: LocalizedString;
  phoneCode?: string;
  currencyCode?: string;
}

const GeoCountrySchema = new Schema<GeoCountry>(
  {
    code: { type: String, required: true, unique: true },
    name: { type: LocalizedStringSchema, required: true },
    phoneCode: String,
    currencyCode: String,
  },
  { timestamps: true }
);

export const GeoCountryModel: Model<GeoCountry> =
  model<GeoCountry>("GeoCountry", GeoCountrySchema);

