import { Schema, model, Types, Document } from 'mongoose';
import { GeoPointSchema, LanguageCode, PriceNormalized, PriceNormalizedSchema } from './common';

export type UserRole =
  | 'user'
  | 'seller'
  | 'farmer'
  | 'builder'
  | 'foreman'
  | 'storeOwner'
  | 'admin'
  | 'moderator';

export interface UserVerification {
  idPhotos: string[];
  status: 'pending' | 'verified' | 'rejected';
}

export interface UserSession {
  webToken?: string;
  nonce?: string;
  deepLinkReturnURL?: string;
  deviceInfo?: Record<string, unknown>;
  fcmTokens?: string[];
  lastLoginAt?: Date;
}

export interface User extends Document {
  telegramId?: string;
  phone: string;
  email?: string;
  roles: UserRole[];
  geo?: {
    location?: { type: 'Point'; coordinates: [number, number] };
    cityId?: Types.ObjectId;
    countryCode?: string;
  };
  language: LanguageCode;
  balance?: {
    amount: number;
    currency: 'BYN' | 'RUB' | 'PLN' | 'EUR';
    normalized?: PriceNormalized;
  };
  referralCode?: string;
  referredBy?: Types.ObjectId;
  verification?: UserVerification;
  sessions?: UserSession[];
  favorites?: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const VerificationSchema = new Schema<UserVerification>(
  {
    idPhotos: [{ type: String }],
    status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  },
  { _id: false }
);

const SessionSchema = new Schema<UserSession>(
  {
    webToken: String,
    nonce: String,
    deepLinkReturnURL: String,
    deviceInfo: Schema.Types.Mixed,
    fcmTokens: [String],
    lastLoginAt: Date,
  },
  { _id: false, timestamps: true }
);

const UserSchema = new Schema<User>(
  {
    telegramId: { type: String, unique: true, sparse: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, sparse: true },
    roles: { type: [String], enum: ['user', 'seller', 'farmer', 'builder', 'foreman', 'storeOwner', 'admin', 'moderator'], default: ['user'] },
    geo: {
      location: GeoPointSchema,
      cityId: { type: Types.ObjectId, ref: 'City' },
      countryCode: { type: String, enum: ['BY', 'RU', 'PL'] },
    },
    language: { type: String, enum: ['ru', 'en', 'pl'], default: 'ru' },
    balance: {
      amount: { type: Number, default: 0 },
      currency: { type: String, enum: ['BYN', 'RUB', 'PLN', 'EUR'], default: 'EUR' },
      normalized: PriceNormalizedSchema,
    },
    referralCode: { type: String, unique: true, sparse: true },
    referredBy: { type: Types.ObjectId, ref: 'User' },
    verification: VerificationSchema,
    sessions: [SessionSchema],
    favorites: [{ type: Types.ObjectId, ref: 'Ad' }],
  },
  { timestamps: true }
);

UserSchema.index({ 'geo.location': '2dsphere' });
UserSchema.index({ language: 1 });
UserSchema.index({ roles: 1 });
UserSchema.index({ referralCode: 1 });

export const UserModel = model<User>('User', UserSchema);
