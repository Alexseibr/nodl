import { Document, Model, Schema, model } from 'mongoose';
import { PlanTranslation, PriceLocalized } from './common';
import { CountryCode } from './Country';

export type PromotionProductCode = 'RAISE_PROFILE' | 'PIN_IN_TOP_DAILY' | 'VERIFIED_BADGE';

export interface PromotionProductPriceByCountry {
  countryCode: CountryCode;
  price: PriceLocalized;
}

export interface PromotionProductAttributes {
  code: PromotionProductCode;
  type: 'promotion';
  translations: PlanTranslation[];
  pricesByCountry: PromotionProductPriceByCountry[];
  durationDays?: number | null;
}

export interface PromotionProductDocument
  extends PromotionProductAttributes,
    Document {}

const PriceLocalizedSchema = new Schema<PriceLocalized>(
  {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  { _id: false }
);

const PlanTranslationSchema = new Schema<PlanTranslation>(
  {
    locale: { type: String, enum: ['ru', 'en', 'pl'], required: true },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String },
    bulletPoints: { type: [String], default: [] },
  },
  { _id: false }
);

const PromotionProductPriceSchema = new Schema<PromotionProductPriceByCountry>(
  {
    countryCode: { type: String, enum: ['BY', 'RU', 'PL'], required: true },
    price: { type: PriceLocalizedSchema, required: true },
  },
  { _id: false }
);

const PromotionProductSchema = new Schema<PromotionProductDocument>(
  {
    code: {
      type: String,
      enum: ['RAISE_PROFILE', 'PIN_IN_TOP_DAILY', 'VERIFIED_BADGE'],
      required: true,
      unique: true,
    },
    type: { type: String, default: 'promotion', required: true },
    translations: { type: [PlanTranslationSchema], required: true },
    pricesByCountry: { type: [PromotionProductPriceSchema], required: true },
    durationDays: { type: Number, default: null },
  },
  { timestamps: true }
);

export const PromotionProductModel: Model<PromotionProductDocument> = model(
  'PromotionProduct',
  PromotionProductSchema
);
