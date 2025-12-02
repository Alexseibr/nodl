import { createBidsRouter } from './bids.routes';
import { BidRepository } from './bids.repository';
import { BidsService } from './bids.service';
import { tenderRepository } from '../tenders';
import { createPromotionsServiceWithSubscriptions } from '../bids-promotions';
import { subscriptionsService } from '../subscriptions';

export const bidRepository = new BidRepository();
export const bidsService = new BidsService(
  bidRepository,
  tenderRepository,
  createPromotionsServiceWithSubscriptions(subscriptionsService),
);
export const bidsRouter = createBidsRouter(bidsService);

export * from './bids.types';
export * from './bids.dto';
export * from './bids.service';
