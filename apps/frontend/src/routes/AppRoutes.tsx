import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spin } from 'antd';
import ProtectedRoute from './ProtectedRoute';
import AuthLayout from '@/layouts/AuthLayout';
import AppLayout from '@/layouts/AppLayout';
import ParentLayoutWrapper from '@/layouts/ParentLayoutWrapper';
// Import individual deputy components instead of using the index import
import DeputyDashboardPage from '@/features/admin/deputy/pages/DeputyDashboardPage';
import DeputyResourceManagementPage from '@/features/admin/deputy/pages/DeputyResourceManagementPage';
import TeacherSubstitutionPage from '@/features/admin/deputy/pages/TeacherSubstitutionPage';
import DeputyGradingAndAssessmentPage from '@/features/admin/deputy/pages/DeputyGradingAndAssessmentPage';
import CoCurricularPage from '@/features/admin/deputy/pages/CoCurricularPage';
import DeputyAttendancePage from '@/features/admin/deputy/pages/DeputyAttendancePage';
// Shared admin pages
import CreateAssessmentPage from '@/features/admin/shared/pages/CreateAssessmentPage';
import TransferApplicationPage from '@/features/admin/shared/pages/TransferApplicationPage';
import HeadteacherTransferApprovalPage from '@/features/admin/headteacher/pages/TransferApprovalPage';
// Teacher feature pages
import BulkAssessmentRecordingPage from '../features/admin/teacher/pages/BulkAssessmentRecordingPage';
import AssessmentHistoryPage from '../features/admin/teacher/pages/AssessmentHistoryPage';
// Finance imports
import BudgetingPage from '@/features/admin/finance/pages/BudgetingPage';
import BursaryManagementPage from '@/features/admin/finance/pages/BursaryManagementPage';
import ExpenseManagementPage from '@/features/admin/finance/pages/ExpenseManagementPage';
import FeeCollectionPage from '@/features/admin/finance/pages/FeeCollectionPage';
import FeeManagementPage from '@/features/admin/finance/pages/FeeManagementPage';
import InvoicingPage from '@/features/admin/finance/pages/InvoicingPage';
import VendorManagementPage from '@/features/admin/finance/pages/VendorManagementPage';
import FinancialReportsPage from '@/features/admin/finance/pages/FinancialReportsPage';
// County imports
import CountyManagement from '@/features/official/county/pages/CountyManagement';
import CountyTransferApprovalPage from '@/features/official/county/pages/CountyTransferApprovalPage';

// Subcounty imports
import SubcountyTransferApprovalPage from '@/features/official/subcounty/pages/SubcountyTransferApprovalPage';
// National imports
import PolicyImplementationPage from '@/features/official/national/pages/PolicyImplementationPage';
import NationalAnalyticsPage from '@/features/official/national/pages/NationalAnalyticsPage';
import ComparativeAnalysisPage from '@/features/official/national/pages/ComparativeAnalysisPage';

