// apps/frontend/src/routes/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { UserRole } from '@olp-monitor/shared-types';
import { message } from 'antd';

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // Get the required role from the route path
  const requiredRole = location.pathname.includes('/superadmin') ? UserRole.SUPER_ADMIN :
                       location.pathname.includes('/national') ? UserRole.NATIONAL_OFFICIAL :
                       location.pathname.includes('/county') ? UserRole.COUNTY_OFFICIAL :
                       location.pathname.includes('/subcounty') ? UserRole.SUB_COUNTY_OFFICIAL :
                       null;

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If user exists and has a role, check if they have access to this route
  if (user && requiredRole && user.role !== requiredRole) {
    message.error('You do not have permission to access this page');
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;