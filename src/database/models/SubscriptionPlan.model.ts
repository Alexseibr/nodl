import { Schema, model, Document } from 'mongoose';
import { SubscriptionPlanDefinition } from '../types/subscription.types';

export interface SubscriptionPlan extends Document, SubscriptionPlanDefinition {
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionPlanSchema = new Schema<SubscriptionPlanDefinition>({
  code: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  features: [{ type: String, required: true }],
  monthlyPrice: { type: Map, of: Number, default: {} },
  yearlyPrice: { type: Map, of: Number },
}, { timestamps: true });

export const SubscriptionPlanModel = model<SubscriptionPlan>('SubscriptionPlan', SubscriptionPlanSchema);
