import { Schema, model, Document, Types } from 'mongoose';
import { MultiLangStringSchema, GeoPointSchema } from './common';

export interface Country extends Document {
  code: 'BY' | 'RU' | 'PL';
  name: { ru: string; en: string; pl: string };
}

export interface Region extends Document {
  countryCode: Country['code'];
  name: { ru: string; en: string; pl: string };
}

export interface City extends Document {
  countryCode: Country['code'];
  regionId?: Types.ObjectId;
  name: { ru: string; en: string; pl: string };
  center?: { type: 'Point'; coordinates: [number, number] };
  serviceRadiusDefaults?: number;
}

export interface District extends Document {
  cityId: Types.ObjectId;
  name: { ru: string; en: string; pl: string };
}

export interface ZipCode extends Document {
  cityId: Types.ObjectId;
  code: string;
}

const CountrySchema = new Schema<Country>({
  code: { type: String, enum: ['BY', 'RU', 'PL'], required: true, unique: true },
  name: { type: MultiLangStringSchema, required: true },
});

const RegionSchema = new Schema<Region>({
  countryCode: { type: String, enum: ['BY', 'RU', 'PL'], required: true },
  name: { type: MultiLangStringSchema, required: true },
});

const CitySchema = new Schema<City>({
  countryCode: { type: String, enum: ['BY', 'RU', 'PL'], required: true },
  regionId: { type: Types.ObjectId, ref: 'Region' },
  name: { type: MultiLangStringSchema, required: true },
  center: GeoPointSchema,
  serviceRadiusDefaults: Number,
});

const DistrictSchema = new Schema<District>({
  cityId: { type: Types.ObjectId, ref: 'City', required: true },
  name: { type: MultiLangStringSchema, required: true },
});

const ZipCodeSchema = new Schema<ZipCode>({
  cityId: { type: Types.ObjectId, ref: 'City', required: true },
  code: { type: String, required: true },
});

RegionSchema.index({ countryCode: 1 });
CitySchema.index({ countryCode: 1, regionId: 1 });
CitySchema.index({ center: '2dsphere' });
DistrictSchema.index({ cityId: 1 });
ZipCodeSchema.index({ cityId: 1, code: 1 }, { unique: true });

export const CountryModel = model<Country>('Country', CountrySchema);
export const RegionModel = model<Region>('Region', RegionSchema);
export const CityModel = model<City>('City', CitySchema);
export const DistrictModel = model<District>('District', DistrictSchema);
export const ZipCodeModel = model<ZipCode>('ZipCode', ZipCodeSchema);
