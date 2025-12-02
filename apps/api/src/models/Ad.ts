import { Schema, model, Document, Types } from 'mongoose';
import { MultiLangStringSchema, PriceNormalizedSchema, GeoPointSchema } from './common';

export interface Ad extends Document {
  authorUserId: Types.ObjectId;
  storeId?: Types.ObjectId;
  title: { ru: string; en: string; pl: string };
  description?: { ru: string; en: string; pl: string };
  price: { amount: number; currency: 'BYN' | 'RUB' | 'PLN' | 'EUR'; normalized?: typeof PriceNormalizedSchema };
  categoryId: Types.ObjectId;
  geo?: {
    location?: { type: 'Point'; coordinates: [number, number] };
    cityId?: Types.ObjectId;
    regionId?: Types.ObjectId;
  };
  media?: { photos: string[]; video?: string };
  viewsCounter?: number;
  heatmap?: { lat: number; lng: number; viewedAt: Date }[];
  stats?: { clicks?: number; favorites?: number; shares?: number };
  filters?: { isPromoted: boolean; highlightUntil?: Date; bumpCount?: number };
  moderationStatus?: 'draft' | 'pending' | 'approved' | 'rejected';
  moderationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdSchema = new Schema<Ad>(
  {
    authorUserId: { type: Types.ObjectId, ref: 'User', required: true },
    storeId: { type: Types.ObjectId, ref: 'Store' },
    title: { type: MultiLangStringSchema, required: true },
    description: MultiLangStringSchema,
    price: {
      amount: { type: Number, required: true },
      currency: { type: String, enum: ['BYN', 'RUB', 'PLN', 'EUR'], required: true },
      normalized: PriceNormalizedSchema,
    },
    categoryId: { type: Types.ObjectId, ref: 'Category', required: true, index: true },
    geo: {
      location: GeoPointSchema,
      cityId: { type: Types.ObjectId, ref: 'City' },
      regionId: { type: Types.ObjectId, ref: 'Region' },
    },
    media: {
      photos: [String],
      video: String,
    },
    viewsCounter: { type: Number, default: 0 },
    heatmap: [
      {
        lat: Number,
        lng: Number,
        viewedAt: { type: Date, default: Date.now },
      },
    ],
    stats: {
      clicks: { type: Number, default: 0 },
      favorites: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
    },
    filters: {
      isPromoted: { type: Boolean, default: false },
      highlightUntil: Date,
      bumpCount: { type: Number, default: 0 },
    },
    moderationStatus: { type: String, enum: ['draft', 'pending', 'approved', 'rejected'], default: 'pending' },
    moderationReason: String,
  },
  { timestamps: true }
);

AdSchema.index({ title: 'text', description: 'text' });
AdSchema.index({ categoryId: 1 });
AdSchema.index({ 'geo.location': '2dsphere' });
AdSchema.index({ 'price.amount': 1 });
AdSchema.index({ 'title.ru': 1, 'title.en': 1, 'title.pl': 1 });

export const AdModel = model<Ad>('Ad', AdSchema);
