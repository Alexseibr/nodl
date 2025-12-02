import { Schema, model, Document, Types } from 'mongoose';
import { CurrencyCode } from './common';

export interface Payment extends Document {
  userId?: Types.ObjectId;
  storeId?: Types.ObjectId;
  method: 'card' | 'telegramStars' | 'cash';
  currency: CurrencyCode;
  amount: number;
  invoiceId?: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  gatewayResponse?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema<Payment>(
  {
    userId: { type: Types.ObjectId, ref: 'User', index: true },
    storeId: { type: Types.ObjectId, ref: 'Store', index: true },
    method: { type: String, enum: ['card', 'telegramStars', 'cash'], required: true },
    currency: { type: String, enum: ['BYN', 'RUB', 'PLN', 'EUR'], required: true },
    amount: { type: Number, required: true },
    invoiceId: { type: String, index: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    gatewayResponse: Schema.Types.Mixed,
  },
  { timestamps: true }
);

PaymentSchema.index({ userId: 1, storeId: 1 });

export const PaymentModel = model<Payment>('Payment', PaymentSchema);
