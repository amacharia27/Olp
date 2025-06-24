// apps/frontend/src/features/scheduling/mockData.ts
import { Teacher, Parent, Student, AvailabilitySlot, Meeting } from './types';
import dayjs from 'dayjs';

// Helper function to generate dates for the current week
const generateWeekDates = () => {
  const today = dayjs();
  const weekDates = [];
  
  // Generate dates for the next 14 days
  for (let i = 0; i < 14; i++) {
    weekDates.push(today.add(i, 'day').format('YYYY-MM-DD'));
  }
  
  return weekDates;
};

// Mock Teachers
export const mockTeachers: Teacher[] = [
  {
    id: 'teacher-1',
    name: 'John Smith',
    email: 'john.smith@olp.edu',
    subject: 'Mathematics',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 'teacher-2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@olp.edu',
    subject: 'English',
    avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 'teacher-3',
    name: 'Michael Brown',
    email: 'michael.brown@olp.edu',
    subject: 'Science',
    avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: 'teacher-4',
    name: 'Emily Davis',
    email: 'emily.davis@olp.edu',
    subject: 'History',
    avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    id: 'teacher-5',
    name: 'David Wilson',
    email: 'david.wilson@olp.edu',
    subject: 'Physical Education',
    avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg'
  }
];

// Mock Students
export const mockStudents: Student[] = [
  {
    id: 'student-1',
    name: 'Alex Johnson',
    grade: '8',
    class: '8A'
  },
  {
    id: 'student-2',
    name: 'Emma Wilson',
    grade: '7',
    class: '7B'
  },
  {
    id: 'student-3',
    name: 'Ryan Brown',
    grade: '6',
    class: '6C'
  },
  {
    id: 'student-4',
    name: 'Sophia Davis',
    grade: '8',
    class: '8B'
  }
];

// Mock Parents
export const mockParents: Parent[] = [
  {
    id: 'parent-1',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '+254712345678',
    children: [mockStudents[0], mockStudents[3]]
  },
  {
    id: 'parent-2',
    name: 'Patricia Wilson',
    email: 'patricia.wilson@example.com',
    phone: '+254723456789',
    children: [mockStudents[1]]
  },
  {
    id: 'parent-3',
    name: 'Thomas Brown',
    email: 'thomas.brown@example.com',
    phone: '+254734567890',
    children: [mockStudents[2]]
  }
];

// Generate time slots for each day (9 AM to 4 PM, 30-minute intervals)
const generateTimeSlots = (teacherId: string, date: string): AvailabilitySlot[] => {
  const slots: AvailabilitySlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 16; // 4 PM
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const endMinute = (minute + 30) % 60;
      const endHour = minute + 30 >= 60 ? hour + 1 : hour;
      const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
      
      // Randomly mark some slots as booked (about 20%)
      const isBooked = Math.random() < 0.2;
      
      slots.push({
        id: `slot-${teacherId}-${date}-${startTime}`,
        teacherId,
        date,
        startTime,
        endTime,
        isBooked
      });
    }
  }
  
  return slots;
};

// Generate availability slots for all teachers for the next 14 days
export const generateAvailabilitySlots = () => {
  const weekDates = generateWeekDates();
  const allSlots: AvailabilitySlot[] = [];
  
  mockTeachers.forEach(teacher => {
    weekDates.forEach(date => {
      const teacherSlots = generateTimeSlots(teacher.id, date);
      allSlots.push(...teacherSlots);
    });
  });
  
  return allSlots;
};

export const mockAvailabilitySlots = generateAvailabilitySlots();

// Generate some mock meetings
export const mockMeetings: Meeting[] = [
  {
    id: 'meeting-1',
    title: 'Discuss Math Progress',
    description: 'Review Alex\'s recent math test results and discuss areas for improvement',
    startTime: dayjs().add(2, 'day').hour(10).minute(0).second(0).toISOString(),
    endTime: dayjs().add(2, 'day').hour(10).minute(30).second(0).toISOString(),
    teacherId: 'teacher-1',
    parentId: 'parent-1',
    studentId: 'student-1',
    location: 'Room 105',
    status: 'scheduled',
    createdAt: dayjs().subtract(5, 'day').toISOString(),
    updatedAt: dayjs().subtract(5, 'day').toISOString()
  },
  {
    id: 'meeting-2',
    title: 'English Assignment Review',
    description: 'Discuss Emma\'s recent essay and provide feedback',
    startTime: dayjs().add(3, 'day').hour(14).minute(0).second(0).toISOString(),
    endTime: dayjs().add(3, 'day').hour(14).minute(30).second(0).toISOString(),
    teacherId: 'teacher-2',
    parentId: 'parent-2',
    studentId: 'student-2',
    location: 'Virtual',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    status: 'scheduled',
    createdAt: dayjs().subtract(3, 'day').toISOString(),
    updatedAt: dayjs().subtract(3, 'day').toISOString()
  },
  {
    id: 'meeting-3',
    title: 'Science Project Discussion',
    description: 'Review Ryan\'s upcoming science project requirements',
    startTime: dayjs().add(1, 'day').hour(11).minute(30).second(0).toISOString(),
    endTime: dayjs().add(1, 'day').hour(12).minute(0).second(0).toISOString(),
    teacherId: 'teacher-3',
    parentId: 'parent-3',
    studentId: 'student-3',
    location: 'Science Lab',
    status: 'scheduled',
    createdAt: dayjs().subtract(4, 'day').toISOString(),
    updatedAt: dayjs().subtract(4, 'day').toISOString()
  },
  {
    id: 'meeting-4',
    title: 'History Exam Preparation',
    description: 'Discuss study strategies for Sophia\'s upcoming history exam',
    startTime: dayjs().add(4, 'day').hour(15).minute(0).second(0).toISOString(),
    endTime: dayjs().add(4, 'day').hour(15).minute(30).second(0).toISOString(),
    teacherId: 'teacher-4',
    parentId: 'parent-1',
    studentId: 'student-4',
    location: 'Virtual',
    meetingLink: 'https://meet.google.com/xyz-abcd-efg',
    status: 'scheduled',
    createdAt: dayjs().subtract(2, 'day').toISOString(),
    updatedAt: dayjs().subtract(2, 'day').toISOString()
  },
  {
    id: 'meeting-5',
    title: 'Physical Education Performance',
    description: 'Discuss Alex\'s performance in physical education class',
    startTime: dayjs().subtract(2, 'day').hour(13).minute(0).second(0).toISOString(),
    endTime: dayjs().subtract(2, 'day').hour(13).minute(30).second(0).toISOString(),
    teacherId: 'teacher-5',
    parentId: 'parent-1',
    studentId: 'student-1',
    location: 'Gymnasium Office',
    status: 'completed',
    createdAt: dayjs().subtract(10, 'day').toISOString(),
    updatedAt: dayjs().subtract(2, 'day').toISOString()
  },
  {
    id: 'meeting-6',
    title: 'Math Tutoring Discussion',
    description: 'Discuss potential extra tutoring sessions for Emma',
    startTime: dayjs().subtract(1, 'day').hour(9).minute(30).second(0).toISOString(),
    endTime: dayjs().subtract(1, 'day').hour(10).minute(0).second(0).toISOString(),
    teacherId: 'teacher-1',
    parentId: 'parent-2',
    studentId: 'student-2',
    location: 'Room 105',
    status: 'completed',
    createdAt: dayjs().subtract(7, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString()
  }
];
