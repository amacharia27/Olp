// apps/frontend/src/features/scheduling/types.ts
export interface TimeSlot {
  id: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  isAvailable: boolean;
  teacherId?: string;
}

export interface Meeting {
  id: string;
  title: string;
  description: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  teacherId: string;
  parentId: string;
  studentId: string;
  location: string; // Physical location or "Virtual"
  meetingLink?: string; // URL for virtual meetings
  status: 'scheduled' | 'cancelled' | 'completed';
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  avatarUrl?: string;
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  children: Student[];
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  class: string;
}

export interface AvailabilitySlot {
  id: string;
  teacherId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM in 24-hour format
  endTime: string; // HH:MM in 24-hour format
  isBooked: boolean;
  meetingId?: string;
}

export interface BookingFormData {
  teacherId: string;
  studentId: string;
  slotId: string;
  title: string;
  description: string;
  meetingType: 'in-person' | 'virtual';
}
