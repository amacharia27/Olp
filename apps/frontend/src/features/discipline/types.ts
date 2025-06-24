import { UserRole } from '@olp-monitor/shared-types';

export enum IncidentSeverity {
  MINOR = 'minor',
  MODERATE = 'moderate',
  MAJOR = 'major',
  SEVERE = 'severe'
}

export enum IncidentStatus {
  REPORTED = 'reported',
  UNDER_INVESTIGATION = 'under_investigation',
  ACTION_TAKEN = 'action_taken',
  RESOLVED = 'resolved',
  DISMISSED = 'dismissed'
}

export enum ActionType {
  WARNING = 'warning',
  DETENTION = 'detention',
  PARENT_MEETING = 'parent_meeting',
  SUSPENSION = 'suspension',
  EXPULSION = 'expulsion',
  COUNSELING = 'counseling',
  OTHER = 'other'
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  class: string;
  admissionNumber: string;
  profileImage?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: UserRole;
  profileImage?: string;
}

export interface DisciplineIncident {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  location: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  studentId: string;
  student?: Student;
  reportedById: string;
  reportedBy?: Staff;
  witnesses: string[];
  attachments?: string[]; // URLs to uploaded files
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface DisciplineAction {
  id: string;
  incidentId: string;
  actionType: ActionType;
  description: string;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string for actions with duration
  assignedById: string;
  assignedBy?: Staff;
  notes?: string;
  parentNotified: boolean;
  parentNotificationDate?: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface DisciplineReportFormData {
  title: string;
  description: string;
  date: string; // ISO date string
  location: string;
  severity: IncidentSeverity;
  studentId: string;
  witnesses: string[];
  attachments?: File[];
}

export interface DisciplineActionFormData {
  actionType: ActionType;
  description: string;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string
  notes?: string;
  parentNotified: boolean;
  dateRange?: any; // Temporary property used in form processing
}
