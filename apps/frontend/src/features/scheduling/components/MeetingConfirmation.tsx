// apps/frontend/src/features/scheduling/components/MeetingConfirmation.tsx
import React from 'react';
import { Result, Button, Descriptions, Typography, Card, Tag, Space, Divider } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, UserOutlined, TeamOutlined, EnvironmentOutlined, VideoCameraOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Meeting, Teacher, Student } from '@/features/scheduling/types';
import { mockTeachers, mockStudents } from '@/features/scheduling/mockData';

const { Title, Text, Paragraph } = Typography;

interface MeetingConfirmationProps {
  meeting: Meeting;
  onDone: () => void;
  onCancel?: () => void;
}

const MeetingConfirmation: React.FC<MeetingConfirmationProps> = ({
  meeting,
  onDone,
  onCancel
}) => {
  // Find teacher and student details
  const teacher = mockTeachers.find(t => t.id === meeting.teacherId);
  const student = mockStudents.find(s => s.id === meeting.studentId);
  
  // Format date and time
  const formattedDate = dayjs(meeting.startTime).format('dddd, MMMM D, YYYY');
  const formattedStartTime = dayjs(meeting.startTime).format('h:mm A');
  const formattedEndTime = dayjs(meeting.endTime).format('h:mm A');
  
  // Determine if meeting is virtual
  const isVirtual = meeting.location === 'Virtual';
  
  return (
    <Card className="meeting-confirmation">
      <Result
        status="success"
        title="Meeting Successfully Scheduled!"
        subTitle={`Your meeting has been booked for ${formattedDate} at ${formattedStartTime}.`}
      />
      
      <Divider />
      
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <Title level={4}>Meeting Details</Title>
        
        <Card type="inner" style={{ marginBottom: 16 }}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Descriptions column={1} size="small">
              <Descriptions.Item label={<Space><CalendarOutlined /> Date</Space>}>
                {formattedDate}
              </Descriptions.Item>
              <Descriptions.Item label={<Space><ClockCircleOutlined /> Time</Space>}>
                {formattedStartTime} - {formattedEndTime}
              </Descriptions.Item>
              <Descriptions.Item label={<Space>
                {isVirtual ? <VideoCameraOutlined /> : <EnvironmentOutlined />} Location
              </Space>}>
                {meeting.location}
                {isVirtual && meeting.meetingLink && (
                  <Tag color="blue" style={{ marginLeft: 8 }}>
                    <a href={meeting.meetingLink} target="_blank" rel="noopener noreferrer">
                      Join Meeting
                    </a>
                  </Tag>
                )}
              </Descriptions.Item>
            </Descriptions>
            
            <Divider style={{ margin: '12px 0' }} />
            
            <Descriptions column={1} size="small">
              <Descriptions.Item label={<Space><UserOutlined /> Teacher</Space>}>
                {teacher ? `${teacher.name} (${teacher.subject})` : 'Unknown Teacher'}
              </Descriptions.Item>
              <Descriptions.Item label={<Space><TeamOutlined /> Student</Space>}>
                {student ? `${student.name} (Grade ${student.grade}, Class ${student.class})` : 'Unknown Student'}
              </Descriptions.Item>
            </Descriptions>
            
            <Divider style={{ margin: '12px 0' }} />
            
            <div>
              <Text strong>Meeting Title:</Text>
              <Paragraph>{meeting.title}</Paragraph>
              
              <Text strong>Description:</Text>
              <Paragraph>{meeting.description}</Paragraph>
            </div>
          </Space>
        </Card>
        
        <Paragraph type="secondary">
          A confirmation email has been sent to your registered email address. You can view and manage all your scheduled meetings from your dashboard.
        </Paragraph>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
          {onCancel && (
            <Button danger onClick={onCancel}>
              Cancel Meeting
            </Button>
          )}
          <Button type="primary" onClick={onDone}>
            Done
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MeetingConfirmation;
