// apps/frontend/src/routes/navigation.config.tsx
import {
    DashboardOutlined,
    UserOutlined,
    TeamOutlined,
    ReadOutlined,
    MessageOutlined,
    DollarOutlined,
    BarChartOutlined,
    SolutionOutlined,
    UploadOutlined,
    CalendarOutlined,
    ScheduleOutlined,
    SoundOutlined,
    ToolOutlined,
    FileProtectOutlined,
    AppstoreOutlined,
    DollarCircleOutlined,
    SettingOutlined,
    AreaChartOutlined,
    SwapOutlined,
    BankOutlined,
    StarOutlined,
    DatabaseOutlined,
    HistoryOutlined,
    BookOutlined,
    FileTextOutlined,
    AuditOutlined,
    AlertOutlined,
    SafetyOutlined,
} from '@ant-design/icons';
import { UserRole } from '@olp-monitor/shared-types';

export type IconComponent = typeof DashboardOutlined | typeof UserOutlined | typeof TeamOutlined | typeof ReadOutlined | 
  typeof MessageOutlined | typeof DollarOutlined | typeof BarChartOutlined | typeof SolutionOutlined | 
  typeof UploadOutlined | typeof CalendarOutlined | typeof ScheduleOutlined | typeof SoundOutlined | 
  typeof ToolOutlined | typeof FileProtectOutlined | typeof AppstoreOutlined | typeof DollarCircleOutlined | 
  typeof SettingOutlined | typeof AreaChartOutlined | typeof SwapOutlined | typeof BankOutlined | 
  typeof StarOutlined | typeof DatabaseOutlined | typeof HistoryOutlined | typeof BookOutlined | typeof FileTextOutlined | 
  typeof AuditOutlined | typeof AlertOutlined | typeof SafetyOutlined;

export interface NavItem {
  key: string;
  path: string;
  label: string;
  icon: IconComponent;
  children?: NavItem[];
}

