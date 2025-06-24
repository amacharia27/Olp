// packages/shared-types/src/user.types.ts

export enum UserRole {
    STUDENT = 'Student',
    PARENT = 'Parent',
    TEACHER = 'Teacher',
    FINANCE_ADMIN = 'FinanceAdmin',
    DEPUTY_HEADTEACHER = 'DeputyHeadteacher',
    HEADTEACHER = 'Headteacher',
    SUB_COUNTY_OFFICIAL = 'SubCountyOfficial',
    COUNTY_OFFICIAL = 'CountyOfficial',
    NATIONAL_OFFICIAL = 'NationalOfficial',
    SUPER_ADMIN = 'SuperAdmin',
  }
  
  export interface IUser {
    _id: string;
    userNumber: string; // e.g., ST-0000001
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    schoolId?: string; // Optional for SuperAdmins or National officials
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Example of a more specific user type for JWT payload or frontend state
  export interface IAuthenticatedUser extends IUser {
    // Add any other properties you might need from the JWT
    schoolSubscriptionActive: boolean;
  }