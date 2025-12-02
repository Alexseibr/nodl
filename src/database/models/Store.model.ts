import { Schema, model, Document, Model } from "mongoose";
import { GeoPointSchema } from "../schemas/common/geoPoint.schema";
import { LocalizedStringSchema, LocalizedString } from "../schemas/common/localizedString.schema";
import { GeoPoint, GeoAddressRef } from "../types";
import { ModerationSchema } from "../schemas/common/moderation.schema";
import { MediaItem, MediaItemSchema } from "../schemas/common/mediaItem.schema";

export type StoreType = "store" | "farmer" | "builder" | "brigade";

export interface Store extends Document {
  type: StoreType;
  ownerUserId: string;
  name: LocalizedString;
  description?: LocalizedString;
  logo?: string;
  banner?: string;
  geoPoint?: GeoPoint;
  geoAddress?: GeoAddressRef;
  schedule?: string;
  categories: string[];
  rating: number;
  reviewsCount: number;
  subscriptionPlanCode: string; // FREE/PRO/MAX
  isActive: boolean;
  media?: MediaItem[];
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

const StoreSchema = new Schema<Store>(
  {
    type: {
      type: String,
      enum: ["store", "farmer", "builder", "brigade"],
      required: true,
    },
    ownerUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: { type: LocalizedStringSchema, required: true },
    description: { type: LocalizedStringSchema },

    logo: String,
    banner: String,

    geoPoint: GeoPointSchema,
    geoAddress: GeoAddressRefSchema,

    schedule: String,

    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],

    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },

    subscriptionPlanCode: { type: String, default: "FREE" },

    isActive: { type: Boolean, default: true },

    media: [MediaItemSchema],

    moderation: { type: ModerationSchema, default: { status: "pending" } },
  },
  { timestamps: true }
);

StoreSchema.index({ type: 1 });
StoreSchema.index({ ownerUserId: 1 });
StoreSchema.index({ "geoPoint.coordinates": "2dsphere" });
StoreSchema.index({ "name.ru": "text", "name.en": "text", "name.pl": "text" });

export const StoreModel: Model<Store> = model<Store>("Store", StoreSchema);

