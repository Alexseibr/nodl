import { Schema, model, Document, Types } from 'mongoose';
import { AddressSchema, MultiLangStringSchema, GeoPointSchema } from './common';

export type StoreType = 'store' | 'farmer' | 'builder' | 'brigade';
export type SubscriptionTier = 'NONE' | 'PRO' | 'MAX';

export interface StoreProfile extends Document {
  type: StoreType;
  ownerUserId: Types.ObjectId;
  title: { ru: string; en: string; pl: string };
  description?: { ru: string; en: string; pl: string };
  schedule?: string;
  address?: {
    line1?: string;
    countryCode: 'BY' | 'RU' | 'PL';
    cityId?: Types.ObjectId;
    regionId?: Types.ObjectId;
    districtId?: Types.ObjectId;
    zipCode?: string;
    location?: { type: 'Point'; coordinates: [number, number] };
  };
  rating?: number;
  reviewsCount?: number;
  categories?: Types.ObjectId[];
  documents?: string[];
  subscriptionPlan: SubscriptionTier;
  createdAt: Date;
  updatedAt: Date;
}

const StoreProfileSchema = new Schema<StoreProfile>(
  {
    type: { type: String, enum: ['store', 'farmer', 'builder', 'brigade'], required: true },
    ownerUserId: { type: Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: MultiLangStringSchema, required: true },
    description: MultiLangStringSchema,
    schedule: String,
    address: AddressSchema,
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    categories: [{ type: Types.ObjectId, ref: 'Category' }],
    documents: [String],
    subscriptionPlan: { type: String, enum: ['NONE', 'PRO', 'MAX'], default: 'NONE' },
  },
  { timestamps: true }
);

StoreProfileSchema.index({ type: 1 });
StoreProfileSchema.index({ 'address.location': '2dsphere' });
StoreProfileSchema.index({ subscriptionPlan: 1 });

export const StoreProfileModel = model<StoreProfile>('Store', StoreProfileSchema);
