import { Request, Response, NextFunction } from 'express';
import { ReviewsService } from '../services/ReviewsService';
import { sendSuccess } from '../utils/responses';

export const ReviewsController = {
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reviews = await ReviewsService.list(req.query as any);
      sendSuccess(res, reviews);
    } catch (err) {
      next(err);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const review = await ReviewsService.create(req.body, req.ctx.userId!);
      sendSuccess(res, review, 201);
    } catch (err) {
      next(err);
    }
  },
  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await ReviewsService.remove(req.params.id, req.ctx.userId!);
      sendSuccess(res, true);
    } catch (err) {
      next(err);
    }
  },
};
