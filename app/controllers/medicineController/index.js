import { Router } from 'express';
import MedicineController from './medicine.controller';

const router = Router();

router.post('/list', MedicineController.getMedicineList);
router.get('/:category_id', MedicineController.getMedicineDetail);
export default router;
