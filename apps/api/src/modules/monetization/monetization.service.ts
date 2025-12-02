import { randomUUID } from 'crypto';
import { MonetizationRepository } from './monetization.repository';
import {
  BillingRecord,
  CountryCode,
  CurrencyCode,
  Promotion,
  PromotionType,
  Subscription,
  SubscriptionPlanCode,
} from './monetization.types';
import { subscriptionPlans } from '../subscriptions/subscription-plans';

export class MonetizationService {
  constructor(private readonly repository: MonetizationRepository) {}

  recordPayment(userId: string, amount: number, currency: CurrencyCode, description: string, meta?: Record<string, unknown>): BillingRecord {
    return this.repository.addBillingRecord({ userId, amount, currency, description, status: 'paid', meta });
  }

  webhook(event: string, payload: Record<string, unknown>): BillingRecord {
    return this.repository.addBillingRecord({
      userId: (payload.userId as string) ?? 'unknown',
      amount: Number(payload.amount) || 0,
      currency: (payload.currency as CurrencyCode) || 'BYN',
      description: `Webhook event ${event}`,
      status: 'pending',
      meta: payload,
    });
  }

  listBilling(userId: string): BillingRecord[] {
    return this.repository.listBilling(userId);
  }

  createPromotion(
    bidId: string,
    userId: string,
    type: PromotionType,
    price: number,
    currency: CurrencyCode,
    durationHours: number,
  ): Promotion {
    const now = new Date();
    const promotion: Promotion = {
      id: randomUUID(),
      bidId,
      type,
      startsAt: now,
      expiresAt: new Date(now.getTime() + durationHours * 60 * 60 * 1000),
      status: 'active',
      price,
      currency,
      userId,
    };
    this.repository.upsertPromotion(promotion);
    this.recordPayment(userId, price, currency, `Promotion ${type.toUpperCase()} for bid ${bidId}`);
    return promotion;
  }

  expireOldPromotions(): Promotion[] {
    const now = new Date();
    return this.repository
      .listPromotions()
      .filter((promo) => promo.status === 'active' && promo.expiresAt <= now)
      .map((promo) => this.repository.expirePromotion(promo.id)!)
      .filter(Boolean);
  }

  createSubscription(
    userId: string,
    plan: SubscriptionPlanCode,
    country: CountryCode,
    currency: CurrencyCode,
  ): Subscription {
    const planConfig = subscriptionPlans[plan];
    const subscription: Subscription = {
      id: randomUUID(),
      userId,
      plan,
      period: 'month',
      country,
      currency,
      limits: { bidsMonthly: planConfig.limits.bidsMonthly },
      features: planConfig.features,
      nextBillingAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: 'active',
    };
    this.repository.saveSubscription(subscription);
    this.recordPayment(userId, planConfig.price[currency], currency, `Subscription ${plan}`);
    return subscription;
  }

  cancelSubscription(userId: string): Subscription | undefined {
    return this.repository.cancelSubscription(userId);
  }

  getSubscription(userId: string): Subscription | undefined {
    return this.repository.findSubscriptionByUser(userId);
  }
}
