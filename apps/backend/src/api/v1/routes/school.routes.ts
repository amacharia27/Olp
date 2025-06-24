// apps/backend/src/api/v1/routes/school.routes.ts
import { Router, Request, Response, NextFunction } from 'express';
import { SchoolController } from '../controllers/school.controller';
import { protect } from '../middleware/auth.middleware';
import { UserRole } from '@olp-monitor/shared-types';

const router = Router();

// Middleware to ensure only a Headteacher can access these routes
const isHeadteacher = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role === UserRole.HEADTEACHER) {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Forbidden: Access denied.' });
    }
};

router.get('/my-school/subscription', protect, isHeadteacher, SchoolController.getMySchoolSubscription);
router.post('/my-school/initiate-payment', protect, isHeadteacher, SchoolController.initiatePayment);

export default router;