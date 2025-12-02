import { Router } from 'express';
import { PaymentsController } from '../controllers/PaymentsController';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.post('/create', requireAuth, PaymentsController.create);
router.get('/:id', requireAuth, PaymentsController.get);

export default router;
