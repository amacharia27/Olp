// apps/frontend/src/features/scheduling/components/AvailabilityCalendar.tsx
import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Modal, Form, TimePicker, Button, Select, Typography, Alert, Spin } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { AvailabilitySlot, Teacher } from '@/features/scheduling/types';
import { mockAvailabilitySlots, mockTeachers } from '@/features/scheduling/mockData';

const { Title, Text } = Typography;
const { Option } = Select;

interface AvailabilityCalendarProps {
  teacherId?: string; // Optional: If provided, shows only this teacher's availability
  readOnly?: boolean; // If true, teacher cannot modify availability
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ 
  teacherId = 'teacher-1', // Default to first teacher if not provided
  readOnly = false 
}) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [form] = Form.useForm();
  const [currentTeacher, setCurrentTeacher] = useState<Teacher | undefined>(
    mockTeachers.find(teacher => teacher.id === teacherId)
  );

  // Load availability slots
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const filteredSlots = mockAvailabilitySlots.filter(
        slot => slot.teacherId === teacherId
      );
      setAvailabilitySlots(filteredSlots);
      setIsLoading(false);
    }, 500);
  }, [teacherId]);

  // Handle date selection
  const onDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    if (!readOnly) {
      showModal();
    }
  };

  // Show modal for adding/editing availability
  const showModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  // Handle modal submission
  const handleOk = () => {
    form.validateFields().then(values => {
      const { startTime, endTime } = values;
      
      // Format the times
      const formattedStartTime = startTime.format('HH:mm');
      const formattedEndTime = endTime.format('HH:mm');
      const formattedDate = selectedDate.format('YYYY-MM-DD');
      
      // Create a new availability slot
      const newSlot: AvailabilitySlot = {
        id: `slot-${teacherId}-${formattedDate}-${formattedStartTime}`,
        teacherId,
        date: formattedDate,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        isBooked: false
      };
      
      // Add the new slot to the list
      setAvailabilitySlots(prev => [...prev, newSlot]);
      setIsModalVisible(false);
    });
  };

  // Handle modal cancellation
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Get slots for a specific date
  const getSlotsForDate = (date: Dayjs) => {
    const formattedDate = date.format('YYYY-MM-DD');
    return availabilitySlots.filter(slot => slot.date === formattedDate);
  };

  // Render calendar cell content
  const dateCellRender = (date: Dayjs) => {
    const slots = getSlotsForDate(date);
    
    return (
      <ul className="events" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {slots.map(slot => (
          <li key={slot.id}>
            <Badge 
              status={slot.isBooked ? 'error' : 'success'} 
              text={`${slot.startTime}-${slot.endTime}`} 
              style={{ whiteSpace: 'nowrap' }}
            />
          </li>
        ))}
      </ul>
    );
  };

  // Handle teacher change (if applicable)
  const handleTeacherChange = (value: string) => {
    const teacher = mockTeachers.find(t => t.id === value);
    setCurrentTeacher(teacher);
    setIsLoading(true);
    
    // Simulate API call to get teacher's availability
    setTimeout(() => {
      const filteredSlots = mockAvailabilitySlots.filter(
        slot => slot.teacherId === value
      );
      setAvailabilitySlots(filteredSlots);
      setIsLoading(false);
    }, 500);
  };

  // Delete an availability slot
  const deleteSlot = (slotId: string) => {
    setAvailabilitySlots(prev => prev.filter(slot => slot.id !== slotId));
  };

  return (
    <div className="availability-calendar">
      {!readOnly && (
        <div style={{ marginBottom: 16 }}>
          <Title level={4}>Manage Your Availability</Title>
          <Text>Click on a date to add available time slots for parent-teacher meetings.</Text>
        </div>
      )}
      
      {readOnly && (
        <div style={{ marginBottom: 16 }}>
          <Form layout="inline">
            <Form.Item label="Select Teacher">
              <Select 
                defaultValue={teacherId} 
                style={{ width: 200 }} 
                onChange={handleTeacherChange}
              >
                {mockTeachers.map(teacher => (
                  <Option key={teacher.id} value={teacher.id}>
                    {teacher.name} ({teacher.subject})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
          <Text>Available time slots are shown in green. Click on a date to view details.</Text>
        </div>
      )}
      
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>Loading availability...</div>
        </div>
      ) : (
        <Calendar 
          onSelect={onDateSelect} 
          dateCellRender={dateCellRender} 
        />
      )}
      
      {/* Modal for adding availability */}
      <Modal
        title={`Add Availability for ${selectedDate.format('MMMM D, YYYY')}`}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[{ required: true, message: 'Please select a start time' }]}
          >
            <TimePicker format="HH:mm" minuteStep={15} />
          </Form.Item>
          
          <Form.Item
            name="endTime"
            label="End Time"
            rules={[
              { required: true, message: 'Please select an end time' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || !getFieldValue('startTime') || value.isAfter(getFieldValue('startTime'))) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('End time must be after start time'));
                },
              }),
            ]}
          >
            <TimePicker format="HH:mm" minuteStep={15} />
          </Form.Item>
        </Form>
      </Modal>
      
      {/* Modal for viewing date details */}
      <Modal
        title={`Availability for ${selectedDate.format('MMMM D, YYYY')}`}
        open={readOnly && isModalVisible}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>
        ]}
        onCancel={handleCancel}
      >
        <div>
          {currentTeacher && (
            <div style={{ marginBottom: 16 }}>
              <Text strong>Teacher: </Text>
              <Text>{currentTeacher.name} ({currentTeacher.subject})</Text>
            </div>
          )}
          
          {getSlotsForDate(selectedDate).length > 0 ? (
            <ul style={{ padding: 0 }}>
              {getSlotsForDate(selectedDate).map(slot => (
                <li key={slot.id} style={{ listStyle: 'none', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>
                      <Badge 
                        status={slot.isBooked ? 'error' : 'success'} 
                        text={`${slot.startTime} - ${slot.endTime}`} 
                      />
                      {slot.isBooked && <Text type="secondary" style={{ marginLeft: 8 }}>(Booked)</Text>}
                    </span>
                    
                    {!readOnly && !slot.isBooked && (
                      <Button 
                        danger 
                        size="small" 
                        onClick={() => deleteSlot(slot.id)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Alert 
              message="No availability" 
              description="There are no available time slots for this date." 
              type="info" 
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AvailabilityCalendar;
