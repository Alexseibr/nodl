import { Response, NextFunction } from 'express';
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
import { RequestWithUser } from '../types';

function ensureAdmin(req: RequestWithUser, res: Response): boolean {
  const roles: string[] = req.user?.roles || [];
  if (!roles.includes('admin') && !roles.includes('super_admin')) {
    res.status(403).json({ message: 'Admin access required' });
    return false;
  }
  return true;
}

export async function listPlans(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    if (!ensureAdmin(req, res)) return;
    const plans = await adminListSubscriptionPlans();
    res.json({ plans });
  } catch (error) {
    next(error);
  }
}

export async function upsertPlan(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    if (!ensureAdmin(req, res)) return;
    const plan = await adminUpsertSubscriptionPlan(req.body);
    res.json({ plan });
  } catch (error) {
    next(error);
  }
}

export async function listLeadConfigs(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    if (!ensureAdmin(req, res)) return;
    const configs = await adminListLeadConfigs();
    res.json({ configs });
  } catch (error) {
    next(error);
  }
}

export async function upsertLeadConfig(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    if (!ensureAdmin(req, res)) return;
    const config = await adminUpsertLeadConfig(req.body);
    res.json({ config });
  } catch (error) {
    next(error);
  }
}

export async function listPromotions(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    if (!ensureAdmin(req, res)) return;
    const promotions = await adminListPromotions();
    res.json({ promotions });
  } catch (error) {
    next(error);
  }
}

export async function upsertPromotion(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    if (!ensureAdmin(req, res)) return;
    const promotion = await adminUpsertPromotion(req.body);
    res.json({ promotion });
  } catch (error) {
    next(error);
  }
}

export async function listEscrowConfigs(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    if (!ensureAdmin(req, res)) return;
    const configs = await adminListEscrowConfigs();
    res.json({ configs });
  } catch (error) {
    next(error);
  }
}

export async function upsertEscrowConfig(req: RequestWithUser, res: Response, next: NextFunction) {
  try {
    if (!ensureAdmin(req, res)) return;
    const config = await adminUpsertEscrowConfig(req.body);
    res.json({ config });
  } catch (error) {
    next(error);
  }
}
