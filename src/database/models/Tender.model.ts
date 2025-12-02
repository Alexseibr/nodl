import { Schema, model, Document, Model } from "mongoose";
import {
  LocalizedString,
  LocalizedStringSchema,
} from "../schemas/common/localizedString.schema";
import {
  GeoPoint,
  GeoAddressRef,
  MultiCurrencyPrice,
  SupportedCurrency,
} from "../types";
import { GeoPointSchema } from "../schemas/common/geoPoint.schema";
import { PriceMultiCurrencySchema } from "../schemas/common/priceMultiCurrency.schema";
import { MediaItem, MediaItemSchema } from "../schemas/common/mediaItem.schema";

export type TenderStatus = "open" | "inProgress" | "closed";

export interface Tender extends Document {
  customerUserId: string;
  title: LocalizedString;
  description?: LocalizedString;
  budgetMin?: MultiCurrencyPrice;
  budgetMax?: MultiCurrencyPrice;
  currency: SupportedCurrency;
  deadline?: Date;
  categoryId?: string;
  geoPoint?: GeoPoint;
  geoAddress?: GeoAddressRef;
  attachments?: MediaItem[];
  status: TenderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const GeoAddressRefSchema = new Schema<GeoAddressRef>(
  {
    countryCode: { type: String, required: true },
    countryId: String,
    regionId: String,
    cityId: String,
    districtId: String,
    addressLine: String,
  },
  { _id: false }
);

const TenderSchema = new Schema<Tender>(
  {
    customerUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: { type: LocalizedStringSchema, required: true },
    description: { type: LocalizedStringSchema },

    budgetMin: { type: PriceMultiCurrencySchema },
    budgetMax: { type: PriceMultiCurrencySchema },
    currency: {
      type: String,
      enum: ["BYN", "RUB", "PLN", "EUR"],
      required: true,
    },

    deadline: { type: Date },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      index: true,
      sparse: true,
    },

    geoPoint: GeoPointSchema,
    geoAddress: GeoAddressRefSchema,

    attachments: [MediaItemSchema],

    status: {
      type: String,
      enum: ["open", "inProgress", "closed"],
      default: "open",
      index: true,
    },
  },
  { timestamps: true }
);

TenderSchema.index({ "geoPoint.coordinates": "2dsphere" });

export const TenderModel: Model<Tender> = model<Tender>(
  "Tender",
  TenderSchema
);

