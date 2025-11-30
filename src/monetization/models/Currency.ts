import { Document, Model, Schema, model } from 'mongoose';

export type CurrencyCode = 'BYN' | 'RUB' | 'PLN' | 'EUR';
export type SupportedLocale = 'ru' | 'en' | 'pl';

export interface CurrencyNameTranslation {
  ru: string;
  en: string;
  pl: string;
}

export interface CurrencyAttributes {
  code: CurrencyCode;
  symbol: string;
  name: CurrencyNameTranslation;
  precision: number;
  isDefaultForCountries: string[];
}

export interface CurrencyDocument extends CurrencyAttributes, Document {}

const CurrencySchema = new Schema<CurrencyDocument>(
  {
    code: { type: String, enum: ['BYN', 'RUB', 'PLN', 'EUR'], required: true, unique: true },
    symbol: { type: String, required: true },
    name: {
      ru: { type: String, required: true },
      en: { type: String, required: true },
      pl: { type: String, required: true },
    },
    precision: { type: Number, default: 2 },
    isDefaultForCountries: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const CurrencyModel: Model<CurrencyDocument> =
  model<CurrencyDocument>('Currency', CurrencySchema);
