// apps/backend/src/api/v1/controllers/auth.controller.ts

import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { IRegisterSchoolAdminRequest } from '@olp-monitor/shared-types';

export class AuthController {
  public static async registerSchoolAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const registerData: IRegisterSchoolAdminRequest = req.body;

      // Basic validation
      const { schoolName, schoolCode, adminEmail, adminPassword } = registerData;
      if (!schoolName || !schoolCode || !adminEmail || !adminPassword) {
        res.status(400).json({ success: false, message: 'Missing required fields.' });
        return;
      }
      
      const newUser = await AuthService.registerSchoolAdmin(registerData);

      res.status(201).json({
        success: true,
        message: 'School and administrator registered successfully. Awaiting approval.',
        data: newUser,
      });
    } catch (error) {
      next(error); // Pass error to the global error handler
    }
  }

  // In AuthController class
public static async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
      const { email } = req.body;
      const origin = req.headers.origin || 'http://localhost:3001'; // Get frontend URL
      await AuthService.forgotPassword(email, origin);
      res.status(200).json({ success: true, message: 'An email has been sent with password reset instructions.' });
  } catch (error) {
      next(error);
  }
}

public static async resetPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
      const { token } = req.params;
      const { password } = req.body;
      await AuthService.resetPassword(token, password);
      res.status(200).json({ success: true, message: 'Password reset successfully.' });
  } catch (error) {
      next(error);
  }
}
  // Add this new method inside the AuthController class
public static async registerGenericUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
      const newUser = await AuthService.registerGenericUser(req.body);
      res.status(201).json({
          success: true,
          message: 'Registration successful! Your account is pending approval from the school administration.',
          data: newUser
      });
  } catch (error) {
      next(error);
  }
}

  // In apps/backend/src/api/v1/controllers/auth.controller.ts inside the AuthController class

  public static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const { identifier, password } = req.body; // Changed from 'email'

      if (!identifier || !password) {
        return res.status(400).json({ success: false, message: 'Please provide login identifier and password.' });
      }

      const { token, user } = await AuthService.login(identifier, password);
      
      return res.status(200).json({
        success: true,
        message: 'Logged in successfully.',
        data: { token, user },
      });
    } catch (error: any) {
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ success: false, message: error.message });
      }
      if (error.message === 'This account has been deactivated or is pending approval.') {
        return res.status(403).json({ success: false, message: error.message });
      }
      next(error);
    }
  }
}