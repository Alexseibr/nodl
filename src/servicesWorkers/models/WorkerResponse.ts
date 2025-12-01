import { Document, Model, Schema, model } from 'mongoose';

export type WorkerResponseStatus = 'pending' | 'accepted' | 'rejected';

export interface WorkerResponseAttributes {
  orderId: string;
  workerId: string;
  message: string;
  priceOffer?: number;
  createdAt?: Date;
  status: WorkerResponseStatus;
  recommendedTimeframe?: string;
  recommendations?: string;
}

export interface WorkerResponseDocument
  extends WorkerResponseAttributes,
    Document {}

const WorkerResponseSchema = new Schema<WorkerResponseDocument>(
  {
    orderId: { type: String, required: true, index: true },
    workerId: { type: String, required: true, index: true },
    message: { type: String, required: true },
    priceOffer: { type: Number },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    recommendedTimeframe: { type: String },
    recommendations: { type: String },
  },
  { timestamps: true }
);

export const WorkerResponseModel: Model<WorkerResponseDocument> = model(
  'WorkerResponse',
  WorkerResponseSchema
);
