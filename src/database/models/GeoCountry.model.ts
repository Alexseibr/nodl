import { Schema, model, Document } from 'mongoose';
import { GeoCountry as GeoCountryType } from '../types/geo.types';

export interface GeoCountry extends Document, GeoCountryType {}

const GeoCountrySchema = new Schema<GeoCountryType>({
  code: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  currency: { type: String, required: true },
});

export const GeoCountryModel = model<GeoCountry>('GeoCountry', GeoCountrySchema);
