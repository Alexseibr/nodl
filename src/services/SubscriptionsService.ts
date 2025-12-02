import { SubscriptionPlanModel } from '../database/models/SubscriptionPlan.model';
import { UserSubscriptionModel } from '../database/models/UserSubscription.model';
import { AppError } from '../utils/errors';

export const SubscriptionsService = {
  async listPlans() {
    return SubscriptionPlanModel.find({}).sort({ createdAt: 1 });
  },

  async subscribe(userId: string, planId: string) {
    const plan = await SubscriptionPlanModel.findById(planId);
    if (!plan) throw AppError.notFound('Plan not found');
    const subscription = await UserSubscriptionModel.create({ user: userId, plan: planId, startedAt: new Date(), autoRenew: true });
    return subscription;
  },

  async current(userId: string) {
    return UserSubscriptionModel.find({ user: userId }).populate('plan');
  },

  async cancel(subscriptionId: string, userId: string) {
    const sub = await UserSubscriptionModel.findById(subscriptionId);
    if (!sub) throw AppError.notFound('Subscription not found');
    if (sub.user.toString() !== userId) throw AppError.forbidden();
    sub.autoRenew = false;
    await sub.save();
    return sub;
  },
};
