import { Router } from 'express';
import { ReportsController } from '../controllers/ReportsController';
import { requireAuth } from '../middlewares/requireAuth';
import { requireRole } from '../middlewares/requireRole';

const router = Router();

router.post('/', requireAuth, ReportsController.create);
router.get('/', requireAuth, requireRole(['admin']), ReportsController.list);
router.patch('/:id', requireAuth, requireRole(['admin', 'moderator']), ReportsController.update);

export default router;
