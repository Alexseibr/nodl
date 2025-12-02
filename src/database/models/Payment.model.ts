import { Schema, model, Document, Model } from "mongoose";
import { SupportedCurrency } from "../types";

export type PaymentMethod = "card" | "telegramStars" | "cash";
export type PaymentStatus =
  | "created"
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

export interface Payment extends Document {
  userId: string;
  storeId?: string;
  method: PaymentMethod;
  currency: SupportedCurrency;
  amount: number;
  invoiceId?: string;
  description?: string;
  paymentStatus: PaymentStatus;
  gatewayPayload?: any;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<Payment>(
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

    method: {
      type: String,
      enum: ["card", "telegramStars", "cash"],
      required: true,
    },

    currency: {
      type: String,
      enum: ["BYN", "RUB", "PLN", "EUR"],
      required: true,
    },

    amount: { type: Number, required: true, min: 0 },

    invoiceId: { type: String, index: true, sparse: true },
    description: String,

    paymentStatus: {
      type: String,
      enum: ["created", "pending", "paid", "failed", "refunded"],
      default: "created",
      index: true,
    },

    gatewayPayload: Schema.Types.Mixed,
  },
  { timestamps: true }
);

PaymentSchema.index({ userId: 1, createdAt: -1 });

export const PaymentModel: Model<Payment> = model<Payment>(
  "Payment",
  PaymentSchema
);

