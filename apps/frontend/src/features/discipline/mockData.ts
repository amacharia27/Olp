import { 
  DisciplineIncident, 
  DisciplineAction, 
  IncidentSeverity, 
  IncidentStatus, 
  ActionType,
  Student,
  Staff
} from './types';
import { UserRole } from '@olp-monitor/shared-types';
// Generate a simple ID for mock data
const generateId = () => Math.random().toString(36).substring(2, 15);
import dayjs from 'dayjs';

// Mock Students
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Kamau',
    grade: 'Grade 8',
    class: '8A',
    admissionNumber: 'ADM2023001',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: '2',
    name: 'Mary Wanjiku',
    grade: 'Grade 7',
    class: '7B',
    admissionNumber: 'ADM2023045',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: '3',
    name: 'Peter Omondi',
    grade: 'Grade 8',
    class: '8A',
    admissionNumber: 'ADM2023012',
    profileImage: 'https://randomuser.me/api/portraits/men/22.jpg'
  },
  {
    id: '4',
    name: 'Sarah Akinyi',
    grade: 'Grade 6',
    class: '6C',
    admissionNumber: 'ADM2023078',
    profileImage: 'https://randomuser.me/api/portraits/women/67.jpg'
  },
  {
    id: '5',
    name: 'David Mwangi',
    grade: 'Grade 7',
    class: '7A',
    admissionNumber: 'ADM2023034',
    profileImage: 'https://randomuser.me/api/portraits/men/41.jpg'
  }
];

// Mock Staff
export const mockStaff: Staff[] = [
  {
    id: '101',
    name: 'Mrs. Jane Njeri',
    role: UserRole.TEACHER,
    profileImage: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    id: '102',
    name: 'Mr. James Otieno',
    role: UserRole.TEACHER,
    profileImage: 'https://randomuser.me/api/portraits/men/64.jpg'
  },
  {
    id: '103',
    name: 'Mrs. Elizabeth Wambui',
    role: UserRole.DEPUTY_HEADTEACHER,
    profileImage: 'https://randomuser.me/api/portraits/women/54.jpg'
  },
  {
    id: '104',
    name: 'Mr. Samuel Kipchoge',
    role: UserRole.HEADTEACHER,
    profileImage: 'https://randomuser.me/api/portraits/men/76.jpg'
  }
];

// Generate random past date within the last 30 days
const getRandomPastDate = (maxDaysAgo = 30) => {
  const daysAgo = Math.floor(Math.random() * maxDaysAgo);
  return dayjs().subtract(daysAgo, 'day').format('YYYY-MM-DD');
};

