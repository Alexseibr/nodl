import { Schema, model, Document, Model } from "mongoose";
import { GeoAddressRef, GeoPoint, UserRole } from "../types";
import { GeoPointSchema } from "../schemas/common/geoPoint.schema";

export interface User extends Document {
  telegramId?: string;
  phone?: string;
  email?: string;
  roles: UserRole[];
  language: "ru" | "en" | "pl";
  geoPoint?: GeoPoint;
  geoAddress?: GeoAddressRef;
  balance: number;
  referralCode?: string;
  referredBy?: string;
  verification: {
    status: "unverified" | "pending" | "verified" | "rejected";
    idPhotos?: string[];
    comment?: string;
  };
  deviceInfo?: {
    userAgent?: string;
    platform?: string;
  };
  fcmTokens?: string[];
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

const UserSchema = new Schema<User>(
  {
    telegramId: { type: String, index: true, sparse: true },
    phone: { type: String, index: true, sparse: true },
    email: { type: String, index: true, sparse: true },

    roles: {
      type: [String],
      enum: [
        "user",
        "seller",
        "farmer",
        "builder",
        "foreman",
        "storeOwner",
        "admin",
        "moderator",
      ],
      default: ["user"],
    },

    language: {
      type: String,
      enum: ["ru", "en", "pl"],
      default: "ru",
    },

    geoPoint: { type: GeoPointSchema },
    geoAddress: { type: GeoAddressRefSchema },

    balance: { type: Number, default: 0 },

    referralCode: { type: String, unique: true, sparse: true },
    referredBy: { type: String, index: true, sparse: true },

    verification: {
      status: {
        type: String,
        enum: ["unverified", "pending", "verified", "rejected"],
        default: "unverified",
      },
      idPhotos: [String],
      comment: String,
    },

    deviceInfo: {
      userAgent: String,
      platform: String,
    },

    fcmTokens: [String],
  },
  { timestamps: true }
);

UserSchema.index({ "geoPoint.coordinates": "2dsphere" });
UserSchema.index({ roles: 1 });
UserSchema.index({ language: 1 });

export const UserModel: Model<User> = model<User>("User", UserSchema);

