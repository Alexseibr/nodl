import { SubscriptionModel } from '../../models/Subscription';

export async function seedSubscriptions() {
  const plans = [
    {
      planName: 'PRO',
      country: 'BY',
      price: { BYN: 49, RUB: 0, PLN: 0, EUR: 12 },
      features: { highlightCount: 5, analytics: true, unlimitedAds: true },
      billingCycle: 'monthly',
      autoRenew: true,
    },
    {
      planName: 'PRO',
      country: 'RU',
      price: { BYN: 0, RUB: 1990, PLN: 0, EUR: 19 },
      features: { highlightCount: 5, analytics: true, unlimitedAds: true },
      billingCycle: 'monthly',
      autoRenew: true,
    },
    {
      planName: 'PRO',
      country: 'PL',
      price: { BYN: 0, RUB: 0, PLN: 99, EUR: 22 },
      features: { highlightCount: 5, analytics: true, unlimitedAds: true },
      billingCycle: 'monthly',
      autoRenew: true,
    },
  ];

  for (const plan of plans) {
    await SubscriptionModel.updateOne({ planName: plan.planName, country: plan.country }, plan, { upsert: true });
  }
}
