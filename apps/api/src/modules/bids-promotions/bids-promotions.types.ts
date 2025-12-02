import { CountryCode, CurrencyCode, Promotion } from '../monetization/monetization.types';

export type PromotionPricing = Record<CountryCode, number>;

export interface PromotionConfig {
  type: Promotion['type'];
  price: PromotionPricing;
  durationHours: number;
}

export const promotionConfigs: PromotionConfig[] = [
  {
    type: 'boost',
    price: { BY: 1.99, RU: 79, PL: 3.99 },
    durationHours: 48,
  },
  {
    type: 'highlight',
    price: { BY: 0.99, RU: 39, PL: 1.99 },
    durationHours: 24 * 7,
  },
  {
    type: 'priority',
    price: { BY: 2.99, RU: 129, PL: 5.99 },
    durationHours: 48,
  },
];

export function resolvePromotionPrice(type: Promotion['type'], country: CountryCode): number {
  const config = promotionConfigs.find((promo) => promo.type === type);
  return config?.price[country] ?? 0;
}

export function resolveDuration(type: Promotion['type']): number {
  const config = promotionConfigs.find((promo) => promo.type === type);
  return config?.durationHours ?? 24;
}

export interface PromotionStatusResponse {
  bidId: string;
  active: Promotion[];
}

export type PromotionCurrencyPayload = { currency: CurrencyCode; country: CountryCode };
