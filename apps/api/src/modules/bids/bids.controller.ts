import { Request, Response } from 'express';
import { createBidSchema, updateBidSchema } from './bids.dto';
import { BidsService } from './bids.service';

export class BidsController {
  constructor(private readonly service: BidsService) {}

  create = (req: Request, res: Response) => {
    try {
      const dto = createBidSchema.parse(req.body);
      const bid = this.service.createBid(req.user?.id || 'mock-contractor', dto);
      if (!bid) return res.status(404).json({ message: 'Tender not found or not published' });
      res.status(201).json(bid);
    } catch (error) {
      res.status(400).json({ message: 'Invalid bid payload', error });
    }
  };

  update = (req: Request, res: Response) => {
    try {
      const dto = updateBidSchema.parse(req.body);
      const bid = this.service.updateBid(req.params.id, req.user?.id || 'mock-contractor', dto);
      if (!bid) return res.status(404).json({ message: 'Bid not found or not editable' });
      res.json(bid);
    } catch (error) {
      res.status(400).json({ message: 'Invalid bid payload', error });
    }
  };

  listMy = (req: Request, res: Response) => {
    const bids = this.service.listMyBids(req.user?.id || 'mock-contractor');
    res.json(bids);
  };

  listByTender = (req: Request, res: Response) => {
    const bids = this.service.listByTender(req.params.id);
    res.json(bids);
  };

  shortlist = (req: Request, res: Response) => {
    const bid = this.service.shortlistBid(req.params.id, req.params.bidId, req.user?.id || 'mock-user');
    if (!bid) return res.status(404).json({ message: 'Bid or tender not found' });
    res.json(bid);
  };

  accept = (req: Request, res: Response) => {
    const bid = this.service.acceptBid(req.params.id, req.params.bidId, req.user?.id || 'mock-user');
    if (!bid) return res.status(404).json({ message: 'Bid or tender not found' });
    res.json(bid);
  };
}
