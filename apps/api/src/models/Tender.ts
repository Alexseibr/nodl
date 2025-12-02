import { Schema, model, Document, Types } from 'mongoose';
import { MultiLangStringSchema, PriceNormalizedSchema, GeoPointSchema } from './common';

export type TenderStatus = 'open' | 'inProgress' | 'closed';
export type TenderCategory = 'remont' | 'roofing' | 'facade' | 'engineering';

export interface Tender extends Document {
  customerUserId: Types.ObjectId;
  title: { ru: string; en: string; pl: string };
  description: { ru: string; en: string; pl: string };
  budgetMin?: number;
  budgetMax?: number;
  currency: 'BYN' | 'RUB' | 'PLN' | 'EUR';
  normalizedPrice?: typeof PriceNormalizedSchema;
  deadline?: Date;
  category: TenderCategory;
  geo?: { location?: { type: 'Point'; coordinates: [number, number] }; cityId?: Types.ObjectId; regionId?: Types.ObjectId };
  attachments?: string[];
  status: TenderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const TenderSchema = new Schema<Tender>(
  {
    customerUserId: { type: Types.ObjectId, ref: 'User', required: true },
    title: { type: MultiLangStringSchema, required: true },
    description: { type: MultiLangStringSchema, required: true },
    budgetMin: Number,
    budgetMax: Number,
    currency: { type: String, enum: ['BYN', 'RUB', 'PLN', 'EUR'], default: 'EUR' },
    normalizedPrice: PriceNormalizedSchema,
    deadline: Date,
    category: { type: String, enum: ['remont', 'roofing', 'facade', 'engineering'], required: true },
    geo: {
      location: GeoPointSchema,
      cityId: { type: Types.ObjectId, ref: 'City' },
      regionId: { type: Types.ObjectId, ref: 'Region' },
    },
    attachments: [String],
    status: { type: String, enum: ['open', 'inProgress', 'closed'], default: 'open', index: true },
  },
  { timestamps: true }
);

TenderSchema.index({ title: 'text', description: 'text' });
TenderSchema.index({ category: 1 });
TenderSchema.index({ 'geo.location': '2dsphere' });
TenderSchema.index({ status: 1 });

export const TenderModel = model<Tender>('Tender', TenderSchema);
