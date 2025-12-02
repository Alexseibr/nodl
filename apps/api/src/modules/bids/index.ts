import { createBidsRouter } from './bids.routes';
import { BidRepository } from './bids.repository';
import { BidsService } from './bids.service';
import { tenderRepository } from '../tenders';

export const bidRepository = new BidRepository();
export const bidsService = new BidsService(bidRepository, tenderRepository);
export const bidsRouter = createBidsRouter(bidsService);

export * from './bids.types';
export * from './bids.dto';
export * from './bids.service';
