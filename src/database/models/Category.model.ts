import { Schema, model, Document } from 'mongoose';
import { LocalizedString } from '../schemas/common/localizedString.schema';

export interface Category extends Document {
  slug: string;
  title: LocalizedString;
  parent?: Schema.Types.ObjectId;
  order: number;
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

const CategorySchema = new Schema<Category>({
  slug: { type: String, unique: true, required: true },
  title: { type: LocalizedSchema, required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Category' },
  order: { type: Number, default: 0 },
});

export const CategoryModel = model<Category>('Category', CategorySchema);
