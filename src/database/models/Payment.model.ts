import { Schema, model, Document } from 'mongoose';
import { MoneyAmount, CurrencyCode } from '../types/currency.types';

export interface Payment extends Document {
  user: Schema.Types.ObjectId;
  amount: MoneyAmount;
  provider: 'stripe' | 'yookassa' | 'adapty' | 'manual';
  status: 'pending' | 'succeeded' | 'failed';
  meta?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const AmountSchema = new Schema<MoneyAmount>({
  amount: { type: Number, required: true },
  currency: { type: String, enum: ['BYN', 'RUB', 'PLN', 'EUR'], required: true },
});

const PaymentSchema = new Schema<Payment>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: AmountSchema, required: true },
  provider: { type: String, enum: ['stripe', 'yookassa', 'adapty', 'manual'], required: true },
  status: { type: String, enum: ['pending', 'succeeded', 'failed'], default: 'pending' },
  meta: { type: Schema.Types.Mixed },
}, { timestamps: true });

PaymentSchema.index({ user: 1, createdAt: -1 });
PaymentSchema.index({ 'amount.currency': 1 });

export const PaymentModel = model<Payment>('Payment', PaymentSchema);
