import { Router } from 'express';
import { TendersController } from '../controllers/TendersController';
import { TenderResponsesController } from '../controllers/TenderResponsesController';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.get('/', TendersController.list);
router.post('/', requireAuth, TendersController.create);
router.get('/:id', TendersController.get);
router.patch('/:id', requireAuth, TendersController.update);
router.post('/:id/close', requireAuth, TendersController.close);
router.get('/:id/responses', requireAuth, TendersController.listResponses);
router.post('/:id/responses', requireAuth, TendersController.createResponse);

export default router;
