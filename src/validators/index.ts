import { AnyZodObject, ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export const validateBody = (schema: AnyZodObject) => (req: Request, _res: Response, next: NextFunction): void => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    const error = err as ZodError;
    next(new AppError('VALIDATION_ERROR', 400, error.message));
  }
};

export const validateQuery = (schema: AnyZodObject) => (req: Request, _res: Response, next: NextFunction): void => {
  try {
    req.query = schema.parse(req.query);
    next();
  } catch (err) {
    const error = err as ZodError;
    next(new AppError('VALIDATION_ERROR', 400, error.message));
  }
};
