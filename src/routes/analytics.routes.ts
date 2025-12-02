import { Router } from 'express';
import { AnalyticsController } from '../controllers/AnalyticsController';

const router = Router();

router.get('/ads/:id/heatmap', AnalyticsController.adHeatmap);
router.get('/stores/:id/heatmap', AnalyticsController.storeHeatmap);

export default router;
