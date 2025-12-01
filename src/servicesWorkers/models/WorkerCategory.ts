import { Document, Model, Schema, model } from 'mongoose';
import { workerCategorySeeds } from '../data/workerCategories';

export interface WorkerCategoryAttributes {
  code: string;
  name: string;
  parent?: string;
  tags?: string[];
  isActive: boolean;
}

export interface WorkerCategoryDocument
  extends WorkerCategoryAttributes,
    Document {}

const WorkerCategorySchema = new Schema<WorkerCategoryDocument>(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    parent: { type: String },
    tags: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const WorkerCategoryModel: Model<WorkerCategoryDocument> = model(
  'WorkerCategory',
  WorkerCategorySchema
);

export async function seedWorkerCategories(): Promise<WorkerCategoryDocument[]> {
  const operations = workerCategorySeeds.map((seed) =>
    WorkerCategoryModel.findOneAndUpdate({ code: seed.code }, { ...seed, isActive: true }, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    })
  );
  return Promise.all(operations);
}
