import { Request, Response, NextFunction } from 'express';
import { ReportsService } from '../services/ReportsService';
import { sendSuccess } from '../utils/responses';

export const ReportsController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = await ReportsService.create(req.body, req.ctx.userId!);
      sendSuccess(res, report, 201);
    } catch (err) {
      next(err);
    }
  },
  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const reports = await ReportsService.list();
      sendSuccess(res, reports);
    } catch (err) {
      next(err);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = await ReportsService.update(req.params.id, req.body);
      sendSuccess(res, report);
    } catch (err) {
      next(err);
    }
  },
};
