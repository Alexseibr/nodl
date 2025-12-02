import { Schema, model, Document } from 'mongoose';
import { GeoCity as GeoCityType } from '../types/geo.types';

export interface GeoCity extends Document, GeoCityType {}

const GeoCitySchema = new Schema<GeoCityType>({
  countryCode: { type: String, required: true },
  regionName: String,
  name: { type: String, required: true },
  lat: Number,
  lng: Number,
});

GeoCitySchema.index({ countryCode: 1, regionName: 1, name: 1 }, { unique: true });
GeoCitySchema.index({ lat: 1, lng: 1 });

export const GeoCityModel = model<GeoCity>('GeoCity', GeoCitySchema);
