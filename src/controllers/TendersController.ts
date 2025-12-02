import { Request, Response, NextFunction } from 'express';
import { TendersService } from '../services/TendersService';
import { TenderResponsesService } from '../services/TenderResponsesService';
import { sendSuccess } from '../utils/responses';

export const TendersController = {
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await TendersService.list(req.query as any);
      sendSuccess(res, data);
    } catch (err) {
      next(err);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tender = await TendersService.create(req.body, req.ctx.userId!);
      sendSuccess(res, tender, 201);
    } catch (err) {
      next(err);
    }
  },
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tender = await TendersService.get(req.params.id);
      sendSuccess(res, tender);
    } catch (err) {
      next(err);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tender = await TendersService.update(req.params.id, req.body, req.ctx.userId!);
      sendSuccess(res, tender);
    } catch (err) {
      next(err);
    }
  },
  close: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tender = await TendersService.close(req.params.id, req.ctx.userId!);
      sendSuccess(res, tender);
    } catch (err) {
      next(err);
    }
  },
  listResponses: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const responses = await TenderResponsesService.list(req.params.id);
      sendSuccess(res, responses);
    } catch (err) {
      next(err);
    }
  },
  createResponse: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await TenderResponsesService.create(req.params.id, req.body, req.ctx.userId!);
      sendSuccess(res, response, 201);
    } catch (err) {
      next(err);
    }
  },
};
