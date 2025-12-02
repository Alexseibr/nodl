import { Schema, model, Document, Model } from "mongoose";
import {
  LocalizedString,
  LocalizedStringSchema,
} from "../schemas/common/localizedString.schema";
import { MultiCurrencyPrice } from "../types";
import { PriceMultiCurrencySchema } from "../schemas/common/priceMultiCurrency.schema";
import { SubscriptionBillingCycle, SubscriptionPlanCode } from "../types";

export interface SubscriptionPlan extends Document {
  code: SubscriptionPlanCode;
  countryCode?: string;
  name: LocalizedString;
  description?: LocalizedString;
  price: MultiCurrencyPrice;
  billingCycle: SubscriptionBillingCycle;
  features: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionPlanSchema = new Schema<SubscriptionPlan>(
  {
    code: {
      type: String,
      enum: ["FREE", "PRO", "MAX"],
      required: true,
    },
    countryCode: { type: String },

    name: { type: LocalizedStringSchema, required: true },
    description: { type: LocalizedStringSchema },

    price: { type: PriceMultiCurrencySchema, required: true },

    billingCycle: {
      type: String,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },

    features: { type: [String], default: [] },

    isActive: { type: Boolean, default: true },

    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

SubscriptionPlanSchema.index({ code: 1, countryCode: 1 }, { unique: true });

export const SubscriptionPlanModel: Model<SubscriptionPlan> =
  model<SubscriptionPlan>("SubscriptionPlan", SubscriptionPlanSchema);

