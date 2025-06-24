// apps/frontend/src/features/scheduling/components/MeetingBookingForm.tsx
import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Button, DatePicker, Radio, Typography, Divider, Spin, Alert, Space } from 'antd';
import { CalendarOutlined, UserOutlined, BookOutlined, EnvironmentOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Teacher, Student, AvailabilitySlot, BookingFormData } from '@/features/scheduling/types';
import { mockTeachers, mockStudents, mockAvailabilitySlots } from '@/features/scheduling/mockData';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface MeetingBookingFormProps {
  parentId: string;
  onBookingComplete: (bookingData: BookingFormData) => void;
  initialTeacherId?: string;
  initialStudentId?: string;
}

const MeetingBookingForm: React.FC<MeetingBookingFormProps> = ({
  parentId,
  onBookingComplete,
  initialTeacherId,
  initialStudentId
}) => {
  const [form] = Form.useForm();
  const [selectedTeacher, setSelectedTeacher] = useState<string | undefined>(initialTeacherId);
  const [selectedStudent, setSelectedStudent] = useState<string | undefined>(initialStudentId);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [meetingType, setMeetingType] = useState<'in-person' | 'virtual'>('in-person');

  // Filter students that belong to the current parent
  const parentStudents = mockStudents.filter(student => 
    // In a real app, this would filter by the actual parent ID
    ['student-1', 'student-2', 'student-3', 'student-4'].includes(student.id)
  );

  // Load available slots when teacher and date are selected
  useEffect(() => {
    if (selectedTeacher && selectedDate) {
      setIsLoading(true);
      
      // Simulate API call to get available slots
      setTimeout(() => {
        const formattedDate = selectedDate.format('YYYY-MM-DD');
        const teacherSlots = mockAvailabilitySlots.filter(
          slot => slot.teacherId === selectedTeacher && 
                 slot.date === formattedDate && 
                 !slot.isBooked
        );
        
        setAvailableSlots(teacherSlots);
        setIsLoading(false);
      }, 500);
    } else {
      setAvailableSlots([]);
    }
  }, [selectedTeacher, selectedDate]);

  // Handle form submission
  const handleSubmit = (values: any) => {
    const bookingData: BookingFormData = {
      teacherId: values.teacher,
      studentId: values.student,
      slotId: values.timeSlot,
      title: values.title,
      description: values.description,
      meetingType: values.meetingType
    };
    
    onBookingComplete(bookingData);
  };

  // Handle teacher selection
  const handleTeacherChange = (value: string) => {
    setSelectedTeacher(value);
    form.setFieldsValue({ timeSlot: undefined });
  };

  // Handle student selection
  const handleStudentChange = (value: string) => {
    setSelectedStudent(value);
  };

  // Handle date selection
  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
    form.setFieldsValue({ timeSlot: undefined });
  };

  // Format time slot for display
  const formatTimeSlot = (slot: AvailabilitySlot) => {
    return `${slot.startTime} - ${slot.endTime}`;
  };

  // Disable past dates in the date picker
  const disabledDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <div className="meeting-booking-form">
      <Title level={4}>Book a Parent-Teacher Meeting</Title>
      <Text type="secondary">
        Select a teacher, student, date, and available time slot to schedule a meeting.
      </Text>
      
      <Divider />
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          teacher: initialTeacherId,
          student: initialStudentId,
          meetingType: 'in-person'
        }}
      >
        <Form.Item
          name="teacher"
          label="Select Teacher"
          rules={[{ required: true, message: 'Please select a teacher' }]}
        >
          <Select 
            placeholder="Select a teacher" 
            onChange={handleTeacherChange}
            suffixIcon={<UserOutlined />}
          >
            {mockTeachers.map(teacher => (
              <Option key={teacher.id} value={teacher.id}>
                {teacher.name} ({teacher.subject})
              </Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item
          name="student"
          label="Select Student"
          rules={[{ required: true, message: 'Please select a student' }]}
        >
          <Select 
            placeholder="Select a student" 
            onChange={handleStudentChange}
            suffixIcon={<UserOutlined />}
          >
            {parentStudents.map(student => (
              <Option key={student.id} value={student.id}>
                {student.name} (Grade {student.grade}, Class {student.class})
              </Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item
          name="date"
          label="Select Date"
          rules={[{ required: true, message: 'Please select a date' }]}
        >
          <DatePicker 
            style={{ width: '100%' }} 
            onChange={handleDateChange}
            disabledDate={disabledDate}
            format="YYYY-MM-DD"
            suffixIcon={<CalendarOutlined />}
          />
        </Form.Item>
        
        <Form.Item
          name="timeSlot"
          label="Select Time Slot"
          rules={[{ required: true, message: 'Please select a time slot' }]}
        >
          <Select placeholder="Select an available time slot" disabled={!selectedTeacher || !selectedDate}>
            {isLoading ? (
              <Option value="loading" disabled>
                <Spin size="small" /> Loading available slots...
              </Option>
            ) : availableSlots.length > 0 ? (
              availableSlots.map(slot => (
                <Option key={slot.id} value={slot.id}>
                  {formatTimeSlot(slot)}
                </Option>
              ))
            ) : (
              <Option value="none" disabled>
                No available slots for this date
              </Option>
            )}
          </Select>
        </Form.Item>
        
        <Form.Item
          name="title"
          label="Meeting Title"
          rules={[{ required: true, message: 'Please enter a meeting title' }]}
        >
          <Input 
            placeholder="e.g., Discuss Math Progress" 
            prefix={<BookOutlined />} 
          />
        </Form.Item>
        
        <Form.Item
          name="description"
          label="Meeting Description"
          rules={[{ required: true, message: 'Please enter a meeting description' }]}
        >
          <TextArea 
            rows={4} 
            placeholder="Describe the purpose of this meeting..." 
          />
        </Form.Item>
        
        <Form.Item
          name="meetingType"
          label="Meeting Type"
          rules={[{ required: true, message: 'Please select a meeting type' }]}
        >
          <Radio.Group onChange={e => setMeetingType(e.target.value)}>
            <Radio value="in-person">
              <Space>
                <EnvironmentOutlined />
                In-Person
              </Space>
            </Radio>
            <Radio value="virtual">
              <Space>
                <CalendarOutlined />
                Virtual
              </Space>
            </Radio>
          </Radio.Group>
        </Form.Item>
        
        {meetingType === 'in-person' && (
          <Alert
            message="In-Person Meeting"
            description="The meeting will take place at the school. Please arrive 10 minutes before the scheduled time."
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        
        {meetingType === 'virtual' && (
          <Alert
            message="Virtual Meeting"
            description="A meeting link will be sent to your email address before the scheduled time."
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Book Meeting
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MeetingBookingForm;
