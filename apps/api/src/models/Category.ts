import { Schema, model, Document } from 'mongoose';
import { MultiLangStringSchema } from './common';

export interface Category extends Document {
  name: { ru: string; en: string; pl: string };
  slug: string;
  parentId?: string;
  countryScope?: ('BY' | 'RU' | 'PL')[];
}

const CategorySchema = new Schema<Category>(
  {
    name: { type: MultiLangStringSchema, required: true },
    slug: { type: String, required: true, unique: true },
    parentId: { type: String },
    countryScope: [{ type: String, enum: ['BY', 'RU', 'PL'] }],
  },
  { timestamps: true }
);

CategorySchema.index({ slug: 1 });

export const CategoryModel = model<Category>('Category', CategorySchema);