export const navigationConfig: Record<UserRole, NavItem[]> = {
  [UserRole.STUDENT]: [
    { key: 'student-dashboard', path: '/student-dashboard', label: 'Overview', icon: DashboardOutlined },
    { key: 'student-performance', path: '/performance', label: 'My Performance', icon: BarChartOutlined },
    { key: 'student-result-slip', path: '/result-slip', label: 'Result Slip', icon: FileProtectOutlined },
    { key: 'student-assignments', path: '/assignments', label: 'Assignments', icon: SolutionOutlined },
    { key: 'student-library', path: '/library', label: 'Library', icon: ReadOutlined },
    { key: 'student-teacher-rating', path: '/teacher-rating', label: 'Rate Teachers', icon: StarOutlined },
    { key: 'student-calendar', path: '/calendar', label: 'School Calendar', icon: CalendarOutlined },
    { key: 'student-messages', path: '/messages', label: 'Messages', icon: MessageOutlined },
    { key: 'student-messaging', path: '/messaging', label: 'Messaging', icon: MessageOutlined },
  ],
  [UserRole.TEACHER]: [
    { key: 'teacher-dashboard', path: '/teacher-dashboard', label: 'Overview', icon: DashboardOutlined },
    { key: 'teacher-classes', path: '/classes', label: 'My Classes', icon: TeamOutlined },
    { key: 'teacher-grading', path: '/grading', label: 'Grading', icon: SolutionOutlined },
    { key: 'teacher-create-assessment', path: '/create-assessment', label: 'Create Assessment', icon: FileProtectOutlined },
    { key: 'teacher-bulk-assessment', path: '/bulk-assessment-recording', label: 'Bulk Assessment Recording', icon: FileProtectOutlined },
    { key: 'teacher-assessment-history', path: '/assessment-history', label: 'Assessment History', icon: HistoryOutlined },
    { key: 'teacher-attendance', path: '/attendance', label: 'Attendance', icon: UserOutlined },
    { key: 'teacher-calendar', path: '/calendar', label: 'School Calendar', icon: CalendarOutlined },
    { key: 'teacher-messages', path: '/messages', label: 'Messages', icon: MessageOutlined },
    { key: 'teacher-resources', path: '/resources', label: 'Resources', icon: UploadOutlined },
    { key: 'teacher-availability', path: '/set-availability', label: 'Set Availability', icon: ScheduleOutlined },
    { key: 'teacher-transfer', path: '/transfer-application', label: 'Transfer Application', icon: SwapOutlined },
    { key: 'teacher-meetings', path: '/meetings', label: 'Meeting Scheduler', icon: CalendarOutlined },
    { key: 'teacher-discipline', path: '/discipline-report', label: 'Report Discipline Incident', icon: AlertOutlined },
    { key: 'teacher-messaging', path: '/messaging', label: 'Messaging', icon: MessageOutlined },
  ],
  [UserRole.PARENT]: [
    { key: 'parent-dashboard', path: '/children-overview', label: 'Overview', icon: DashboardOutlined },
    { key: 'parent-performance', path: '/child-performance', label: 'Child Performance', icon: BarChartOutlined },
    { key: 'parent-fees', path: '/fee-status', label: 'Fee Status', icon: DollarOutlined },
    { key: 'parent-bursary', path: '/bursary-application', label: 'Bursary Application', icon: DollarCircleOutlined },
    { key: 'parent-teacher-rating', path: '/teacher-rating', label: 'Rate Teachers', icon: StarOutlined },
    { key: 'parent-messages', path: '/messages', label: 'Messages', icon: MessageOutlined },
    { key: 'parent-meetings', path: '/book-meetings', label: 'Book Meetings', icon: ScheduleOutlined },
    { key: 'parent-messaging', path: '/messaging', label: 'Messaging', icon: MessageOutlined },
  ],
  [UserRole.HEADTEACHER]: [
    { key: 'head-dashboard', path: '/headteacher-dashboard', label: 'School Dashboard', icon: BarChartOutlined },
    { key: 'head-staff', path: '/staff-management', label: 'Staff Management', icon: TeamOutlined },
    { key: 'head-student-admin', path: '/student-admin', label: 'Student Management', icon: UserOutlined },
    { key: 'head-academics', path: '/academic-oversight', label: 'Academics', icon: SolutionOutlined },
    { key: 'head-create-assessment', path: '/create-assessment', label: 'Create Assessment', icon: FileProtectOutlined },
    { key: 'head-finances', path: '/financial-oversight', label: 'Financial Oversight', icon: DollarOutlined },
    { key: 'head-transfer-application', path: '/transfer-application', label: 'My Transfer Application', icon: SwapOutlined },
    { key: 'head-transfer-approval', path: '/transfer-approval', label: 'Transfer Approvals', icon: SolutionOutlined },
    { key: 'head-projects', path: '/projects', label: 'Projects', icon: ToolOutlined },
    { key: 'head-comms', path: '/communication-hub', label: 'Communications', icon: SoundOutlined },
    { key: 'head-reports', path: '/reports-analytics', label: 'Reports', icon: BarChartOutlined },
    { key: 'head-subscription', path: '/subscription-management', label: 'Subscription', icon: DollarOutlined },
    { key: 'head-messaging', path: '/messaging', label: 'Messaging', icon: MessageOutlined },
  ],
  [UserRole.FINANCE_ADMIN]: [
    { key: 'finance-dashboard', path: '/finance-dashboard', label: 'Dashboard', icon: BarChartOutlined },
    { key: 'finance-expenses', path: '/expense-management', label: 'Expenses', icon: DollarOutlined },
    { key: 'finance-fees', path: '/fee-management', label: 'Fees', icon: DollarOutlined },
    { key: 'finance-bursary', path: '/bursary-management', label: 'Bursary', icon: UserOutlined },
    { key: 'finance-reports', path: '/financial-reports', label: 'Reports', icon: BarChartOutlined },
    { key: 'finance-collection', path: '/fee-collection', label: 'Fee Collection', icon: DollarOutlined },
    { key: 'finance-subscription', path: '/subscription-management', label: 'Subscription', icon: DollarOutlined },
    { key: 'finance-invoicing', path: '/invoicing', label: 'Invoicing', icon: FileProtectOutlined },
    { key: 'finance-budgeting', path: '/budgeting', label: 'Budgeting', icon: BarChartOutlined },
    { key: 'finance-messaging', path: '/messaging', label: 'Messaging', icon: MessageOutlined },
  ],
  [UserRole.DEPUTY_HEADTEACHER]: [
    { key: 'deputy-dashboard', path: '/deputy-dashboard', label: 'Overview', icon: BarChartOutlined },
    { key: 'deputy-attendance', path: '/deputy-attendance', label: 'Attendance', icon: UserOutlined },
    { key: 'deputy-class-management', path: '/deputy-class-management', label: 'My Classes', icon: TeamOutlined },
    { key: 'deputy-create-assessment', path: '/create-assessment', label: 'Create Assessment', icon: FileProtectOutlined },
    { key: 'deputy-resource-management', path: '/deputy-resource-management', label: 'Resources', icon: UploadOutlined },
    { key: 'deputy-availability', path: '/deputy-availability', label: 'Set Availability', icon: ScheduleOutlined },
    { key: 'deputy-co-curricular', path: '/deputy-co-curricular', label: 'Co-Curricular', icon: SoundOutlined },
    { key: 'deputy-discipline-management', path: '/deputy-discipline-management', label: 'Discipline Management', icon: SafetyOutlined },
    { key: 'deputy-teacher-substitution', path: '/deputy-teacher-substitution', label: 'Teacher Substitution', icon: ToolOutlined },
    { key: 'deputy-transfer', path: '/transfer-application', label: 'Transfer Application', icon: SwapOutlined },
    { key: 'deputy-messaging', path: '/messaging', label: 'Messaging', icon: MessageOutlined },
  ],
  [UserRole.SUPER_ADMIN]: [
    { key: 'super-dashboard', path: '/system-dashboard', label: 'System Dashboard', icon: AppstoreOutlined },
    { key: 'super-tenants', path: '/tenant-management', label: 'School Management', icon: BankOutlined },
    { key: 'super-billing', path: '/subscription-billing', label: 'Subscriptions', icon: DollarCircleOutlined },
    { key: 'super-settings', path: '/system-settings', label: 'System Settings', icon: SettingOutlined },
    { key: 'super-audit-logs', path: '/audit-logs', label: 'Audit Logs', icon: BarChartOutlined },
    { key: 'super-admin-user-management', path: '/admin-user-management', label: 'Admin User Management', icon: UserOutlined },
    { key: 'super-database-management', path: '/database-management', label: 'Database Management', icon: DatabaseOutlined },
    { key: 'super-messaging', path: '/messaging', label: 'Messaging', icon: MessageOutlined },
  ],
  [UserRole.SUB_COUNTY_OFFICIAL]: [
    { key: 'sc-dashboard', path: '/sub-county-dashboard', label: 'Subcounty Dashboard', icon: AreaChartOutlined },
    { key: 'sc-management', path: '/sub-county-management', label: 'Management Tasks', icon: SwapOutlined },
    { key: 'sc-classification', path: '/school-classification', label: 'School Classification', icon: BankOutlined },
    { key: 'sc-transfer-approval', path: '/sub-county-transfer-approval', label: 'Transfer Approvals', icon: SolutionOutlined },
  ],
  [UserRole.COUNTY_OFFICIAL]: [
    { key: 'county-dashboard', path: '/county-dashboard', label: 'County Dashboard', icon: AreaChartOutlined },
    { key: 'county-management', path: '/county-management', label: 'Management Tasks', icon: SwapOutlined },
    { key: 'county-financial', path: '/county-financials', label: 'Financial Oversight', icon: DollarCircleOutlined },
    { key: 'county-infrastructure', path: '/county-infrastructure', label: 'Infrastructure', icon: ToolOutlined },
    { key: 'county-transfer-approval', path: '/county-transfer-approval', label: 'Transfer Approvals', icon: SolutionOutlined },
  ],
  [UserRole.NATIONAL_OFFICIAL]: [
    { key: 'national-dashboard', path: '/national-dashboard', label: 'Dashboard', icon: AreaChartOutlined },
    { key: 'national-analytics', path: '/national-analytics', label: 'Analytics', icon: BarChartOutlined },
    { key: 'comparative-analysis', path: '/comparative-analysis', label: 'Comparative Analysis', icon: SwapOutlined },
    { key: 'policy-implementation', path: '/policy-implementation', label: 'Policy', icon: FileProtectOutlined },
    { key: 'national-infrastructure', path: '/national-infrastructure', label: 'Infrastructure', icon: ToolOutlined },
    { key: 'national-resource', path: '/resource-allocation', label: 'Resource', icon: DollarCircleOutlined },
  ],
};
  
export default navigationConfig;