import { CurrencyCode } from './Currency';
import { SupportedLocale } from './Currency';

export type BillingPeriod = 'month' | 'year';

export interface PriceLocalized {
  amount: number;
  currency: CurrencyCode;
}

export interface PlanTranslation {
  locale: SupportedLocale;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  bulletPoints?: string[];
}
