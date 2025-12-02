import { Request, Response, NextFunction } from 'express';
import { StoresService } from '../services/StoresService';
import { sendSuccess } from '../utils/responses';

export const StoresController = {
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await StoresService.list(req.query as any);
      sendSuccess(res, data);
    } catch (err) {
      next(err);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const store = await StoresService.create(req.body, req.ctx.userId!);
      sendSuccess(res, store, 201);
    } catch (err) {
      next(err);
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const store = await StoresService.get(req.params.id);
      sendSuccess(res, store);
    } catch (err) {
      next(err);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const store = await StoresService.update(req.params.id, req.body, req.ctx.userId!);
      sendSuccess(res, store);
    } catch (err) {
      next(err);
    }
  },
  remove: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await StoresService.remove(req.params.id, req.ctx.userId!);
      sendSuccess(res, true);
    } catch (err) {
      next(err);
    }
  },
};
