import { Router } from 'express';
import AuthController from './auth.controller';

const router = Router();

router.post('/register', AuthController.register);
router.post('/verify-otp', AuthController.verifyOtp);
router.post('/resend-otp', AuthController.resendOtp);
router.post('/login', AuthController.login);
// router.post('/login', AuthController.login);
// router.get('/getUser/:id', AuthController.getUser);
// router.post('/forgotpassword', AuthController.forgotpassword);
// router.put('/updatepassword', AuthController.updatepassword);

// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

export default router;
