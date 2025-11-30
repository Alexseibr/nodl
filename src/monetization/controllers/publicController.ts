import { Request, Response, NextFunction } from 'express';
import {
  getActiveSubscriptionPlansForUser,
  getLeadPriceForUser,
  getPromotionProductsForUser,
  getEscrowConfigForUser,
} from '../services/monetizationService';
import { SupportedLocale } from '../models';
import { resolveUserContext } from '../utils/locale';

export async function getPlans(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as any).user || {};
    const context = await resolveUserContext(user, req.query.locale as SupportedLocale);
    const plans = await getActiveSubscriptionPlansForUser(context);
    res.json({ country: { countryCode: context.countryCode, currencyCode: context.currencyCode }, locale: context.locale, plans });
  } catch (error) {
    next(error);
  }
}

export async function getLeadPrices(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as any).user || {};
    const allowedRoles = ['master', 'foreman', 'contractor'];
    const roles: string[] = user.roles || [];
    if (!roles.some((r) => allowedRoles.includes(r))) {
      res.status(403).json({ message: 'Access restricted to professional roles' });
      return;
    }
    const context = await resolveUserContext(user, req.query.locale as SupportedLocale);
    const categoryCode = req.query.categoryCode as string;
    if (!categoryCode) {
      res.status(400).json({ message: 'categoryCode is required' });
      return;
    }
    const price = await getLeadPriceForUser(context, categoryCode);
    if (!price) {
      res.status(404).json({ message: 'Lead price not found for category' });
      return;
    }
    res.json({ categoryCode, price });
  } catch (error) {
    next(error);
  }
}

export async function getPromotions(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as any).user || {};
    const context = await resolveUserContext(user, req.query.locale as SupportedLocale);
    const promotions = await getPromotionProductsForUser(context);
    res.json({ country: { countryCode: context.countryCode, currencyCode: context.currencyCode }, locale: context.locale, promotions });
  } catch (error) {
    next(error);
  }
}

export async function getEscrowConfig(req: Request, res: Response, next: NextFunction) {
  try {
    const user = (req as any).user || {};
    const context = await resolveUserContext(user, req.query.locale as SupportedLocale);
    const config = await getEscrowConfigForUser(context);
    if (!config) {
      res.status(404).json({ message: 'Escrow config not found' });
      return;
    }
    res.json({ country: { countryCode: context.countryCode, currencyCode: context.currencyCode }, locale: context.locale, config });
  } catch (error) {
    next(error);
  }
}
