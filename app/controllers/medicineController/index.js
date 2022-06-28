import { Router } from 'express';
import MedicineController from './medicine.controller';

const router = Router();

router.post('/list', MedicineController.getMedicine);

export default router;
