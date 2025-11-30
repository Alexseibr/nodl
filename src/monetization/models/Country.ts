import { Document, Model, Schema, model } from 'mongoose';
import { CurrencyCode, SupportedLocale } from './Currency';

export type CountryCode = 'BY' | 'RU' | 'PL';

export interface CountryNameTranslation {
  ru: string;
  en: string;
  pl: string;
}

export interface CountryAttributes {
  code: CountryCode;
  name: CountryNameTranslation;
  defaultCurrency: CurrencyCode;
  supportedCurrencies: CurrencyCode[];
  defaultLocale: SupportedLocale;
  supportedLocales: SupportedLocale[];
}

export interface CountryDocument extends CountryAttributes, Document {}

const CountrySchema = new Schema<CountryDocument>(
  {
    code: { type: String, enum: ['BY', 'RU', 'PL'], unique: true, required: true },
    name: {
      ru: { type: String, required: true },
      en: { type: String, required: true },
      pl: { type: String, required: true },
    },
    defaultCurrency: { type: String, enum: ['BYN', 'RUB', 'PLN'], required: true },
    supportedCurrencies: { type: [String], default: [] },
    defaultLocale: { type: String, enum: ['ru', 'en', 'pl'], required: true },
    supportedLocales: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const CountryModel: Model<CountryDocument> = model<CountryDocument>(
  'Country',
  CountrySchema
);
