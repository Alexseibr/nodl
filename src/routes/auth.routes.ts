import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.post('/telegram/init', AuthController.telegramInit);
router.post('/telegram/callback', AuthController.telegramCallback);
router.post('/phone/request-code', AuthController.requestPhoneCode);
router.post('/phone/verify', AuthController.verifyPhone);
router.get('/me', requireAuth, AuthController.me);
router.post('/logout', requireAuth, AuthController.logout);

export default router;
