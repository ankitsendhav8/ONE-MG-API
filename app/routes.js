import { Router } from 'express';
import authRoutes from './controllers/authController';
import contentRoutes from './controllers/staticController';
import categoryRoutes from './controllers/categoryController';
import medicineRoutes from './controllers/medicineController';
import profileRoutes from './controllers/profileController';

const router = Router();

router.use('/auth', authRoutes);
router.use('/staticpage', contentRoutes);
router.use('/category', categoryRoutes);
router.use('/medicine', medicineRoutes);
router.use('/profile', profileRoutes);
module.exports = router;
