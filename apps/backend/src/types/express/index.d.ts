// apps/backend/src/types/express/index.d.ts
import { IUserDocument } from '@olp-monitor/database-models';

// This file augments the global Express namespace.
// It tells TypeScript that the 'user' property on the Request object
// will be our specific IUserDocument type from the database models.
// This creates a single source of truth for the user object's type.
declare global {
  namespace Express {
    // We are extending the existing User interface from Express, not replacing it.
    // This merges our IUserDocument properties into the default User type.
    export interface User extends IUserDocument {}

    // We are also extending the Request interface to ensure it recognizes
    // the augmented User type.
    export interface Request {
      user?: User;
    }
  }
}

// The file must be a module. This empty export statement makes it one.
export {};
