// apps/frontend/src/pages/DashboardIndexPage.tsx
import { useAuthStore } from '@/store/auth.store';
import { UserRole } from '@olp-monitor/shared-types';
import { Spin, Alert } from 'antd';
import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
const DashboardIndexPage = () => {
  const { user } = useAuthStore();
  const renderDashboard = () => {
    if (!user) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <Spin size="large" />
          <Alert 
            style={{ marginTop: 20 }}
            message="Loading your dashboard..."
            type="info"
          />
        </div>
      );
    }

    // --- THIS SWITCH STATEMENT IS NOW CORRECTED TO USE DASH FORMAT ---
    switch (user.role) {
      case UserRole.STUDENT:
        return <Navigate to="/student-dashboard" replace />;
      case UserRole.TEACHER:
        return <Navigate to="/teacher-dashboard" replace />;
      case UserRole.PARENT:
        return <Navigate to="/children-overview" replace />;
      case UserRole.HEADTEACHER:
        return <Navigate to="/headteacher-dashboard" replace />;
      case UserRole.DEPUTY_HEADTEACHER:
        return <Navigate to="/deputy-dashboard" replace />;
      case UserRole.FINANCE_ADMIN:
        return <Navigate to="/finance-dashboard" replace />;
      case UserRole.SUB_COUNTY_OFFICIAL:
          return <Navigate to="/sub-county-dashboard" replace />;
      case UserRole.COUNTY_OFFICIAL:
          return <Navigate to="/county-dashboard" replace />;
      case UserRole.NATIONAL_OFFICIAL:
          return <Navigate to="/national-dashboard" replace />;
      case UserRole.SUPER_ADMIN:
          return <Navigate to="/system-dashboard" replace />;
      default:
        // Redirect to a generic "not found" or "role not configured" page
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <Suspense fallback={<Spin size="large" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} />}>
      {renderDashboard()}
    </Suspense>
  );
};

export default DashboardIndexPage;