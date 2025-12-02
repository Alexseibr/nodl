import { Request, Response, Router } from 'express';
import { promotionPurchaseSchema } from '../monetization/monetization.dto';
import { BidsPromotionsService } from './bids-promotions.service';

export class BidsPromotionsController {
  constructor(private readonly service: BidsPromotionsService) {}

  boost = (req: Request, res: Response) => this.handlePromotion('boost', req, res);
  highlight = (req: Request, res: Response) => this.handlePromotion('highlight', req, res);
  priority = (req: Request, res: Response) => this.handlePromotion('priority', req, res);

  status = (req: Request, res: Response) => {
    const promotions = this.service.getStatus(req.params.bidId);
    res.json({ bidId: req.params.bidId, active: promotions });
  };

  private handlePromotion(type: 'boost' | 'highlight' | 'priority', req: Request, res: Response) {
    try {
      const dto = promotionPurchaseSchema.parse({
        ...req.body,
        bidId: req.params.bidId,
        type,
      });
      const promotion = this.service.promoteBid(dto.bidId, dto.userId, dto.type, dto.country, dto.currency);
      res.status(201).json(promotion);
    } catch (error) {
      res.status(400).json({ message: 'Invalid promotion payload', error });
    }
  }
}

export function createBidsPromotionsRouter(service: BidsPromotionsService): Router {
  const controller = new BidsPromotionsController(service);
  const router = Router();

  router.post('/bids-promotions/:bidId/boost', controller.boost);
  router.post('/bids-promotions/:bidId/highlight', controller.highlight);
  router.post('/bids-promotions/:bidId/priority', controller.priority);
  router.get('/bids-promotions/:bidId/status', controller.status);

  return router;
}
