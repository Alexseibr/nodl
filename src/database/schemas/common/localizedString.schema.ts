import { Schema } from "mongoose";

export const LocalizedStringSchema = new Schema(
  {
    ru: { type: String, trim: true },
    en: { type: String, trim: true },
    pl: { type: String, trim: true },
  },
  { _id: false }
);

export interface LocalizedString {
  ru?: string;
  en?: string;
  pl?: string;
}

