import { CountryCode, CurrencyCode, Subscription } from '../monetization/monetization.types';
import { subscriptionPlans } from './subscription-plans';

export interface SubscriptionPlanDto {
  code: keyof typeof subscriptionPlans;
  title: string;
  limits: { bidsMonthly: number };
  features: typeof subscriptionPlans[keyof typeof subscriptionPlans]['features'];
  price: Record<CurrencyCode, number>;
}

export interface SubscriptionResponse extends Subscription {
  remainingBids?: number;
}
