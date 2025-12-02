import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../database/models/User.model';
import { AppError } from '../utils/errors';
import { UserRole } from '../database/types/roles.types';

export const requireRole = (roles: UserRole[]) => async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  if (!req.ctx.userId) {
    return next(AppError.unauthorized());
  }

  const user = await UserModel.findById(req.ctx.userId);
  if (!user || !roles.includes(user.role)) {
    return next(AppError.forbidden());
  }

  next();
};
