import { Router } from 'express';
import authRoutes from './controllers/authController';
import contentRoutes from './controllers/staticController';

const router = Router();

router.use('/auth', authRoutes);
router.use('/staticpage', contentRoutes);
module.exports = router;
