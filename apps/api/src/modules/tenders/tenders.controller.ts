import { Request, Response } from 'express';
import {
  createTenderSchema,
  listTendersQuerySchema,
  updateTenderSchema,
} from './tenders.dto';
import { TenderService } from './tenders.service';

export class TendersController {
  constructor(private readonly service: TenderService) {}

  create = (req: Request, res: Response) => {
    try {
      const dto = createTenderSchema.parse(req.body);
      const tender = this.service.createTender(req.user?.id || 'mock-user', dto);
      res.status(201).json(tender);
    } catch (error) {
      res.status(400).json({ message: 'Invalid tender payload', error });
    }
  };

  update = (req: Request, res: Response) => {
    try {
      const dto = updateTenderSchema.parse(req.body);
      const tender = this.service.updateTender(req.params.id, req.user?.id || 'mock-user', dto);
      if (!tender) return res.status(404).json({ message: 'Tender not found or not editable' });
      res.json(tender);
    } catch (error) {
      res.status(400).json({ message: 'Invalid tender payload', error });
    }
  };

  publish = (req: Request, res: Response) => {
    const tender = this.service.publishTender(req.params.id, req.user?.id || 'mock-user');
    if (!tender) return res.status(404).json({ message: 'Tender not found' });
    res.json(tender);
  };

  cancel = (req: Request, res: Response) => {
    const tender = this.service.cancelTender(req.params.id, req.user?.id || 'mock-user');
    if (!tender) return res.status(404).json({ message: 'Tender not found' });
    res.json(tender);
  };

  listMy = (req: Request, res: Response) => {
    const query = listTendersQuerySchema.partial().parse(req.query);
    const tenders = this.service.listMyTenders(req.user?.id || 'mock-user', query);
    res.json(tenders);
  };

  listPublic = (req: Request, res: Response) => {
    const query = listTendersQuerySchema.partial().parse(req.query);
    const tenders = this.service.listPublic(query);
    res.json(tenders);
  };

  getById = (req: Request, res: Response) => {
    const tender = this.service.getById(req.params.id);
    if (!tender) return res.status(404).json({ message: 'Tender not found' });
    res.json(tender);
  };
}
