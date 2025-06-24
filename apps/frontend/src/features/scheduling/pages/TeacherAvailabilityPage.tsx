// apps/frontend/src/features/scheduling/pages/TeacherAvailabilityPage.tsx
import React from 'react';
import { Card, Typography, Tabs, Alert } from 'antd';
import { CalendarOutlined, ScheduleOutlined } from '@ant-design/icons';
import AvailabilityCalendar from '@/features/scheduling/components/AvailabilityCalendar';
import { mockMeetings } from '@/features/scheduling/mockData';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const TeacherAvailabilityPage: React.FC = () => {
  // Filter upcoming meetings for the current teacher
  // In a real app, this would use the logged-in teacher's ID
  const teacherId = 'teacher-1';
  const upcomingMeetings = mockMeetings.filter(
    meeting => meeting.teacherId === teacherId && 
               meeting.status === 'scheduled' &&
               dayjs(meeting.startTime).isAfter(dayjs())
  );
  
  return (
    <div className="teacher-availability-page">
      <Title level={2}>Meeting Scheduler</Title>
      <Text type="secondary">
        Manage your availability for parent-teacher meetings and view your upcoming schedule.
      </Text>
      
      <Card style={{ marginTop: 16 }}>
        <Tabs defaultActiveKey="availability">
          <TabPane 
            tab={<span><CalendarOutlined /> Manage Availability</span>}
            key="availability"
          >
            <Alert
              message="Set Your Availability"
              description="Click on any date in the calendar to add time slots when you're available for parent-teacher meetings. Parents will only be able to book meetings during these times."
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <AvailabilityCalendar teacherId={teacherId} readOnly={false} />
          </TabPane>
          
          <TabPane 
            tab={<span><ScheduleOutlined /> Upcoming Meetings ({upcomingMeetings.length})</span>}
            key="meetings"
          >
            {upcomingMeetings.length > 0 ? (
              <div>
                {upcomingMeetings.map(meeting => {
                  const meetingDate = dayjs(meeting.startTime);
                  return (
                    <Card 
                      key={meeting.id} 
                      size="small" 
                      title={meeting.title}
                      style={{ marginBottom: 16 }}
                    >
                      <p><strong>Date:</strong> {meetingDate.format('MMMM D, YYYY')}</p>
                      <p><strong>Time:</strong> {meetingDate.format('h:mm A')} - {dayjs(meeting.endTime).format('h:mm A')}</p>
                      <p><strong>Student:</strong> {meeting.studentId}</p>
                      <p><strong>Location:</strong> {meeting.location}</p>
                      {meeting.meetingLink && (
                        <p>
                          <strong>Meeting Link:</strong> <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer">{meeting.meetingLink}</a>
                        </p>
                      )}
                      <p><strong>Description:</strong> {meeting.description}</p>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Alert
                message="No Upcoming Meetings"
                description="You don't have any scheduled meetings at this time."
                type="info"
                showIcon
              />
            )}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default TeacherAvailabilityPage;
