import { Router } from 'express';
import StaticController from './static.controller';

const router = Router();

router.get('/page', StaticController.content);

export default router;
