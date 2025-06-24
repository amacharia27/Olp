// apps/backend/src/api/v1/services/student.service.ts

// This interface defines the shape of the data we expect for the student dashboard.
// It matches the interface on the frontend.
export interface DashboardSummary {
    upcomingAssignments: { title: string; subject: string; dueDate: string; }[];
    recentScores: { assessment: string; subject: string; score: string; }[];
    schoolAnnouncements: { title: string; content: string; date: string; }[];
    performanceSummary: { overallGrade: string; attendance: string; };
}

/**
 * Fetches a summary of the student's dashboard data.
 * In a real application, this would fetch data from a database.
 * Here, we are returning mock data for demonstration purposes.
 * @param studentId - The ID of the student to fetch data for.
 */
export const getDashboardSummary = async (studentId: string): Promise<DashboardSummary> => {
    console.log(`Fetching dashboard summary for student ID: ${studentId}`);

    // Mock data that matches the DashboardSummary interface
    const mockSummary: DashboardSummary = {
        upcomingAssignments: [
            { title: 'Complete Chapter 5 Reading', subject: 'History', dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() },
            { title: 'Algebra II Problem Set', subject: 'Mathematics', dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() },
            { title: 'Lab Report: Photosynthesis', subject: 'Biology', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() },
        ],
        recentScores: [
            { assessment: 'Mid-Term Exam', subject: 'History', score: '88%' },
            { assessment: 'Quiz 3', subject: 'Mathematics', score: '92%' },
            { assessment: 'Pop Quiz', subject: 'Biology', score: '95%' },
        ],
        schoolAnnouncements: [
            { title: 'Parent-Teacher Conferences Next Week', content: 'Sign-ups are now available on the school portal.', date: new Date().toISOString() },
            { title: 'Upcoming School Holiday', content: 'School will be closed next Monday for a national holiday.', date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
        ],
        performanceSummary: {
            overallGrade: 'A-',
            attendance: '98%',
        },
    };

    // Simulate a network delay
    await new Promise(res => setTimeout(res, 500));

    return mockSummary;
};