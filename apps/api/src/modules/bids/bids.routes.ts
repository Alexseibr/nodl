import { Router } from 'express';
import { BidsController } from './bids.controller';
import { BidsService } from './bids.service';

export function createBidsRouter(service: BidsService): Router {
  const controller = new BidsController(service);
  const router = Router();

  router.post('/bids', controller.create);
  router.patch('/bids/:id', controller.update);
  router.get('/bids/my', controller.listMy);
  router.get('/tenders/:id/bids', controller.listByTender);
  router.post('/tenders/:id/bids/:bidId/shortlist', controller.shortlist);
  router.post('/tenders/:id/bids/:bidId/accept', controller.accept);

  return router;
}
