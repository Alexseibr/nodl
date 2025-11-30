import { Router } from 'express';
import {
  getPlans,
  getLeadPrices,
  getPromotions,
  getEscrowConfig,
} from './controllers/publicController';
import {
  listPlans,
  upsertPlan,
  listLeadConfigs,
  upsertLeadConfig,
  listPromotions,
  upsertPromotion,
  listEscrowConfigs,
  upsertEscrowConfig,
} from './controllers/adminController';

export const monetizationPublicRouter = Router();
monetizationPublicRouter.get('/plans', getPlans);
monetizationPublicRouter.get('/lead-prices', getLeadPrices);
monetizationPublicRouter.get('/promotions', getPromotions);
monetizationPublicRouter.get('/escrow-config', getEscrowConfig);

export const adminMonetizationRouter = Router();
adminMonetizationRouter.get('/plans', listPlans);
adminMonetizationRouter.post('/plans', upsertPlan);
adminMonetizationRouter.put('/plans/:id', upsertPlan);
adminMonetizationRouter.get('/lead-configs', listLeadConfigs);
adminMonetizationRouter.post('/lead-configs', upsertLeadConfig);
adminMonetizationRouter.put('/lead-configs/:id', upsertLeadConfig);
adminMonetizationRouter.get('/promotions', listPromotions);
adminMonetizationRouter.post('/promotions', upsertPromotion);
adminMonetizationRouter.put('/promotions/:id', upsertPromotion);
adminMonetizationRouter.get('/escrow-configs', listEscrowConfigs);
adminMonetizationRouter.post('/escrow-configs', upsertEscrowConfig);
adminMonetizationRouter.put('/escrow-configs/:id', upsertEscrowConfig);
