import { Schema, model, Document, Model } from "mongoose";
import { SubscriptionPlanCode, SubscriptionBillingCycle } from "../types";

export interface UserSubscription extends Document {
  userId: string;
  storeId?: string;
  planCode: SubscriptionPlanCode;
  countryCode?: string;
  billingCycle: SubscriptionBillingCycle;
  startedAt: Date;
  expiresAt?: Date;
  autoRenew: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSubscriptionSchema = new Schema<UserSubscription>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      index: true,
      sparse: true,
    },

    planCode: {
      type: String,
      enum: ["FREE", "PRO", "MAX"],
      required: true,
    },
    countryCode: String,

    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
      default: "monthly",
    },

    startedAt: { type: Date, required: true, default: Date.now },
    expiresAt: { type: Date },

    autoRenew: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

UserSubscriptionSchema.index(
  { userId: 1, storeId: 1, isActive: 1 },
  { unique: false }
);

export const UserSubscriptionModel: Model<UserSubscription> =
  model<UserSubscription>("UserSubscription", UserSubscriptionSchema);

