// apps/backend/src/api/v1/controllers/student.controller.ts
import { Request, Response } from 'express';
import * as StudentService from '../services/student.service';

/**
 * @desc    Get the dashboard summary for the logged-in student
 * @route   GET /api/v1/students/me/dashboard-summary
 * @access  Private (Students only)
 */
export const getStudentDashboard = async (req: Request, res: Response) => {
  try {
    // The 'protect' middleware has already attached the user to the request.
    const studentId = req.user?._id;

    if (!studentId) {
      return res.status(400).json({ success: false, message: 'User not found in request' });
    }

    const summary = await StudentService.getDashboardSummary(studentId.toString());

    res.status(200).json({ success: true, data: summary });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};