// --- MAIN / GENERIC PAGES ---
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegisterUserPage = lazy(() => import('@/pages/RegisterUserPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
const DashboardIndexPage = lazy(() => import('@/pages/DashboardIndexPage'));
const NotificationsPage = lazy(() => import('@/pages/NotificationsPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const SchoolCalendarPage = lazy(() => import('@/pages/SchoolCalendarPage'));

// --- STUDENT PAGES ---
const StudentOverviewPage = lazy(() => import('@/features/student/pages/StudentOverviewPage'));
const PerformancePage = lazy(() => import('@/features/student/pages/PerformancePage'));
const ResultSlipPage = lazy(() => import('@/features/student/pages/ResultSlipPage'));
const AssignmentsPage = lazy(() => import('@/features/student/pages/AssignmentsPage'));
const LibraryPage = lazy(() => import('@/features/student/pages/LibraryPage'));
const MessagesPage = lazy(() => import('@/features/student/pages/MessagesPage'));
const TeacherRatingPage = lazy(() => import('@/features/student/pages/TeacherRatingPage'));

// --- PARENT PAGES ---
const ChildrenOverviewPage = lazy(() => import('@/features/parent/pages/ChildrenOverviewPage'));
const ChildPerformancePage = lazy(() => import('@/features/parent/pages/ChildPerformancePage'));
const BursaryApplicationPage = lazy(() => import('@/features/parent/pages/BursaryApplicationPage'));
const FeeStatusPage = lazy(() => import('@/features/parent/pages/FeeStatusPage'));
const BookMeetingPage = lazy(() => import('@/features/parent/pages/BookMeetingPage'));
const ParentTeacherRatingPage = lazy(() => import('@/features/parent/pages/ParentTeacherRatingPage'));

// --- TEACHER PAGES ---
const TeacherDashboardPage = lazy(() => import('@/features/teacher/pages/TeacherDashboardPage'));
const GradingAndAssessmentPage = lazy(() => import('@/features/teacher/pages/GradingAndAssessmentPage'));
const AttendancePage = lazy(() => import('@/features/teacher/pages/AttendancePage'));
const SetAvailabilityPage = lazy(() => import('@/features/teacher/pages/SetAvailabilityPage'));
const ResourceManagementPage = lazy(() => import('@/features/teacher/pages/ResourceManagementPage'));
const LessonPlannerPage = lazy(() => import('@/features/teacher/pages/LessonPlannerPage'));
const ClassManagementPage = lazy(() => import('@/features/teacher/pages/ClassManagementPage'));

// --- ADMIN / HEADTEACHER PAGES ---
const SchoolDashboardPage = lazy(() => import('@/features/admin/headteacher/pages/SchoolDashboardPage'));
const StaffManagementPage = lazy(() => import('@/features/admin/headteacher/pages/StaffManagementPage'));
const AcademicOversightPage = lazy(() => import('@/features/admin/headteacher/pages/AcademicOversightPage'));
const CommunicationHubPage = lazy(() => import('@/features/admin/headteacher/pages/CommunicationHubPage'));
const StudentAdministrationPage = lazy(() => import('@/features/admin/headteacher/pages/StudentAdministrationPage'));
const InfrastructureProjectsPage = lazy(() => import('@/features/admin/headteacher/pages/InfrastructureProjectsPage'));
const FinancialOversightPage = lazy(() => import('@/features/admin/headteacher/pages/FinancialOversightPage'));
const ReportsAndAnalyticsPage = lazy(() => import('@/features/admin/headteacher/pages/ReportsAndAnalyticsPage'));
const SubscriptionManagementPage = lazy(() => import('@/features/admin/headteacher/pages/SubscriptionManagementPage'));

// --- ADMIN / DEPUTY HEADTEACHER PAGES ---

// --- ADMIN / FINANCE PAGES ---
const FinanceDashboardPage = lazy(() => import('@/features/admin/finance/pages/FinanceDashboardPage'));

// --- OFFICIAL / SUB-COUNTY PAGES ---
const SubCountyDashboardPage = lazy(() => import('@/features/official/subcounty/pages/SubCountyDashboardPage'));
const SubCountyManagementPage = lazy(() => import('@/features/official/subcounty/pages/SubCountyManagement'));
const SchoolClassificationPage = lazy(() => import('@/features/official/subcounty/pages/SchoolClassificationPage'));

// --- OFFICIAL / COUNTY PAGES ---
const CountyDashboardPage = lazy(() => import('@/features/official/county/pages/CountyDashboardPage'));
const CountyFinancialOversightPage = lazy(() => import('@/features/official/county/pages/CountyFinancialOversightPage'));
const CountyInfrastructurePage = lazy(() => import('@/features/official/county/pages/CountyInfrastructurePage'));

// --- OFFICIAL / NATIONAL PAGES ---
const NationalDashboardPage = lazy(() => import('@/features/official/national/pages/NationalDashboardPage'));
const NationalResourceAllocationPage = lazy(() => import('@/features/official/national/pages/NationalResourceAllocationPage'));
const NationalInfrastructurePage = lazy(() => import('@/features/official/national/pages/NationalInfrastructurePage'));

// --- SUPER ADMIN PAGES ---
const SystemDashboardPage = lazy(() => import('@/pages/superadmin/SystemDashboardPage'));
const TenantManagementPage = lazy(() => import('@/features/superadmin/pages/TenantManagementPage'));
const DatabaseManagementPage = lazy(() => import('@/features/superadmin/pages/DatabaseManagementPage'));
const AdminUserManagementPage = lazy(() => import('@/features/superadmin/pages/AdminUserManagementPage'));
const SubscriptionBillingPage = lazy(() => import('@/features/superadmin/pages/SubscriptionBillingPage'));
const SystemSettingsPage = lazy(() => import('@/features/superadmin/pages/SystemSettingsPage'));
const AuditLogsPage = lazy(() => import('@/features/superadmin/pages/AuditLogsPage'));

// --- MESSAGING PAGE ---
const MessagingPage = lazy(() => import('@/features/messaging/pages/MessagingPage'));

// Meeting Scheduler Pages
const TeacherAvailabilityPage = lazy(() => import('@/features/scheduling/pages/TeacherAvailabilityPage'));
const ParentMeetingBookingPage = lazy(() => import('@/features/scheduling/pages/ParentMeetingBookingPage'));

// Discipline Management Pages
const DisciplineReportPage = lazy(() => import('@/features/discipline/pages/DisciplineReportPage'));
const DisciplineManagementPage = lazy(() => import('@/features/discipline/pages/DisciplineManagementPage'));


const AppRoutes = () => {
  return (
    <Suspense fallback={<Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />}>
      <Routes>
        {/* --- Public Routes --- */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterUserPage />} />
        </Route>

        {/* --- Protected Routes --- */}
        <Route element={<ProtectedRoute />}>
          {/* Default route - redirect to appropriate dashboard */}
          <Route path="/" element={<DashboardIndexPage />} />
          <Route element={<AppLayout />}>
            
            {/* == EXPLICIT DASHBOARD ROUTES == */}
            
            
            {/* == SUB-PAGES == */}

            {/* Student routes */}
            <Route path="/student-dashboard" element={<StudentOverviewPage />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/result-slip" element={<ResultSlipPage />} />
            <Route path="/assignments" element={<AssignmentsPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/teacher-rating" element={<TeacherRatingPage />} />
            <Route path="/messages" element={<MessagesPage />} /> 
            <Route path="/messaging" element={<MessagingPage />} />
            
            {/* Parent routes */}
            <Route element={<ParentLayoutWrapper />}>
              <Route path="/children-overview" element={<ChildrenOverviewPage />} />
              <Route path="/child-performance" element={<ChildPerformancePage />} />
              <Route path="/fee-status" element={<FeeStatusPage />} />
              <Route path="/teacher-rating" element={<ParentTeacherRatingPage />} />
              <Route path="/book-meeting" element={<BookMeetingPage />} />
              <Route path="/bursary-application" element={<BursaryApplicationPage />} />
              <Route path="/messaging" element={<MessagingPage />} />
              <Route path="/meetings" element={<ParentMeetingBookingPage />} />
            </Route>

            {/* Teacher routes */}
            <Route path="/teacher-dashboard" element={<TeacherDashboardPage />} />
            <Route path="/bulk-assessment-recording" element={<BulkAssessmentRecordingPage />} />
            <Route path="/assessment-history" element={<AssessmentHistoryPage />} />
            <Route path="/grading" element={<GradingAndAssessmentPage />} />
            <Route path="/create-assessment" element={<CreateAssessmentPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/set-availability" element={<SetAvailabilityPage />} />
            <Route path="/resources" element={<ResourceManagementPage />} />
            <Route path="/classes" element={<ClassManagementPage />} />
            <Route path="/planner" element={<LessonPlannerPage />} />
            <Route path="/meetings" element={<TeacherAvailabilityPage />} />
            <Route path="/discipline-report" element={<DisciplineReportPage />} />
            <Route path="/messaging" element={<MessagingPage />} />

            {/* Deputy routes */}
            <Route path="/deputy-dashboard" element={<DeputyDashboardPage/>} />
            <Route path="/deputy-discipline-management" element={<DisciplineManagementPage />} />
            <Route path="/deputy-attendance" element={<DeputyAttendancePage/>} />
            <Route path="/deputy-class-management" element={<ClassManagementPage/>} />
            <Route path="/deputy-availability" element={<SetAvailabilityPage/>} />
            <Route path="/deputy-resource-management" element={<DeputyResourceManagementPage/>} /> 
            <Route path="/create-assessment" element={<CreateAssessmentPage />} />
            <Route path="/planner" element={<LessonPlannerPage />} />
            <Route path="/grading" element={<DeputyGradingAndAssessmentPage/>} /> 
            <Route path="/deputy-co-curricular" element={<CoCurricularPage/>} /> 
            <Route path="/deputy-teacher-substitution" element={<TeacherSubstitutionPage/>} /> 
            <Route path="/messaging" element={<MessagingPage />} />

            {/* finance routes */}
            <Route path="/budgeting" element={<BudgetingPage/>} />
            <Route path="/finance-dashboard" element={<FinanceDashboardPage/>} />  
            <Route path="/bursary-management" element={<BursaryManagementPage/>} />   
            <Route path="/expense-management" element={<ExpenseManagementPage/>} />     
            <Route path="/fee-collection" element={<FeeCollectionPage/>} />       
            <Route path="/fee-management" element={<FeeManagementPage/>} />           
            <Route path="/financial-reports" element={<FinancialReportsPage/>} />         
            <Route path="/invoicing" element={<InvoicingPage/>} /> 
            <Route path="/vendor-management" element={<VendorManagementPage/>} />         
            <Route path="/messaging" element={<MessagingPage />} />

            {/* Headteacher routes */}
            <Route path="/headteacher-dashboard" element={<SchoolDashboardPage />} />
            <Route path="/staff-management" element={<StaffManagementPage />} />
            <Route path="/academic-oversight" element={<AcademicOversightPage />} />
            <Route path="/create-assessment" element={<CreateAssessmentPage />} />
            <Route path="/bulk-assessment-recording" element={<BulkAssessmentRecordingPage />} />
            <Route path="/communication-hub" element={<CommunicationHubPage />} />
            <Route path="/student-admin" element={<StudentAdministrationPage />} />
            <Route path="/projects" element={<InfrastructureProjectsPage />} />
            <Route path="/financial-oversight" element={<FinancialOversightPage />} />
            <Route path="/reports-analytics" element={<ReportsAndAnalyticsPage />} />
            <Route path="/subscription-management" element={<SubscriptionManagementPage />} />
            <Route path="/transfer-application" element={<TransferApplicationPage />} />
            <Route path="/transfer-approval" element={<HeadteacherTransferApprovalPage />} />
            <Route path="/messaging" element={<MessagingPage />} />

            {/* == Subcounty routes == */}
            <Route path="/sub-county-dashboard" element={<SubCountyDashboardPage />} />
            <Route path="/sub-county-management" element={<SubCountyManagementPage />} />
            <Route path="/school-classification" element={<SchoolClassificationPage />} />
            <Route path="/sub-county-transfer-approval" element={<SubcountyTransferApprovalPage />} />
            <Route path="/messaging" element={<MessagingPage />} />
            {/* == County routes == */}
            <Route path="/county-dashboard" element={<CountyDashboardPage />} />
            <Route path="/county-management" element={<CountyManagement />} />
            <Route path="/county-financials" element={<CountyFinancialOversightPage />} />
            <Route path="/county-infrastructure" element={<CountyInfrastructurePage />} />
            <Route path="/county-transfer-approval" element={<CountyTransferApprovalPage />} />
            <Route path="/messaging" element={<MessagingPage />} />
            {/* == National routes == */}
            <Route path="/national-dashboard" element={<NationalDashboardPage />} />
            <Route path="/national-infrastructure" element={<NationalInfrastructurePage />} />
            <Route path="/resource-allocation" element={<NationalResourceAllocationPage />} />
            <Route path="/policy-implementation" element={<PolicyImplementationPage />} />
            <Route path="/national-analytics" element={<NationalAnalyticsPage />} />  
            <Route path="/comparative-analysis" element={<ComparativeAnalysisPage />} />
            <Route path="/messaging" element={<MessagingPage />} />

            {/* Super Admin routes */}
            <Route path="/system-dashboard" element={<SystemDashboardPage />} />
            <Route path="/tenant-management" element={<TenantManagementPage />} />
            <Route path="/database-management" element={<DatabaseManagementPage />} />
            <Route path="/admin-user-management" element={<AdminUserManagementPage />} />
            <Route path="/subscription-billing" element={<SubscriptionBillingPage />} />
            <Route path="/system-settings" element={<SystemSettingsPage />} />
            <Route path="/audit-logs" element={<AuditLogsPage />} />
            <Route path="/messaging" element={<MessagingPage />} />
            
            {/* Generic/Shared  routes */}
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/calendar" element={<SchoolCalendarPage />} />
            <Route path="/transfer-application" element={<TransferApplicationPage />} />
            <Route path="/messaging" element={<MessagingPage />} />

          </Route>
        </Route>

        {/* --- Not Found Route --- */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;