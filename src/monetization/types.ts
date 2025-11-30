import { Request } from 'express';
import { CountryCode } from './models/Country';
import { CurrencyCode, SupportedLocale } from './models/Currency';

export interface RequestUserShape {
  country?: CountryCode;
  locale?: SupportedLocale;
  currency?: CurrencyCode;
  roles?: string[];
}

export interface RequestWithUser extends Request {
  user?: RequestUserShape;
}
