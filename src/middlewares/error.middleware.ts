import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';
import { sendError } from '../utils/responses';
import { LogEventModel } from '../database/models/LogEvent.model';
import { config } from '../config/env';

export const errorMiddleware = async (err: Error, _req: Request, res: Response, _next: NextFunction): Promise<void> => {
  if (err instanceof AppError) {
    return sendError(res, err);
  }

  if (config.nodeEnv === 'production') {
    await LogEventModel.create({ level: 'error', message: err.message, context: { stack: err.stack } });
  }

  const fallback = new AppError('INTERNAL_ERROR', 500, 'Internal server error');
  sendError(res, fallback);
};
