import { Request, Response, Router } from 'express';
import { billingHistoryQuerySchema, paySchema, webhookSchema } from './monetization.dto';
import { MonetizationService } from './monetization.service';

export class MonetizationController {
  constructor(private readonly service: MonetizationService) {}

  pay = (req: Request, res: Response) => {
    try {
      const dto = paySchema.parse(req.body);
      const payment = this.service.recordPayment(dto.userId, dto.amount, dto.currency, dto.description, dto.meta);
      res.status(201).json(payment);
    } catch (error) {
      res.status(400).json({ message: 'Invalid payment payload', error });
    }
  };

  webhook = (req: Request, res: Response) => {
    try {
      const dto = webhookSchema.parse(req.body);
      const record = this.service.webhook(dto.event, dto.payload);
      res.status(202).json(record);
    } catch (error) {
      res.status(400).json({ message: 'Invalid webhook payload', error });
    }
  };

  history = (req: Request, res: Response) => {
    try {
      const query = billingHistoryQuerySchema.parse({ userId: req.query.userId });
      const history = this.service.listBilling(query.userId);
      res.json(history);
    } catch (error) {
      res.status(400).json({ message: 'Invalid billing query', error });
    }
  };
}

export function createMonetizationRouter(service: MonetizationService): Router {
  const controller = new MonetizationController(service);
  const router = Router();

  router.post('/billing/pay', controller.pay);
  router.post('/billing/webhook', controller.webhook);
  router.get('/billing/history', controller.history);

  return router;
}
