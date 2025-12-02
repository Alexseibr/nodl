import { Schema, model, Document } from 'mongoose';

export interface UserSubscription extends Document {
  user: Schema.Types.ObjectId;
  plan: Schema.Types.ObjectId;
  startedAt: Date;
  expiresAt?: Date;
  autoRenew: boolean;
}

const UserSubscriptionSchema = new Schema<UserSubscription>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: Schema.Types.ObjectId, ref: 'SubscriptionPlan', required: true },
  startedAt: { type: Date, default: Date.now },
  expiresAt: Date,
  autoRenew: { type: Boolean, default: true },
});

UserSubscriptionSchema.index({ user: 1, plan: 1 }, { unique: false });

export const UserSubscriptionModel = model<UserSubscription>('UserSubscription', UserSubscriptionSchema);
