import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { sendSuccess } from '../utils/responses';

export const AuthController = {
  telegramInit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await AuthService.initTelegram(req.body, req.ctx);
      sendSuccess(res, session);
    } catch (err) {
      next(err);
    }
  },
  telegramCallback: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await AuthService.initTelegram(req.body, req.ctx);
      sendSuccess(res, session);
    } catch (err) {
      next(err);
    }
  },
  requestPhoneCode: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AuthService.requestPhoneCode(req.body.phone);
      sendSuccess(res, true);
    } catch (err) {
      next(err);
    }
  },
  verifyPhone: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await AuthService.verifyPhoneCode(req.body.phone, req.body.code, req.ctx);
      sendSuccess(res, session);
    } catch (err) {
      next(err);
    }
  },
  me: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await AuthService.me(req.ctx.userId);
      sendSuccess(res, user);
    } catch (err) {
      next(err);
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      await AuthService.logout(token);
      sendSuccess(res, true);
    } catch (err) {
      next(err);
    }
  },
};
