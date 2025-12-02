import { Schema, model, Document, Types } from 'mongoose';
import { PriceNormalizedSchema } from './common';

export type TenderResponseStatus = 'sent' | 'shortlisted' | 'selected' | 'rejected';

export interface TenderResponse extends Document {
  tenderId: Types.ObjectId;
  builderId: Types.ObjectId;
  priceOffer: number;
  currency: 'BYN' | 'RUB' | 'PLN' | 'EUR';
  normalizedPrice?: typeof PriceNormalizedSchema;
  comment?: string;
  attachments?: string[];
  ratingAfterWork?: number;
  status: TenderResponseStatus;
  createdAt: Date;
  updatedAt: Date;
}

const TenderResponseSchema = new Schema<TenderResponse>(
  {
    tenderId: { type: Types.ObjectId, ref: 'Tender', required: true, index: true },
    builderId: { type: Types.ObjectId, ref: 'Store', required: true, index: true },
    priceOffer: { type: Number, required: true },
    currency: { type: String, enum: ['BYN', 'RUB', 'PLN', 'EUR'], default: 'EUR' },
    normalizedPrice: PriceNormalizedSchema,
    comment: String,
    attachments: [String],
    ratingAfterWork: { type: Number, min: 1, max: 5 },
    status: { type: String, enum: ['sent', 'shortlisted', 'selected', 'rejected'], default: 'sent', index: true },
  },
  { timestamps: true }
);

TenderResponseSchema.index({ tenderId: 1, builderId: 1 }, { unique: true });

export const TenderResponseModel = model<TenderResponse>('TenderResponse', TenderResponseSchema);
