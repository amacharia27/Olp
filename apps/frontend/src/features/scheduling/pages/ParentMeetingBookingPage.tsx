// apps/frontend/src/features/scheduling/pages/ParentMeetingBookingPage.tsx
import React, { useState } from 'react';
import { Card, Typography, Steps, Button, Tabs, Alert, List, Tag, Space } from 'antd';
import { CalendarOutlined, FormOutlined, CheckCircleOutlined, ScheduleOutlined } from '@ant-design/icons';
import MeetingBookingForm from '@/features/scheduling/components/MeetingBookingForm';
import MeetingConfirmation from '@/features/scheduling/components/MeetingConfirmation';
import AvailabilityCalendar from '@/features/scheduling/components/AvailabilityCalendar';
import { BookingFormData, Meeting, AvailabilitySlot } from '@/features/scheduling/types';
import { mockMeetings, mockTeachers, mockStudents, mockAvailabilitySlots } from '@/features/scheduling/mockData';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Step } = Steps;

const ParentMeetingBookingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  // We don't need to store the booking data in state since we immediately create a meeting from it
  // Using a simple function instead of state
  const setBookingData = (_data: BookingFormData | null) => {
    // Function exists just to maintain the API, but we don't need to store the data
  };
  const [newMeeting, setNewMeeting] = useState<Meeting | null>(null);
  
  // In a real app, this would be the logged-in parent's ID
  const parentId = 'parent-1';
  
  // Filter upcoming meetings for the current parent
  const upcomingMeetings = mockMeetings.filter(
    meeting => meeting.parentId === parentId && 
               meeting.status === 'scheduled' &&
               dayjs(meeting.startTime).isAfter(dayjs())
  );
  
  // Filter past meetings for the current parent
  const pastMeetings = mockMeetings.filter(
    meeting => meeting.parentId === parentId && 
               (meeting.status === 'completed' || dayjs(meeting.startTime).isBefore(dayjs()))
  );
  
  // Handle booking form submission
  const handleBookingComplete = (data: BookingFormData) => {
    setBookingData(data);
    
    // Create a new meeting object
    const selectedSlot = mockAvailabilitySlots.find((slot: AvailabilitySlot) => slot.id === data.slotId);
    if (selectedSlot) {
      const startTime = dayjs(`${selectedSlot.date}T${selectedSlot.startTime}`).toISOString();
      const endTime = dayjs(`${selectedSlot.date}T${selectedSlot.endTime}`).toISOString();
      
      const meeting: Meeting = {
        id: `meeting-${Date.now()}`,
        title: data.title,
        description: data.description,
        startTime,
        endTime,
        teacherId: data.teacherId,
        parentId,
        studentId: data.studentId,
        location: data.meetingType === 'in-person' ? 'School (Room TBD)' : 'Virtual',
        meetingLink: data.meetingType === 'virtual' ? 'https://meet.google.com/generated-link' : undefined,
        status: 'scheduled',
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString()
      };
      
      setNewMeeting(meeting);
      setCurrentStep(1);
    }
  };
  
  // Handle confirmation done
  const handleConfirmationDone = () => {
    setCurrentStep(0);
    setBookingData(null);
    setNewMeeting(null);
  };
  
  // Render meeting item
  const renderMeetingItem = (meeting: Meeting) => {
    const teacher = mockTeachers.find(t => t.id === meeting.teacherId);
    const student = mockStudents.find(s => s.id === meeting.studentId);
    const meetingDate = dayjs(meeting.startTime);
    const isPast = meetingDate.isBefore(dayjs());
    
    return (
      <List.Item>
        <Card 
          title={meeting.title}
          size="small"
          style={{ width: '100%' }}
          extra={
            <Tag color={isPast ? 'default' : 'green'}>
              {isPast ? 'Past' : 'Upcoming'}
            </Tag>
          }
        >
          <p>
            <Space>
              <CalendarOutlined />
              <span>{meetingDate.format('MMMM D, YYYY')}</span>
            </Space>
          </p>
          <p>
            <Space>
              <ScheduleOutlined />
              <span>{meetingDate.format('h:mm A')} - {dayjs(meeting.endTime).format('h:mm A')}</span>
            </Space>
          </p>
          <p>
            <strong>Teacher:</strong> {teacher ? teacher.name : 'Unknown'}
          </p>
          <p>
            <strong>Student:</strong> {student ? student.name : 'Unknown'}
          </p>
          <p>
            <strong>Location:</strong> {meeting.location}
            {meeting.meetingLink && (
              <Button type="link" href={meeting.meetingLink} target="_blank" style={{ padding: 0, marginLeft: 8 }}>
                Join Meeting
              </Button>
            )}
          </p>
        </Card>
      </List.Item>
    );
  };
  
  return (
    <div className="parent-meeting-booking-page">
      <Title level={2}>Parent-Teacher Meetings</Title>
      <Text type="secondary">
        Schedule meetings with your child's teachers to discuss academic progress and other concerns.
      </Text>
      
      <Card style={{ marginTop: 16 }}>
        <Tabs defaultActiveKey="book">
          <TabPane 
            tab={<span><FormOutlined /> Book a Meeting</span>}
            key="book"
          >
            <Steps current={currentStep} style={{ marginBottom: 24 }}>
              <Step title="Book" icon={<FormOutlined />} />
              <Step title="Confirm" icon={<CheckCircleOutlined />} />
            </Steps>
            
            {currentStep === 0 && (
              <MeetingBookingForm 
                parentId={parentId}
                onBookingComplete={handleBookingComplete}
              />
            )}
            
            {currentStep === 1 && newMeeting && (
              <MeetingConfirmation 
                meeting={newMeeting}
                onDone={handleConfirmationDone}
              />
            )}
          </TabPane>
          
          <TabPane 
            tab={<span><CalendarOutlined /> View Teacher Availability</span>}
            key="availability"
          >
            <Alert
              message="Teacher Availability"
              description="View available time slots for each teacher. Select a teacher and date to see when they're available for meetings."
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <AvailabilityCalendar readOnly={true} />
          </TabPane>
          
          <TabPane 
            tab={<span><ScheduleOutlined /> Your Meetings ({upcomingMeetings.length})</span>}
            key="meetings"
          >
            <Tabs defaultActiveKey="upcoming" type="card" size="small">
              <TabPane tab={`Upcoming (${upcomingMeetings.length})`} key="upcoming">
                {upcomingMeetings.length > 0 ? (
                  <List
                    grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
                    dataSource={upcomingMeetings}
                    renderItem={renderMeetingItem}
                  />
                ) : (
                  <Alert
                    message="No Upcoming Meetings"
                    description="You don't have any scheduled meetings at this time. Use the 'Book a Meeting' tab to schedule one."
                    type="info"
                    showIcon
                  />
                )}
              </TabPane>
              
              <TabPane tab={`Past (${pastMeetings.length})`} key="past">
                {pastMeetings.length > 0 ? (
                  <List
                    grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
                    dataSource={pastMeetings}
                    renderItem={renderMeetingItem}
                  />
                ) : (
                  <Alert
                    message="No Past Meetings"
                    description="You don't have any past meetings on record."
                    type="info"
                    showIcon
                  />
                )}
              </TabPane>
            </Tabs>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ParentMeetingBookingPage;
