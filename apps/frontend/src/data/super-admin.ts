// apps/frontend/src/data/super-admin.ts
import { UserRole, IUser } from '@olp-monitor/shared-types';

/**
 * Super Admin account credentials for development and testing purposes.
 * In a production environment, these would be securely stored in a database.
 */
export const superAdminCredentials = {
  identifier: 'admin@olpmonitor.org',
  password: 'SuperAdmin@2025',
};

/**
 * Super Admin user object that matches the IUser interface.
 * This is used for development and testing purposes.
 */
export const superAdminUser: IUser = {
  _id: 'sa-00001',
  userNumber: 'SA-00001',
  firstName: 'System',
  lastName: 'Administrator',
  email: 'admin@olpmonitor.org',
  role: UserRole.SUPER_ADMIN,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};
