import { Request, Response, NextFunction } from 'express';
import { SubscriptionsService } from '../services/SubscriptionsService';
import { sendSuccess } from '../utils/responses';

export const SubscriptionsController = {
  plans: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const plans = await SubscriptionsService.listPlans();
      sendSuccess(res, plans);
    } catch (err) {
      next(err);
    }
  },
  subscribe: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sub = await SubscriptionsService.subscribe(req.ctx.userId!, req.body.planId);
      sendSuccess(res, sub, 201);
    } catch (err) {
      next(err);
    }
  },
  mine: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const subs = await SubscriptionsService.current(req.ctx.userId!);
      sendSuccess(res, subs);
    } catch (err) {
      next(err);
    }
  },
  cancel: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const sub = await SubscriptionsService.cancel(req.params.id, req.ctx.userId!);
      sendSuccess(res, sub);
    } catch (err) {
      next(err);
    }
  },
};
