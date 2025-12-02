import { Schema, Types } from 'mongoose';

export type LanguageCode = 'ru' | 'en' | 'pl';
export type CountryCode = 'BY' | 'RU' | 'PL';
export type CurrencyCode = 'BYN' | 'RUB' | 'PLN' | 'EUR';

export const MultiLangStringSchema = new Schema(
  {
    ru: { type: String, required: true },
    en: { type: String, required: true },
    pl: { type: String, required: true },
  },
  { _id: false }
);

export interface MultiLangString {
  ru: string;
  en: string;
  pl: string;
}

export interface PriceNormalized {
  originalPrice: number;
  originalCurrency: CurrencyCode;
  converted: {
    BYN?: number;
    RUB?: number;
    PLN?: number;
    EUR?: number;
  };
}

export const PriceNormalizedSchema = new Schema<PriceNormalized>(
  {
    originalPrice: { type: Number, required: true },
    originalCurrency: { type: String, enum: ['BYN', 'RUB', 'PLN', 'EUR'], required: true },
    converted: {
      BYN: Number,
      RUB: Number,
      PLN: Number,
      EUR: Number,
    },
  },
  { _id: false }
);

export const GeoPointSchema = new Schema(
  {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: {
      type: [Number],
      index: '2dsphere',
      required: true,
    },
  },
  { _id: false }
);

export interface GeoPoint {
  type: 'Point';
  coordinates: [number, number];
}

export const AddressSchema = new Schema(
  {
    countryCode: { type: String, enum: ['BY', 'RU', 'PL'], required: true },
    regionId: { type: Types.ObjectId, ref: 'Region' },
    cityId: { type: Types.ObjectId, ref: 'City' },
    districtId: { type: Types.ObjectId, ref: 'District' },
    zipCode: { type: String },
    line1: { type: String },
    location: GeoPointSchema,
  },
  { _id: false }
);

export interface Address {
  countryCode: CountryCode;
  regionId?: Types.ObjectId;
  cityId?: Types.ObjectId;
  districtId?: Types.ObjectId;
  zipCode?: string;
  line1?: string;
  location?: GeoPoint;
}
