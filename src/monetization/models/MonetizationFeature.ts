import { Document, Model, Schema, model } from 'mongoose';
import { PlanTranslation } from './common';

export interface MonetizationFeatureAttributes {
  key: string;
  translations: PlanTranslation[];
}

export interface MonetizationFeatureDocument
  extends MonetizationFeatureAttributes,
    Document {}

const PlanTranslationSchema = new Schema<PlanTranslation>(
  {
    locale: { type: String, enum: ['ru', 'en', 'pl'], required: true },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String },
    bulletPoints: { type: [String], default: [] },
  },
  { _id: false }
);

const MonetizationFeatureSchema = new Schema<MonetizationFeatureDocument>(
  {
    key: { type: String, required: true, unique: true },
    translations: { type: [PlanTranslationSchema], default: [] },
  },
  { timestamps: true }
);

export const MonetizationFeatureModel: Model<MonetizationFeatureDocument> = model(
  'MonetizationFeature',
  MonetizationFeatureSchema
);
