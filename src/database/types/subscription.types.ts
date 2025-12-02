import { CurrencyCode } from './currency.types';

export interface SubscriptionPlanDefinition {
  code: string;
  name: string;
  features: string[];
  monthlyPrice: Partial<Record<CurrencyCode, number>>;
  yearlyPrice?: Partial<Record<CurrencyCode, number>>;
}
