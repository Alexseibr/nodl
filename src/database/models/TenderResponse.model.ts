import { Schema, model, Document, Model } from "mongoose";
import { MultiCurrencyPrice } from "../types";
import { PriceMultiCurrencySchema } from "../schemas/common/priceMultiCurrency.schema";
import { MediaItem, MediaItemSchema } from "../schemas/common/mediaItem.schema";

export type TenderResponseStatus =
  | "sent"
  | "shortlisted"
  | "selected"
  | "rejected";

export interface TenderResponse extends Document {
  tenderId: string;
  builderStoreId: string;
  priceOffer?: MultiCurrencyPrice;
  comment?: string;
  attachments?: MediaItem[];
  status: TenderResponseStatus;
  ratingAfterWork?: number;
  createdAt: Date;
  updatedAt: Date;
}

const TenderResponseSchema = new Schema<TenderResponse>(
  {
    tenderId: {
      type: Schema.Types.ObjectId,
      ref: "Tender",
      required: true,
      index: true,
    },
    builderStoreId: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true,
      index: true,
    },

    priceOffer: { type: PriceMultiCurrencySchema },

    comment: String,

    attachments: [MediaItemSchema],

    status: {
      type: String,
      enum: ["sent", "shortlisted", "selected", "rejected"],
      default: "sent",
      index: true,
    },

    ratingAfterWork: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

export const TenderResponseModel: Model<TenderResponse> = model<TenderResponse>(
  "TenderResponse",
  TenderResponseSchema
);

