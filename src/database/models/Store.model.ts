import { Schema, model, Document } from 'mongoose';
import { LocalizedString } from '../schemas/common/localizedString.schema';
import { GeoPoint } from '../schemas/common/geoPoint.schema';
import { ModerationMeta } from '../types/moderation.types';

export interface Store extends Document {
  owner: Schema.Types.ObjectId;
  title: LocalizedString;
  description?: LocalizedString;
  location: GeoPoint;
  moderation: ModerationMeta;
  createdAt: Date;
  updatedAt: Date;
}

const LocalizedSchema = new Schema<LocalizedString>(
  {
    ru: String,
    by: String,
    pl: String,
    en: String,
  },
  { _id: false },
);

const GeoSchema = new Schema<GeoPoint>(
  {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true },
    address: String,
  },
  { _id: false },
);

const ModerationSchema = new Schema<ModerationMeta>(
  {
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    reason: String,
    updatedAt: Date,
  },
  { _id: false },
);

const StoreSchema = new Schema<Store>(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: LocalizedSchema, required: true },
    description: LocalizedSchema,
    location: { type: GeoSchema, required: true },
    moderation: { type: ModerationSchema, default: { status: 'pending' } },
  },
  { timestamps: true },
);

StoreSchema.index({ 'location.coordinates': '2dsphere' });

export const StoreModel = model<Store>('Store', StoreSchema);
