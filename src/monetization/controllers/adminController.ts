import { Request, Response, NextFunction } from 'express';
import {
  adminListEscrowConfigs,
  adminListLeadConfigs,
  adminListPromotions,
  adminListSubscriptionPlans,
  adminUpsertEscrowConfig,
  adminUpsertLeadConfig,
  adminUpsertPromotion,
  adminUpsertSubscriptionPlan,
} from '../services/monetizationService';

function ensureAdmin(req: Request, res: Response): boolean {
  const roles: string[] = (req as any).user?.roles || [];
  if (!roles.includes('admin') && !roles.includes('super_admin')) {
    res.status(403).json({ message: 'Admin access required' });
    return false;
  }
  return true;
}

export async function listPlans(req: Request, res: Response, next: NextFunction) {
  try {
    if (!ensureAdmin(req, res)) return;
    const plans = await adminListSubscriptionPlans();
    res.json({ plans });
  } catch (error) {
    next(error);
  }
}

export async function upsertPlan(req: Request, res: Response, next: NextFunction) {
  try {
    if (!ensureAdmin(req, res)) return;
    const plan = await adminUpsertSubscriptionPlan(req.body);
    res.json({ plan });
  } catch (error) {
    next(error);
  }
}

export async function listLeadConfigs(req: Request, res: Response, next: NextFunction) {
  try {
    if (!ensureAdmin(req, res)) return;
    const configs = await adminListLeadConfigs();
    res.json({ configs });
  } catch (error) {
    next(error);
  }
}

export async function upsertLeadConfig(req: Request, res: Response, next: NextFunction) {
  try {
    if (!ensureAdmin(req, res)) return;
    const config = await adminUpsertLeadConfig(req.body);
    res.json({ config });
  } catch (error) {
    next(error);
  }
}

export async function listPromotions(req: Request, res: Response, next: NextFunction) {
  try {
    if (!ensureAdmin(req, res)) return;
    const promotions = await adminListPromotions();
    res.json({ promotions });
  } catch (error) {
    next(error);
  }
}

export async function upsertPromotion(req: Request, res: Response, next: NextFunction) {
  try {
    if (!ensureAdmin(req, res)) return;
    const promotion = await adminUpsertPromotion(req.body);
    res.json({ promotion });
  } catch (error) {
    next(error);
  }
}

export async function listEscrowConfigs(req: Request, res: Response, next: NextFunction) {
  try {
    if (!ensureAdmin(req, res)) return;
    const configs = await adminListEscrowConfigs();
    res.json({ configs });
  } catch (error) {
    next(error);
  }
}

export async function upsertEscrowConfig(req: Request, res: Response, next: NextFunction) {
  try {
    if (!ensureAdmin(req, res)) return;
    const config = await adminUpsertEscrowConfig(req.body);
    res.json({ config });
  } catch (error) {
    next(error);
  }
}
