import { Document, Model, Schema, model } from 'mongoose';
import { PriceLocalized } from './common';
import { CountryCode } from './Country';

export interface PaidLeadConfigAttributes {
  categoryCode: string;
  countryCode: CountryCode;
  basePrice: PriceLocalized;
  minPrice?: PriceLocalized;
  maxPrice?: PriceLocalized;
  isActive: boolean;
}

export interface PaidLeadConfigDocument
  extends PaidLeadConfigAttributes,
    Document {}

const PriceLocalizedSchema = new Schema<PriceLocalized>(
  {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  { _id: false }
);

const PaidLeadConfigSchema = new Schema<PaidLeadConfigDocument>(
  {
    categoryCode: { type: String, required: true },
    countryCode: { type: String, enum: ['BY', 'RU', 'PL'], required: true },
    basePrice: { type: PriceLocalizedSchema, required: true },
    minPrice: { type: PriceLocalizedSchema },
    maxPrice: { type: PriceLocalizedSchema },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

PaidLeadConfigSchema.index({ categoryCode: 1, countryCode: 1 }, { unique: true });

export const PaidLeadConfigModel: Model<PaidLeadConfigDocument> = model(
  'PaidLeadConfig',
  PaidLeadConfigSchema
);
