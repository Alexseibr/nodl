import { z } from 'zod';
import { CountryCode, CurrencyCode, PromotionType, SubscriptionPlanCode } from './monetization.types';

export const paySchema = z.object({
  userId: z.string(),
  amount: z.number().positive(),
  currency: z.enum(['BYN', 'RUB', 'PLN'] satisfies readonly CurrencyCode[]),
  description: z.string(),
  meta: z.record(z.any()).optional(),
});

export const billingHistoryQuerySchema = z.object({
  userId: z.string(),
});

export const webhookSchema = z.object({
  provider: z.string(),
  event: z.string(),
  payload: z.record(z.any()),
});

export const promotionPurchaseSchema = z.object({
  bidId: z.string(),
  userId: z.string(),
  type: z.enum(['boost', 'highlight', 'priority'] satisfies readonly PromotionType[]),
  country: z.enum(['BY', 'RU', 'PL'] satisfies readonly CountryCode[]),
  currency: z.enum(['BYN', 'RUB', 'PLN'] satisfies readonly CurrencyCode[]),
});

export const subscriptionBuySchema = z.object({
  userId: z.string(),
  plan: z.enum(['starter', 'pro', 'pro_plus'] satisfies readonly SubscriptionPlanCode[]),
  country: z.enum(['BY', 'RU', 'PL'] satisfies readonly CountryCode[]),
  currency: z.enum(['BYN', 'RUB', 'PLN'] satisfies readonly CurrencyCode[]),
});

export const subscriptionCancelSchema = z.object({
  userId: z.string(),
});

export type PayDto = z.infer<typeof paySchema>;
export type PromotionPurchaseDto = z.infer<typeof promotionPurchaseSchema>;
export type SubscriptionBuyDto = z.infer<typeof subscriptionBuySchema>;
export type SubscriptionCancelDto = z.infer<typeof subscriptionCancelSchema>;
