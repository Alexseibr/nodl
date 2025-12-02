import { MonetizationService } from '../monetization/monetization.service';
import { MonetizationRepository } from '../monetization/monetization.repository';
import { Promotion, Subscription } from '../monetization/monetization.types';
import { resolveDuration, resolvePromotionPrice } from './bids-promotions.types';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

export class BidsPromotionsService {
  constructor(
    private readonly monetizationService: MonetizationService,
    private readonly repository: MonetizationRepository,
    private readonly subscriptionsService?: SubscriptionsService,
  ) {}

  promoteBid(bidId: string, userId: string, type: Promotion['type'], country: string, currency: string): Promotion {
    const price = resolvePromotionPrice(type, country as any);
    const duration = resolveDuration(type);
    return this.monetizationService.createPromotion(
      bidId,
      userId,
      type,
      price,
      currency as any,
      duration,
    );
  }

  getStatus(bidId: string): Promotion[] {
    return this.repository
      .listPromotions()
      .filter((promo) => promo.bidId === bidId && promo.status === 'active' && promo.expiresAt > new Date());
  }

  getSubscriptionTier(userId: string): Subscription['plan'] | 'free' {
    const subscription = this.subscriptionsService?.getMySubscription(userId);
    return subscription?.plan ?? 'free';
  }
}
