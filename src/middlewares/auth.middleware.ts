import { Request, Response, NextFunction } from 'express';
import { SessionModel } from '../database/models/Session.model';

export const authMiddleware = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next();
  }

  const token = authHeader.replace('Bearer ', '').trim();
  if (!token) {
    return next();
  }

  const session = await SessionModel.findOne({ token, expiresAt: { $gt: new Date() } });
  if (session) {
    req.ctx.userId = session.user.toString();
  }

  next();
};
