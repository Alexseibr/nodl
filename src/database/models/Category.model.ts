import { Schema, model, Document, Model } from "mongoose";
import {
  LocalizedStringSchema,
  LocalizedString,
} from "../schemas/common/localizedString.schema";

export interface Category extends Document {
  code: string;
  name: LocalizedString;
  parentId?: string;
  order: number;
  icon?: string;
  isActive: boolean;
}

const CategorySchema = new Schema<Category>(
  {
    code: { type: String, required: true, unique: true },
    name: { type: LocalizedStringSchema, required: true },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      index: true,
      sparse: true,
    },
    order: { type: Number, default: 0 },
    icon: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

CategorySchema.index({ code: 1 });
CategorySchema.index({ parentId: 1, order: 1 });

export const CategoryModel: Model<Category> = model<Category>("Category", CategorySchema);

