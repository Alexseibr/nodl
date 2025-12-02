import { Router } from 'express';
import authRoutes from './auth.routes';
import usersRoutes from './users.routes';
import storesRoutes from './stores.routes';
import adsRoutes from './ads.routes';
import tendersRoutes from './tenders.routes';
import subscriptionsRoutes from './subscriptions.routes';
import paymentsRoutes from './payments.routes';
import reviewsRoutes from './reviews.routes';
import reportsRoutes from './reports.routes';
import geoRoutes from './geo.routes';
import analyticsRoutes from './analytics.routes';
import tenderResponsesRoutes from './tenderResponses.routes';

export const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/users', usersRoutes);
apiRouter.use('/stores', storesRoutes);
apiRouter.use('/ads', adsRoutes);
apiRouter.use('/tenders', tendersRoutes);
apiRouter.use('/tender-responses', tenderResponsesRoutes);
apiRouter.use('/subscriptions', subscriptionsRoutes);
apiRouter.use('/payments', paymentsRoutes);
apiRouter.use('/reviews', reviewsRoutes);
apiRouter.use('/reports', reportsRoutes);
apiRouter.use('/geo', geoRoutes);
apiRouter.use('/analytics', analyticsRoutes);
