import { Schema, model, Document } from 'mongoose';
import { GeoRegion as GeoRegionType } from '../types/geo.types';

export interface GeoRegion extends Document, GeoRegionType {}

const GeoRegionSchema = new Schema<GeoRegionType>({
  countryCode: { type: String, required: true },
  name: { type: String, required: true },
});

GeoRegionSchema.index({ countryCode: 1, name: 1 }, { unique: true });

export const GeoRegionModel = model<GeoRegion>('GeoRegion', GeoRegionSchema);
