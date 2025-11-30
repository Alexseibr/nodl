import { Document, Model, Schema, model } from 'mongoose';
import { PriceLocalized } from './common';
import { CountryCode } from './Country';

export interface EscrowConfigAttributes {
  countryCode: CountryCode;
  minFeePercent: number;
  maxFeePercent: number;
  defaultFeePercent: number;
  minFeeAbsolute?: PriceLocalized;
  maxFeeAbsolute?: PriceLocalized;
}

export interface EscrowConfigDocument
  extends EscrowConfigAttributes,
    Document {}

const PriceLocalizedSchema = new Schema<PriceLocalized>(
  {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
  },
  { _id: false }
);

const EscrowConfigSchema = new Schema<EscrowConfigDocument>(
  {
    countryCode: { type: String, enum: ['BY', 'RU', 'PL'], required: true, unique: true },
    minFeePercent: { type: Number, required: true },
    maxFeePercent: { type: Number, required: true },
    defaultFeePercent: { type: Number, required: true },
    minFeeAbsolute: { type: PriceLocalizedSchema },
    maxFeeAbsolute: { type: PriceLocalizedSchema },
  },
  { timestamps: true }
);

export const EscrowConfigModel: Model<EscrowConfigDocument> = model(
  'EscrowConfig',
  EscrowConfigSchema
);
