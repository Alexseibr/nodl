import { Request, Response, NextFunction } from 'express';
import { PaymentsService } from '../services/PaymentsService';
import { sendSuccess } from '../utils/responses';

export const PaymentsController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payment = await PaymentsService.create(req.ctx.userId!, req.body);
      sendSuccess(res, payment, 201);
    } catch (err) {
      next(err);
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payment = await PaymentsService.get(req.params.id, req.ctx.userId!);
      sendSuccess(res, payment);
    } catch (err) {
      next(err);
    }
  },
};
