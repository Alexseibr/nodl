import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../services/UsersService';
import { sendSuccess } from '../utils/responses';

export const UsersController = {
  me: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UsersService.getMe(req.ctx.userId!);
      sendSuccess(res, user);
    } catch (err) {
      next(err);
    }
  },
  updateMe: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UsersService.updateMe(req.ctx.userId!, req.body);
      sendSuccess(res, user);
    } catch (err) {
      next(err);
    }
  },
  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UsersService.getById(req.params.id);
      sendSuccess(res, user);
    } catch (err) {
      next(err);
    }
  },
};
