import { Schema, model, Document, Model } from "mongoose";
import {
  LocalizedString,
  LocalizedStringSchema,
} from "../schemas/common/localizedString.schema";
import { GeoPoint, GeoAddressRef, MultiCurrencyPrice } from "../types";
import { GeoPointSchema } from "../schemas/common/geoPoint.schema";
import { PriceMultiCurrencySchema } from "../schemas/common/priceMultiCurrency.schema";
import { ModerationSchema } from "../schemas/common/moderation.schema";
import { MediaItem, MediaItemSchema } from "../schemas/common/mediaItem.schema";

export interface Ad extends Document {
  authorUserId: string;
  storeId?: string;
  categoryId: string;
  title: LocalizedString;
  description?: LocalizedString;
  price: MultiCurrencyPrice;
  geoPoint?: GeoPoint;
  geoAddress?: GeoAddressRef;
  isPromoted: boolean;
  highlightUntil?: Date;
  bumpCount: number;
  views: number;
  favoritesCount: number;
  stats: {
    clicks?: number;
    shares?: number;
  };
  media: MediaItem[];
  moderation: {
    status: "pending" | "approved" | "rejected";
    reason?: string;
  };
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

const StatsSchema = new Schema(
  {
    clicks: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
  },
  { _id: false }
);

const AdSchema = new Schema<Ad>(
  {
    authorUserId: {
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
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    title: { type: LocalizedStringSchema, required: true },
    description: { type: LocalizedStringSchema },

    price: { type: PriceMultiCurrencySchema, required: true },

    geoPoint: GeoPointSchema,
    geoAddress: GeoAddressRefSchema,

    isPromoted: { type: Boolean, default: false },
    highlightUntil: { type: Date },
    bumpCount: { type: Number, default: 0 },

    views: { type: Number, default: 0 },
    favoritesCount: { type: Number, default: 0 },

    stats: { type: StatsSchema, default: {} },

    media: { type: [MediaItemSchema], default: [] },

    moderation: { type: ModerationSchema, default: { status: "pending" } },
  },
  { timestamps: true }
);

AdSchema.index({ "geoPoint.coordinates": "2dsphere" });
AdSchema.index({
  "title.ru": "text",
  "title.en": "text",
  "title.pl": "text",
  "description.ru": "text",
  "description.en": "text",
  "description.pl": "text",
});
AdSchema.index({ isPromoted: 1, highlightUntil: -1 });

export const AdModel: Model<Ad> = model<Ad>("Ad", AdSchema);

