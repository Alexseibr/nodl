import { Router } from 'express';
import { TendersController } from './tenders.controller';
import { TenderService } from './tenders.service';

export function createTendersRouter(service: TenderService): Router {
  const controller = new TendersController(service);
  const router = Router();

  router.post('/tenders', controller.create);
  router.patch('/tenders/:id', controller.update);
  router.post('/tenders/:id/publish', controller.publish);
  router.post('/tenders/:id/cancel', controller.cancel);
  router.get('/tenders/my', controller.listMy);
  router.get('/tenders', controller.listPublic);
  router.get('/tenders/:id', controller.getById);

  return router;
}
