export type CountryCode = 'BY' | 'RU' | 'PL';
export type CurrencyCode = 'BYN' | 'RUB' | 'PLN';

export type PromotionType = 'boost' | 'highlight' | 'priority';
export type PromotionStatus = 'active' | 'expired';

export interface Promotion {
  id: string;
  bidId: string;
  type: PromotionType;
  startsAt: Date;
  expiresAt: Date;
  status: PromotionStatus;
  price: number;
  currency: CurrencyCode;
  userId: string;
}

export type SubscriptionPlanCode = 'starter' | 'pro' | 'pro_plus';
export type SubscriptionStatus = 'active' | 'past_due' | 'cancelled';

export interface SubscriptionLimits {
  bidsMonthly: number;
}

export interface SubscriptionFeatures {
  autoBoostHours?: number;
  highlightMonthly?: number;
  priorityMonthly?: number;
  analyticsLevel?: 'basic' | 'advanced';
  aiSuggestions?: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionPlanCode;
  period: 'month';
  country: CountryCode;
  currency: CurrencyCode;
  limits: SubscriptionLimits;
  features: SubscriptionFeatures;
  nextBillingAt: Date;
  status: SubscriptionStatus;
}

export interface BillingRecord {
  id: string;
  userId: string;
  amount: number;
  currency: CurrencyCode;
  description: string;
  createdAt: Date;
  status: 'paid' | 'failed' | 'pending';
  meta?: Record<string, unknown>;
}
