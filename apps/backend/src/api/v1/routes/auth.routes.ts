// apps/backend/src/api/v1/routes/auth.routes.ts

import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/auth.controller';
import { Request, Response, NextFunction } from 'express';
import { School } from '/home/arthacka/Desktop/Projects/olp-monitor/packages/database-models/src/School.model';
import { User } from '/home/arthacka/Desktop/Projects/olp-monitor/packages/database-models/src/User.model';

const router = Router();

// ... existing routes
router.post('/forgot-password', AuthController.forgotPassword);
router.put('/reset-password/:token', AuthController.resetPassword);

// --- Google OAuth Routes ---

// This route starts the Google authentication process
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// This is the callback route that Google will redirect to after authentication
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL, // Redirect to your frontend app on success
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google-auth-failed`, // Redirect on failure
  })
);

/**
 * @route   POST /api/v1/auth/register-school
 * @desc    Register a new school and its first admin (Headteacher)
 * @access  Public
 */
router.post('/register-school', AuthController.registerSchoolAdmin);

/**
 * @route   POST /api/v1/auth/login
 * @desc    Login a user and return a JWT
 * @access  Public
 */
router.post('/login', AuthController.login);

/**
 * @route   POST /api/v1/auth/register
 * @desc    Register a new generic user (Student, Parent, Teacher)
 * @access  Public
 */
router.post('/register', AuthController.registerGenericUser);

/**
 * @route   POST /api/v1/auth/activate-user
 * @desc    TEMPORARY: Activate a user by email
 * @access  Public
 */
router.post('/activate-user', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { isActive: true } },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ 
      message: 'User activated successfully',
      user: {
        id: user._id,
        email: user.email,
        isActive: user.isActive
      }
    });
  } catch (error) {
    console.error('Error activating user:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ message: 'Error activating user', error: errorMessage });
  }
});

/**
 * @route   GET /api/v1/auth/schools
 * @desc    Get a list of all registered schools (for registration dropdown)
 * @access  Public
 */
router.get('/schools', async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const schools = await School.find({ subscriptionStatus: 'Active' }).select('name _id').sort({ name: 1 });
        res.status(200).json({
            success: true,
            message: 'Schools fetched successfully',
            data: schools
        });
    } catch (error) {
        next(error);
    }
});

export default router;