import { Request, Response, NextFunction } from 'express';
import { TenderResponsesService } from '../services/TenderResponsesService';
import { sendSuccess } from '../utils/responses';

export const TenderResponsesController = {
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await TenderResponsesService.update(req.params.id, req.body, req.ctx.userId!);
      sendSuccess(res, response);
    } catch (err) {
      next(err);
    }
  },
};
