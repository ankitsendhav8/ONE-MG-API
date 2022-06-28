import { Router } from 'express';
import CategoryController from './category.controller';

const router = Router();

router.post('/list', CategoryController.getCategory);

export default router;
