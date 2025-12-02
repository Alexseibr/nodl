import { randomUUID } from 'crypto';
import { BillingRecord, Promotion, Subscription } from './monetization.types';

export class MonetizationRepository {
  private promotions: Promotion[] = [];
  private subscriptions: Subscription[] = [];
  private billing: BillingRecord[] = [];

  upsertPromotion(promotion: Promotion): Promotion {
    const existingIndex = this.promotions.findIndex(
      (item) => item.bidId === promotion.bidId && item.type === promotion.type && item.status === 'active',
    );
    if (existingIndex >= 0) {
      this.promotions[existingIndex] = promotion;
      return promotion;
    }
    this.promotions.push(promotion);
    return promotion;
  }

  listPromotions(): Promotion[] {
    return this.promotions;
  }

  findActivePromotion(bidId: string, type?: Promotion['type']): Promotion | undefined {
    return this.promotions.find((promo) => {
      const isActive = promo.bidId === bidId && promo.status === 'active' && promo.expiresAt > new Date();
      if (!type) return isActive;
      return isActive && promo.type === type;
    });
  }

  expirePromotion(id: string): Promotion | undefined {
    const index = this.promotions.findIndex((promo) => promo.id === id);
    if (index === -1) return undefined;
    this.promotions[index] = { ...this.promotions[index], status: 'expired' };
    return this.promotions[index];
  }

  saveSubscription(subscription: Subscription): Subscription {
    const index = this.subscriptions.findIndex((item) => item.userId === subscription.userId);
    if (index >= 0) {
      this.subscriptions[index] = subscription;
      return subscription;
    }
    this.subscriptions.push(subscription);
    return subscription;
  }

  findSubscriptionByUser(userId: string): Subscription | undefined {
    return this.subscriptions.find((item) => item.userId === userId && item.status !== 'cancelled');
  }

  cancelSubscription(userId: string): Subscription | undefined {
    const subscription = this.findSubscriptionByUser(userId);
    if (!subscription) return undefined;
    subscription.status = 'cancelled';
    return subscription;
  }

  addBillingRecord(record: Omit<BillingRecord, 'id' | 'createdAt'>): BillingRecord {
    const billingRecord: BillingRecord = {
      id: randomUUID(),
      createdAt: new Date(),
      ...record,
    };
    this.billing.push(billingRecord);
    return billingRecord;
  }

  listBilling(userId: string): BillingRecord[] {
    return this.billing.filter((item) => item.userId === userId);
  }
}
