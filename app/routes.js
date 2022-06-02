import { Router } from 'express';

import authRoutes from './controllers/authController';

const router = Router();

router.use('/auth', authRoutes);
module.exports = router;
