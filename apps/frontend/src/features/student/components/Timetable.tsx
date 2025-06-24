// apps/frontend/src/features/student/components/TodayTimetable.tsx
import { Card, Timeline, Typography, Tag } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

// --- MOCK DATA ---
const timetableData = [
  { time: '08:00 AM - 08:45 AM', subject: 'Mathematics', teacher: 'Mr. Otieno', status: 'done' },
  { time: '08:45 AM - 09:30 AM', subject: 'English', teacher: 'Ms. Wanjiku', status: 'done' },
  { time: '09:30 AM - 10:15 AM', subject: 'Kiswahili', teacher: 'Mr. Kamau', status: 'ongoing' },
  { time: '10:15 AM - 10:45 AM', subject: 'Short Break', teacher: '', status: 'upcoming' },
  { time: '10:45 AM - 11:30 AM', subject: 'Science', teacher: 'Mr. Otieno', status: 'upcoming' },
  { time: '11:30 AM - 12:15 PM', subject: 'Social Studies', teacher: 'Ms. Were', status: 'upcoming' },
];
// --- END MOCK DATA ---

const TodayTimetable = () => {
  const getTimelineItem = (item: any) => {
    let color = 'gray';
    if (item.status === 'done') color = 'green';
    if (item.status === 'ongoing') color = 'blue';
    
    return {
      color: color,
      dot: item.status === 'ongoing' ? <ClockCircleOutlined style={{ fontSize: '16px' }} /> : undefined,
      children: (
        <div>
          <p style={{ margin: 0, fontWeight: '500' }}>{item.subject}</p>
          <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>
            {item.time} {item.teacher && ` - ${item.teacher}`}
          </p>
        </div>
      ),
    };
  };

  return (
    <Card title="Today's Timetable">
      <Timeline mode="left" items={timetableData.map(getTimelineItem)} />
    </Card>
  );
};

export default TodayTimetable;