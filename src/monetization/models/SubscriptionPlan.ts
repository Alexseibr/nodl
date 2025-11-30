import { Document, Model, Schema, model } from 'mongoose';
import { BillingPeriod, PlanTranslation, PriceLocalized } from './common';
import { CountryCode } from './Country';

export type SubscriptionPlanCode = 'BASIC' | 'PRO' | 'PRO_MAX';

export interface SubscriptionPlanPriceByCountry {
  countryCode: CountryCode;
  price: PriceLocalized;
  oldPrice?: PriceLocalized;
  billingPeriod: BillingPeriod;
}

export interface SubscriptionPlanAttributes {
  code: SubscriptionPlanCode;
  type: 'subscription';
  isActive: boolean;
  priority: number;
  translations: PlanTranslation[];
  pricesByCountry: SubscriptionPlanPriceByCountry[];
  features: string[];
  maxLeadsPerDay?: number | null;
}

export interface SubscriptionPlanDocument
  extends SubscriptionPlanAttributes,
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

const SubscriptionPlanPriceSchema = new Schema<SubscriptionPlanPriceByCountry>(
  {
    countryCode: { type: String, enum: ['BY', 'RU', 'PL'], required: true },
    price: { type: PriceLocalizedSchema, required: true },
    oldPrice: { type: PriceLocalizedSchema },
    billingPeriod: { type: String, enum: ['month', 'year'], required: true },
  },
  { _id: false }
);

const SubscriptionPlanSchema = new Schema<SubscriptionPlanDocument>(
  {
    code: {
      type: String,
      enum: ['BASIC', 'PRO', 'PRO_MAX'],
      required: true,
      unique: true,
    },
    type: { type: String, default: 'subscription', required: true },
    isActive: { type: Boolean, default: true },
    priority: { type: Number, default: 0 },
    translations: { type: [PlanTranslationSchema], required: true },
    pricesByCountry: { type: [SubscriptionPlanPriceSchema], required: true },
    features: { type: [String], default: [] },
    maxLeadsPerDay: { type: Number, default: null },
  },
  { timestamps: true }
);

export const SubscriptionPlanModel: Model<SubscriptionPlanDocument> = model(
  'SubscriptionPlan',
  SubscriptionPlanSchema
);