// Generate random time
const getRandomTime = () => {
  const hour = Math.floor(Math.random() * 8) + 8; // 8 AM to 4 PM
  const minute = Math.floor(Math.random() * 60);
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

// List of school locations for reference
const schoolLocations = [
  'Classroom 8A',
  'Classroom 7B',
  'School Playground',
  'School Field',
  'School Hall',
  'Library',
  'Computer Lab',
  'Science Lab',
  'School Canteen',
  'School Corridor'
];

// Mock Discipline Incidents
export const mockDisciplineIncidents: DisciplineIncident[] = [
  {
    id: generateId(),
    title: 'Fighting in the playground',
    description: 'Student was involved in a physical altercation with another student during lunch break.',
    date: `${getRandomPastDate()}T${getRandomTime()}:00`,
    location: 'School Playground',
    severity: IncidentSeverity.MODERATE,
    status: IncidentStatus.ACTION_TAKEN,
    studentId: '1',
    reportedById: '101',
    witnesses: ['2', '3'],
    createdAt: dayjs().subtract(5, 'day').toISOString(),
    updatedAt: dayjs().subtract(3, 'day').toISOString()
  },
  {
    id: generateId(),
    title: 'Cheating on exam',
    description: 'Student was caught with unauthorized notes during the mathematics examination.',
    date: `${getRandomPastDate()}T${getRandomTime()}:00`,
    location: 'Classroom 8A',
    severity: IncidentSeverity.MAJOR,
    status: IncidentStatus.UNDER_INVESTIGATION,
    studentId: '3',
    reportedById: '102',
    witnesses: [],
    createdAt: dayjs().subtract(2, 'day').toISOString(),
    updatedAt: dayjs().subtract(2, 'day').toISOString()
  },
  {
    id: generateId(),
    title: 'Disruptive behavior',
    description: 'Student was repeatedly talking and disrupting the class despite warnings.',
    date: `${getRandomPastDate()}T${getRandomTime()}:00`,
    location: 'Classroom 7B',
    severity: IncidentSeverity.MINOR,
    status: IncidentStatus.RESOLVED,
    studentId: '2',
    reportedById: '101',
    witnesses: ['4'],
    createdAt: dayjs().subtract(10, 'day').toISOString(),
    updatedAt: dayjs().subtract(8, 'day').toISOString()
  },
  {
    id: generateId(),
    title: 'Vandalism of school property',
    description: 'Student was found writing graffiti on the bathroom wall.',
    date: `${getRandomPastDate()}T${getRandomTime()}:00`,
    location: 'School Bathroom',
    severity: IncidentSeverity.MAJOR,
    status: IncidentStatus.ACTION_TAKEN,
    studentId: '5',
    reportedById: '103',
    witnesses: ['1'],
    createdAt: dayjs().subtract(15, 'day').toISOString(),
    updatedAt: dayjs().subtract(13, 'day').toISOString()
  },
  {
    id: generateId(),
    title: 'Bullying incident',
    description: 'Student was reported for repeatedly teasing and intimidating younger students.',
    date: `${getRandomPastDate()}T${getRandomTime()}:00`,
    location: 'School Corridor',
    severity: IncidentSeverity.SEVERE,
    status: IncidentStatus.UNDER_INVESTIGATION,
    studentId: '1',
    reportedById: '102',
    witnesses: ['2', '4'],
    createdAt: dayjs().subtract(1, 'day').toISOString(),
    updatedAt: dayjs().subtract(1, 'day').toISOString()
  },
  {
    id: generateId(),
    title: 'Late arrival to school',
    description: 'Student has been consistently late to school for the past week.',
    date: `${getRandomPastDate()}T${getRandomTime()}:00`,
    location: 'School Gate',
    severity: IncidentSeverity.MINOR,
    status: IncidentStatus.REPORTED,
    studentId: '4',
    reportedById: '104',
    witnesses: [],
    createdAt: dayjs().subtract(3, 'day').toISOString(),
    updatedAt: dayjs().subtract(3, 'day').toISOString()
  }
];

// Add student and reportedBy objects to incidents
export const mockDisciplineIncidentsWithDetails = mockDisciplineIncidents.map(incident => ({
  ...incident,
  student: mockStudents.find(student => student.id === incident.studentId),
  reportedBy: mockStaff.find(staff => staff.id === incident.reportedById)
}));

// Mock Discipline Actions
export const mockDisciplineActions: DisciplineAction[] = [
  {
    id: generateId(),
    incidentId: mockDisciplineIncidents[0].id,
    actionType: ActionType.DETENTION,
    description: 'One week after-school detention',
    startDate: dayjs().subtract(3, 'day').format('YYYY-MM-DD'),
    endDate: dayjs().add(4, 'day').format('YYYY-MM-DD'),
    assignedById: '103',
    notes: 'Student must complete reflection essay during detention.',
    parentNotified: true,
    parentNotificationDate: dayjs().subtract(3, 'day').toISOString(),
    createdAt: dayjs().subtract(3, 'day').toISOString(),
    updatedAt: dayjs().subtract(3, 'day').toISOString()
  },
  {
    id: generateId(),
    incidentId: mockDisciplineIncidents[3].id,
    actionType: ActionType.PARENT_MEETING,
    description: 'Meeting with parents to discuss behavior',
    startDate: dayjs().add(2, 'day').format('YYYY-MM-DD'),
    assignedById: '104',
    notes: 'Student will also be required to clean the graffiti.',
    parentNotified: true,
    parentNotificationDate: dayjs().subtract(13, 'day').toISOString(),
    createdAt: dayjs().subtract(13, 'day').toISOString(),
    updatedAt: dayjs().subtract(13, 'day').toISOString()
  },
  {
    id: generateId(),
    incidentId: mockDisciplineIncidents[2].id,
    actionType: ActionType.WARNING,
    description: 'Verbal warning issued',
    startDate: dayjs().subtract(8, 'day').format('YYYY-MM-DD'),
    assignedById: '101',
    notes: 'Any further disruptions will result in detention.',
    parentNotified: false,
    createdAt: dayjs().subtract(8, 'day').toISOString(),
    updatedAt: dayjs().subtract(8, 'day').toISOString()
  }
];

// Add assignedBy objects to actions
export const mockDisciplineActionsWithDetails = mockDisciplineActions.map(action => ({
  ...action,
  assignedBy: mockStaff.find(staff => staff.id === action.assignedById)
}));
