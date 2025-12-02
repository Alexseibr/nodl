import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export const requireAuth = (req: Request, _res: Response, next: NextFunction): void => {
  if (!req.ctx.userId) {
    return next(AppError.unauthorized());
  }
  next();
};
