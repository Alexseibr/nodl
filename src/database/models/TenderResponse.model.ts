import { Schema, model, Document } from 'mongoose';
import { MultiCurrencyPrice } from '../types/currency.types';

export interface TenderResponse extends Document {
  tender: Schema.Types.ObjectId;
  contractor: Schema.Types.ObjectId;
  message: string;
  price?: MultiCurrencyPrice;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

const PriceSchema = new Schema<MultiCurrencyPrice>({ baseCurrency: String, values: { type: Map, of: Number } });

const TenderResponseSchema = new Schema<TenderResponse>({
  tender: { type: Schema.Types.ObjectId, ref: 'Tender', required: true },
  contractor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  price: PriceSchema,
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, { timestamps: true });

TenderResponseSchema.index({ tender: 1, contractor: 1 }, { unique: true });

export const TenderResponseModel = model<TenderResponse>('TenderResponse', TenderResponseSchema);
