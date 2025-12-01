import { Document, Model, Schema, model } from 'mongoose';
import { WorkerModel } from './Worker';
import { WorkerResponseModel } from './WorkerResponse';

export interface OrderGeoPoint {
  lat: number;
  lng: number;
}

export type WorkerOrderStatus = 'open' | 'in_progress' | 'done';

export interface WorkerOrderAttributes {
  customerId: string;
  category: string;
  title: string;
  description: string;
  budget?: number;
  address?: string;
  geo?: OrderGeoPoint;
  photos?: string[];
  status: WorkerOrderStatus;
  assignedWorkerId?: string | null;
  deadline?: Date;
  createdAt?: Date;
}

export interface WorkerOrderDocument extends WorkerOrderAttributes, Document {
  getRecommendedWorkers(): Promise<ReturnType<typeof WorkerModel.find>>;
  closeOrder(): Promise<WorkerOrderDocument>;
}

const OrderGeoPointSchema = new Schema<OrderGeoPoint>(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false }
);

const WorkerOrderSchema = new Schema<WorkerOrderDocument>(
  {
    customerId: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number },
    address: { type: String },
    geo: { type: OrderGeoPointSchema },
    photos: { type: [String], default: [] },
    status: { type: String, enum: ['open', 'in_progress', 'done'], default: 'open' },
    assignedWorkerId: { type: String, default: null },
    deadline: { type: Date },
  },
  { timestamps: true }
);

WorkerOrderSchema.methods.getRecommendedWorkers = async function getRecommendedWorkers() {
  const order = this as WorkerOrderDocument;
  return WorkerModel.find({
    categories: order.category,
  })
    .sort({ rating: -1, lastActive: -1 })
    .limit(10)
    .lean();
};

WorkerOrderSchema.methods.closeOrder = async function closeOrder() {
  const order = this as WorkerOrderDocument;
  order.status = 'done';
  await WorkerResponseModel.updateMany({ orderId: order._id }, { status: 'rejected' });
  await order.save();
  return order;
};

WorkerOrderSchema.virtual('assignedWorker', {
  ref: 'Worker',
  localField: 'assignedWorkerId',
  foreignField: '_id',
  justOne: true,
});

export const WorkerOrderModel: Model<WorkerOrderDocument> = model(
  'WorkerOrder',
  WorkerOrderSchema
);
