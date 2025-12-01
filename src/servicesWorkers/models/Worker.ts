import { Document, Model, Schema, model } from 'mongoose';
import { WorkerOrderModel } from './WorkerOrder';
import { WorkerPortfolioDocument } from './WorkerPortfolio';

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface WorkerAttributes {
  userId: string;
  name: string;
  avatar?: string;
  categories: string[];
  experienceYears?: number;
  description?: string;
  priceFrom?: number;
  priceTo?: number;
  city?: string;
  geo?: GeoPoint;
  rating?: number;
  reviewsCount?: number;
  portfolio?: WorkerPortfolioDocument[];
  isVerified?: boolean;
  lastActive?: Date;
  tags?: string[];
}

export interface WorkerDocument extends WorkerAttributes, Document {
  getRecommendedOrders(): Promise<ReturnType<typeof WorkerOrderModel.find>>;
  updateRating(newScore: number): Promise<WorkerDocument>;
}

const GeoPointSchema = new Schema<GeoPoint>(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false }
);

const WorkerSchema = new Schema<WorkerDocument>(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    avatar: { type: String },
    categories: { type: [String], default: [] },
    experienceYears: { type: Number },
    description: { type: String },
    priceFrom: { type: Number },
    priceTo: { type: Number },
    city: { type: String },
    geo: { type: GeoPointSchema },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    lastActive: { type: Date },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

WorkerSchema.methods.getRecommendedOrders = async function getRecommendedOrders() {
  const worker = this as WorkerDocument;
  const categories = worker.categories || [];
  return WorkerOrderModel.find({
    category: { $in: categories },
    status: 'open',
  })
    .limit(20)
    .lean();
};

WorkerSchema.methods.updateRating = async function updateRating(newScore: number) {
  const worker = this as WorkerDocument;
  const totalScore = (worker.rating || 0) * (worker.reviewsCount || 0) + newScore;
  const nextCount = (worker.reviewsCount || 0) + 1;
  worker.rating = Number((totalScore / nextCount).toFixed(2));
  worker.reviewsCount = nextCount;
  await worker.save();
  return worker;
};

WorkerSchema.virtual('portfolio', {
  ref: 'WorkerPortfolio',
  localField: '_id',
  foreignField: 'workerId',
});

export const WorkerModel: Model<WorkerDocument> = model('Worker', WorkerSchema);
