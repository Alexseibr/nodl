import { Request, Response, Router } from 'express';
import { subscriptionBuySchema, subscriptionCancelSchema } from '../monetization/monetization.dto';
import { SubscriptionsService } from './subscriptions.service';

export class SubscriptionsController {
  constructor(private readonly service: SubscriptionsService) {}

  plans = (_req: Request, res: Response) => {
    res.json(this.service.getPlans());
  };

  my = (req: Request, res: Response) => {
    const userId = (req.user?.id as string) || (req.query.userId as string) || 'mock-user';
    const subscription = this.service.getMySubscription(userId);
    res.json(subscription ?? null);
  };

  buy = (req: Request, res: Response) => {
    try {
      const dto = subscriptionBuySchema.parse(req.body);
      const subscription = this.service.buy(dto.userId, dto.plan, dto.country, dto.currency);
      res.status(201).json(subscription);
    } catch (error) {
      res.status(400).json({ message: 'Invalid subscription payload', error });
    }
  };

  cancel = (req: Request, res: Response) => {
    try {
      const dto = subscriptionCancelSchema.parse(req.body);
      const subscription = this.service.cancel(dto.userId);
      res.json(subscription ?? { message: 'not-found' });
    } catch (error) {
      res.status(400).json({ message: 'Invalid subscription payload', error });
    }
  };
}

export function createSubscriptionsRouter(service: SubscriptionsService): Router {
  const controller = new SubscriptionsController(service);
  const router = Router();

  router.get('/subscriptions/plans', controller.plans);
  router.get('/subscriptions/my', controller.my);
  router.post('/subscriptions/buy', controller.buy);
  router.post('/subscriptions/cancel', controller.cancel);

  return router;
}
