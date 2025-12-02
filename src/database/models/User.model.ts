import { Schema, model, Document } from 'mongoose';
import { LocalizedString } from '../schemas/common/localizedString.schema';
import { UserRole } from '../types/roles.types';

export interface User extends Document {
  phone: string;
  email?: string;
  name: string;
  role: UserRole;
  telegramId?: number;
  language: 'ru' | 'en' | 'pl';
  country: string;
  subscriptions: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const LocalizedSchema = new Schema<LocalizedString>(
  {
    ru: String,
    by: String,
    pl: String,
    en: String,
  },
  { _id: false },
);

const UserSchema = new Schema<User>(
  {
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    name: { type: String, required: true },
    role: { type: String, enum: ['customer', 'master', 'team', 'storeOwner', 'admin', 'moderator'], required: true },
    telegramId: { type: Number, index: true },
    language: { type: String, enum: ['ru', 'en', 'pl'], default: 'ru' },
    country: { type: String, required: true },
    subscriptions: [{ type: Schema.Types.ObjectId, ref: 'UserSubscription' }],
  },
  { timestamps: true },
);

export const UserModel = model<User>('User', UserSchema);
