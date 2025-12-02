import { Schema, model, Document } from 'mongoose';
import { LocalizedString } from '../schemas/common/localizedString.schema';
import { GeoPoint } from '../schemas/common/geoPoint.schema';
import { MediaItemSchema } from '../schemas/common/mediaItem.schema';
import { ModerationMeta } from '../types/moderation.types';
import { MultiCurrencyPrice } from '../types/currency.types';

export interface Ad extends Document {
  title: LocalizedString;
  description: LocalizedString;
  category: Schema.Types.ObjectId;
  owner: Schema.Types.ObjectId;
  location: GeoPoint;
  price: MultiCurrencyPrice;
  media: MediaItemSchema[];
  moderation: ModerationMeta;
  createdAt: Date;
  updatedAt: Date;
}

const LocalizedSchema = new Schema<LocalizedString>({ ru: String, by: String, pl: String, en: String }, { _id: false });

const GeoSchema = new Schema<GeoPoint>({
  type: { type: String, enum: ['Point'], default: 'Point' },
  coordinates: { type: [Number], required: true },
  address: String,
});

const MediaSchema = new Schema<MediaItemSchema>({
  url: { type: String, required: true },
  type: { type: String, enum: ['image', 'video', 'document'], required: true },
  previewUrl: String,
  description: String,
});

const ModerationSchema = new Schema<ModerationMeta>({
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reason: String,
  updatedAt: Date,
});

const PriceSchema = new Schema<MultiCurrencyPrice>({
  baseCurrency: { type: String, required: true },
  values: { type: Map, of: Number, default: {} },
});

const AdSchema = new Schema<Ad>({
  title: { type: LocalizedSchema, required: true },
  description: { type: LocalizedSchema, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: GeoSchema, required: true },
  price: { type: PriceSchema, required: true },
  media: [MediaSchema],
  moderation: { type: ModerationSchema, default: { status: 'pending' } },
}, { timestamps: true });

AdSchema.index({ 'location.coordinates': '2dsphere' });
AdSchema.index({ 'title.ru': 'text', 'title.by': 'text', 'title.pl': 'text', 'description.ru': 'text', 'description.by': 'text', 'description.pl': 'text' });

export const AdModel = model<Ad>('Ad', AdSchema);
