import { Router } from 'express';
import { SubscriptionsController } from '../controllers/SubscriptionsController';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.get('/plans', SubscriptionsController.plans);
router.post('/', requireAuth, SubscriptionsController.subscribe);
router.get('/me', requireAuth, SubscriptionsController.mine);
router.post('/:id/cancel', requireAuth, SubscriptionsController.cancel);

export default router;
