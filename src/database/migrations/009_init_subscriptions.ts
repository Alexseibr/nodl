import { SubscriptionPlanModel } from '../models/SubscriptionPlan.model';
import { UserSubscriptionModel } from '../models/UserSubscription.model';
import { seedSubscriptionPlans } from '../seed/seedSubscriptionPlans';

export const run009_init_subscriptions = async (): Promise<void> => {
  await SubscriptionPlanModel.createCollection();
  await UserSubscriptionModel.createCollection();

  await SubscriptionPlanModel.syncIndexes();
  await UserSubscriptionModel.syncIndexes();

  await seedSubscriptionPlans();

  console.log('Migration 009_init_subscriptions done');
};

export const up = run009_init_subscriptions;
