import { createBidsPromotionsRouter } from './bids-promotions.controller';
import { BidsPromotionsService } from './bids-promotions.service';
import { monetizationRepository, monetizationService } from '../monetization';
import { SubscriptionsService } from '../subscriptions/subscriptions.service';

export const promotionsService = new BidsPromotionsService(
  monetizationService,
  monetizationRepository,
);
export const promotionsRouter = createBidsPromotionsRouter(promotionsService);

export function createPromotionsServiceWithSubscriptions(subscriptionsService: SubscriptionsService) {
  return new BidsPromotionsService(monetizationService, monetizationRepository, subscriptionsService);
}

export * from './bids-promotions.types';
export * from './bids-promotions.service';
