import { SubscriptionPlanCode } from '../monetization/monetization.types';

export const subscriptionPlans: Record<SubscriptionPlanCode, {
  title: string;
  limits: { bidsMonthly: number };
  features: {
    autoBoostHours?: number;
    highlightMonthly?: number;
    priorityMonthly?: number;
    analyticsLevel?: 'basic' | 'advanced';
    aiSuggestions?: boolean;
  };
  price: Record<'BYN' | 'RUB' | 'PLN', number>;
}> = {
  starter: {
    title: 'Starter',
    limits: { bidsMonthly: 15 },
    features: {
      autoBoostHours: 24,
      highlightMonthly: 1,
      priorityMonthly: 1,
      analyticsLevel: 'basic',
    },
    price: {
      BYN: 9.9,
      RUB: 390,
      PLN: 19,
    },
  },
  pro: {
    title: 'Pro Builder',
    limits: { bidsMonthly: 30 },
    features: {
      autoBoostHours: 24,
      highlightMonthly: 2,
      priorityMonthly: 2,
      analyticsLevel: 'basic',
    },
    price: {
      BYN: 19.9,
      RUB: 690,
      PLN: 39,
    },
  },
  pro_plus: {
    title: 'Master Pro+',
    limits: { bidsMonthly: Infinity as any },
    features: {
      autoBoostHours: 12,
      highlightMonthly: 4,
      priorityMonthly: 4,
      analyticsLevel: 'advanced',
      aiSuggestions: true,
    },
    price: {
      BYN: 39.9,
      RUB: 1190,
      PLN: 89,
    },
  },
};
