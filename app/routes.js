import { Router } from 'express';
import authRoutes from './controllers/authController';
import contentRoutes from './controllers/staticController';
import categoryRoutes from './controllers/categoryController';
import medicineRoutes from './controllers/medicineController';

const router = Router();

router.use('/auth', authRoutes);
router.use('/staticpage', contentRoutes);
router.use('/category', categoryRoutes);
router.use('/medicine', medicineRoutes);
module.exports = router;
