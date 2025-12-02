import { Router } from 'express';
import { TenderResponsesController } from '../controllers/TenderResponsesController';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.patch('/:id', requireAuth, TenderResponsesController.update);

export default router;
