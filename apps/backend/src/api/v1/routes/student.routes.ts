// apps/backend/src/api/v1/routes/student.routes.ts
import { Router } from 'express';
import { protect } from '../middleware/auth.middleware';
import { getStudentDashboard } from '../controllers/student.controller';

const router = Router();

// This route is protected and only accessible to logged-in users.
router.get(
    '/me/dashboard-summary',
    protect,
    getStudentDashboard
);

// Add other student-specific routes here later

export default router;