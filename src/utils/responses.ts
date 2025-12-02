import { Response } from 'express';
import { AppError } from './errors';

export const sendSuccess = <T>(res: Response, data: T, status = 200): void => {
  res.status(status).json({ ok: true, data, error: null });
};

export const sendError = (res: Response, error: AppError): void => {
  res.status(error.statusCode).json({ ok: false, data: null, error: { code: error.code, message: error.message } });
};
