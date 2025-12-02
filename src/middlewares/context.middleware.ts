import { Request, Response, NextFunction } from 'express';
import { RequestContext } from '../types/context';

const SUPPORTED_LANGS: RequestContext['language'][] = ['ru', 'en', 'pl'];

export const contextMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  const langHeader = (req.headers['x-lang'] || req.headers['accept-language'] || 'ru').toString().split(',')[0];
  const language = SUPPORTED_LANGS.includes(langHeader as RequestContext['language']) ? (langHeader as RequestContext['language']) : 'ru';
  const countryCode = req.headers['x-country-code']?.toString();

  req.ctx = { language, countryCode };

  next();
};
