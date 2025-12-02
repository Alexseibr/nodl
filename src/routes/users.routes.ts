import { Router } from 'express';
import { UsersController } from '../controllers/UsersController';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.get('/me', requireAuth, UsersController.me);
router.patch('/me', requireAuth, UsersController.updateMe);
router.get('/:id', UsersController.getById);

export default router;
