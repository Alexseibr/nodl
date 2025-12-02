import { Schema, model, Document } from 'mongoose';
import { LocalizedString } from '../schemas/common/localizedString.schema';
import { GeoPoint } from '../schemas/common/geoPoint.schema';
import { MultiCurrencyPrice } from '../types/currency.types';
import { ModerationMeta } from '../types/moderation.types';

export interface Tender extends Document {
  title: LocalizedString;
  description: LocalizedString;
  customer: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
  budget?: MultiCurrencyPrice;
  location?: GeoPoint;
  status: 'draft' | 'published' | 'closed';
  moderation: ModerationMeta;
  createdAt: Date;
  updatedAt: Date;
}

const LocalizedSchema = new Schema<LocalizedString>({ ru: String, by: String, pl: String, en: String }, { _id: false });
const GeoSchema = new Schema<GeoPoint>({ type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: { type: [Number], required: true }, address: String });
const ModerationSchema = new Schema<ModerationMeta>({ status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, reason: String, updatedAt: Date });
const PriceSchema = new Schema<MultiCurrencyPrice>({ baseCurrency: String, values: { type: Map, of: Number } });

const TenderSchema = new Schema<Tender>({
  title: { type: LocalizedSchema, required: true },
  description: { type: LocalizedSchema, required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  budget: PriceSchema,
  location: GeoSchema,
  status: { type: String, enum: ['draft', 'published', 'closed'], default: 'draft' },
  moderation: { type: ModerationSchema, default: { status: 'pending' } },
}, { timestamps: true });

TenderSchema.index({ status: 1, createdAt: -1 });

export const TenderModel = model<Tender>('Tender', TenderSchema);
