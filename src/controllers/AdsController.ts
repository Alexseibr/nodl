import { Request, Response, NextFunction } from 'express';
import { AdsService } from '../services/AdsService';
import { sendSuccess } from '../utils/responses';

export const AdsController = {
  listAds: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await AdsService.searchAds(req.query as any, req.ctx);
      sendSuccess(res, data);
    } catch (err) {
      next(err);
    }
  },
  createAd: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ad = await AdsService.createAd(req.body, req.ctx.userId!, req.ctx);
      sendSuccess(res, ad, 201);
    } catch (err) {
      next(err);
    }
  },
  getAd: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ad = await AdsService.getAd(req.params.id);
      sendSuccess(res, ad);
    } catch (err) {
      next(err);
    }
  },
  updateAd: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ad = await AdsService.updateAd(req.params.id, req.body, req.ctx.userId!);
      sendSuccess(res, ad);
    } catch (err) {
      next(err);
    }
  },
  deleteAd: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AdsService.deleteAd(req.params.id, req.ctx.userId!);
      sendSuccess(res, true);
    } catch (err) {
      next(err);
    }
  },
  viewAd: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AdsService.registerView(req.params.id, req.ctx, req.body);
      sendSuccess(res, true);
    } catch (err) {
      next(err);
    }
  },
  favoriteAd: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AdsService.setFavorite(req.params.id, req.ctx.userId!, true);
      sendSuccess(res, true);
    } catch (err) {
      next(err);
    }
  },
  unfavoriteAd: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AdsService.setFavorite(req.params.id, req.ctx.userId!, false);
      sendSuccess(res, true);
    } catch (err) {
      next(err);
    }
  },
  bumpAd: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payment = await AdsService.bumpAd(req.params.id, req.ctx.userId!);
      sendSuccess(res, payment);
    } catch (err) {
      next(err);
    }
  },
  highlightAd: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payment = await AdsService.highlightAd(req.params.id, req.ctx.userId!);
      sendSuccess(res, payment);
    } catch (err) {
      next(err);
    }
  },
};
