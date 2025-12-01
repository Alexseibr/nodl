import { Document, Model, Schema, model } from 'mongoose';

export interface WorkerPortfolioAttributes {
  workerId: string;
  title: string;
  description?: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  tags?: string[];
  createdAt?: Date;
}

export interface WorkerPortfolioDocument
  extends WorkerPortfolioAttributes,
    Document {}

const WorkerPortfolioSchema = new Schema<WorkerPortfolioDocument>(
  {
    workerId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String },
    mediaUrl: { type: String, required: true },
    thumbnailUrl: { type: String },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const WorkerPortfolioModel: Model<WorkerPortfolioDocument> = model(
  'WorkerPortfolio',
  WorkerPortfolioSchema
);
