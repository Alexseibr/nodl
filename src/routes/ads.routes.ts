import { Router } from 'express';
import { AdsController } from '../controllers/AdsController';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.get('/', AdsController.listAds);
router.post('/', requireAuth, AdsController.createAd);
router.get('/:id', AdsController.getAd);
router.patch('/:id', requireAuth, AdsController.updateAd);
router.delete('/:id', requireAuth, AdsController.deleteAd);
router.post('/:id/view', AdsController.viewAd);
router.post('/:id/favorite', requireAuth, AdsController.favoriteAd);
router.delete('/:id/favorite', requireAuth, AdsController.unfavoriteAd);
router.post('/:id/bump', requireAuth, AdsController.bumpAd);
router.post('/:id/highlight', requireAuth, AdsController.highlightAd);

export default router;
