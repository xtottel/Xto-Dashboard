import { Router } from 'express';
import { authController } from '@/controllers/auth';

const router = Router();

// Signup route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);

// OTP route
router.post('/otp', authController.otp);

// Forgot password route
router.post('/forgot-password', authController.forgotPassword);

// Reset password route
router.post('/reset-password', authController.resetPassword);

// Verify email route
router.post('/verify-email', authController.verifyEmail);

// Resend verification email route
router.post('/resend-verification', authController.resendVerification);

// Refresh token route
router.get('/refresh', authController.refresh);

// Verify token route
router.get('/verify', authController.verify);

// Logout route
router.post('/logout', authController.logout);

export { router as authRoutes };