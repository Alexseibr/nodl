import { Router } from 'express';
import { StoresController } from '../controllers/StoresController';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.get('/', StoresController.list);
router.post('/', requireAuth, StoresController.create);
router.get('/:id', StoresController.get);
router.patch('/:id', requireAuth, StoresController.update);
router.delete('/:id', requireAuth, StoresController.remove);

export default router;
