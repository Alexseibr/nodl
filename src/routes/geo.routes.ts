import { Router } from 'express';
import { GeoController } from '../controllers/GeoController';

const router = Router();

router.get('/countries', GeoController.countries);
router.get('/regions', GeoController.regions);
router.get('/cities', GeoController.cities);
router.get('/cities/:id', GeoController.cityById);

export default router;
