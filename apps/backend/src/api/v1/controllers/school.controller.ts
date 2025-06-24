// apps/backend/src/api/v1/controllers/school.controller.ts
import { Request, Response, NextFunction } from 'express';
import { School, IUserDocument } from '@olp-monitor/database-models';

// Extend the Express Request type to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: IUserDocument;
    }
  }
}

interface IPaymentHistoryItem {
  date: Date;
  amount: number;
  method: string;
  transactionId: string;
  status: 'success' | 'pending' | 'failed';
}

interface IRequestWithUser extends Request {
  user?: IUserDocument;
}

export class SchoolController {
  public static async getMySchoolSubscription(req: IRequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
      // The user's schoolId is attached to the request by our auth middleware
      if (!req.user?.schoolId) {
        res.status(400).json({ success: false, message: "User is not associated with a school." });
        return;
      }

      const school = await School.findById(req.user.schoolId).select('name subscriptionStatus subscriptionExpiresAt activeStudentCount');
      if (!school) {
        res.status(404).json({ success: false, message: "School not found." });
        return;
      }
      
      // We can also fetch payment history here if we had the model
      const paymentHistory: IPaymentHistoryItem[] = [ /* mock data for now */ ];

      res.status(200).json({
        success: true,
        data: {
          subscriptionInfo: school,
          paymentHistory,
        }
      });

    } catch (error) {
      next(error);
    }
  }

  public static async initiatePayment(req: IRequestWithUser, res: Response, next: NextFunction): Promise<void> {
    try {
        const { phoneNumber, amount } = req.body;
        if (!phoneNumber || !amount) {
            res.status(400).json({ success: false, message: "Phone number and amount are required." });
            return;
        }

        console.log(`[PAYMENT_SIMULATION] Initiating STK push for KES ${amount} to phone number +254${phoneNumber}`);
        // In a real app, you would call the M-Pesa API here.
        // We will just simulate a successful request.

        // Simulate a delay
        setTimeout(() => {
            console.log(`[PAYMENT_SIMULATION] STK Push successful for +254${phoneNumber}`);
        }, 2000);

        res.status(200).json({
            success: true,
            message: "Payment prompt has been sent to the provided phone number. Please complete the transaction by entering your M-Pesa PIN."
        });

    } catch(error) {
        next(error);
    }
  }
}