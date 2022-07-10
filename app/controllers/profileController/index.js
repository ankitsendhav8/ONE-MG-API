import { Router } from 'express';
import ProfileController from './profile.controller';

const router = Router();

router.get('/:id', ProfileController.getDetails);
router.put('/:id', ProfileController.updateDetails);

export default router;
