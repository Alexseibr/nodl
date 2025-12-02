import { SubscriptionPlanModel } from '../models/SubscriptionPlan.model';

export const seedSubscriptionPlans = async (): Promise<void> => {
  const plans = [
    {
      code: 'pro-monthly',
      name: 'PRO Monthly',
      features: ['priority', 'analytics', 'leads'],
      monthlyPrice: { BYN: 25, RUB: 750, PLN: 60, EUR: 20 },
    },
    {
      code: 'pro-yearly',
      name: 'PRO Yearly',
      features: ['priority', 'analytics', 'leads'],
      monthlyPrice: { EUR: 18 },
      yearlyPrice: { BYN: 250, RUB: 7500, PLN: 600, EUR: 200 },
    },
  ];

  for (const plan of plans) {
    await SubscriptionPlanModel.updateOne({ code: plan.code }, { $set: plan }, { upsert: true });
  }
};
