import { Router } from 'express';
import { ReviewsController } from '../controllers/ReviewsController';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.get('/', ReviewsController.list);
router.post('/', requireAuth, ReviewsController.create);
router.delete('/:id', requireAuth, ReviewsController.remove);

export default router;
