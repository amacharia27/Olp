import { IUser } from './user.types';

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export interface IRegisterSchoolAdminRequest {
  schoolName: string;
  schoolCode: string;
  schoolAddress: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPassword: string;
  billingContact: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface IApiResponse<T = null> {
    success: boolean;
    message: string;
    data: T;
    error?: string;
  }