import { Schema, model, Document } from 'mongoose';
import { CountryCode, CurrencyCode } from './common';

export interface Subscription extends Document {
  planName: string;
  country: CountryCode;
  price: Record<CurrencyCode, number>;
  features: {
    highlightCount?: number;
    analytics?: boolean;
    unlimitedAds?: boolean;
    prioritySupport?: boolean;
  };
  billingCycle: 'monthly' | 'quarterly' | 'yearly';
  autoRenew: boolean;
}

const SubscriptionSchema = new Schema<Subscription>(
  {
    planName: { type: String, required: true },
    country: { type: String, enum: ['BY', 'RU', 'PL'], required: true },
    price: {
      BYN: { type: Number, required: true },
      RUB: { type: Number, required: true },
      PLN: { type: Number, required: true },
      EUR: { type: Number, required: true },
    },
    features: {
      highlightCount: Number,
      analytics: Boolean,
      unlimitedAds: Boolean,
      prioritySupport: Boolean,
    },
    billingCycle: { type: String, enum: ['monthly', 'quarterly', 'yearly'], default: 'monthly' },
    autoRenew: { type: Boolean, default: true },
  },
  { timestamps: true }
);

SubscriptionSchema.index({ planName: 1, country: 1 }, { unique: true });

export const SubscriptionModel = model<Subscription>('Subscription', SubscriptionSchema);
