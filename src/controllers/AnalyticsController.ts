import { Request, Response, NextFunction } from 'express';
import { AnalyticsService } from '../services/AnalyticsService';
import { sendSuccess } from '../utils/responses';

export const AnalyticsController = {
  adHeatmap: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await AnalyticsService.adHeatmap(req.params.id);
      sendSuccess(res, data);
    } catch (err) {
      next(err);
    }
  },
  storeHeatmap: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await AnalyticsService.storeHeatmap(req.params.id);
      sendSuccess(res, data);
    } catch (err) {
      next(err);
    }
  },
};
