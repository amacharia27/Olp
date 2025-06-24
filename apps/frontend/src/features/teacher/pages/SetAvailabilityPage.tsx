// apps/frontend/src/features/teacher/pages/SetAvailabilityPage.tsx
import { useState } from 'react';
import {
  Card, Typography, Button, Space, Form, DatePicker, TimePicker, InputNumber,
  List, message, Popconfirm, Tag, Empty, Alert,
  Col,
  Row
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { RangePicker } = TimePicker;

// --- MOCK DATA ---
const initialAvailability = [
  { id: 1, date: '2023-11-20', startTime: '10:00', endTime: '12:00', slotDuration: 15, status: 'Active' },
  { id: 2, date: '2023-11-21', startTime: '14:00', endTime: '16:00', slotDuration: 20, status: 'Active' },
];

const SetAvailabilityPage = () => {
  const [availability, setAvailability] = useState(initialAvailability);
  const [form] = Form.useForm();
  
  const handleAddAvailability = (values: any) => {
    const newSlot = {
      id: availability.length + 1,
      date: values.date.format('YYYY-MM-DD'),
      startTime: values.timeRange[0].format('HH:mm'),
      endTime: values.timeRange[1].format('HH:mm'),
      slotDuration: values.slotDuration,
      status: 'Active',
    };
    setAvailability([...availability, newSlot]);
    message.success('New availability block created successfully!');
    form.resetFields();
    // TODO: API call to save new availability block
  };

  const handleDelete = (id: number) => {
    setAvailability(availability.filter(item => item.id !== id));
    message.success('Availability block removed.');
    // TODO: API call to delete availability block
  };

  return (
    <div>
      <Title level={2}>Set Parent-Teacher Meeting Availability</Title>
      <Alert
        message="How this works"
        description="Define blocks of time when you are available for meetings. The system will automatically create bookable time slots for parents based on the duration you set."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card title="Your Current Availability Blocks">
            <List
              dataSource={availability}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(item.id)}>
                      <Button size="small" danger icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                  ]}
                >
                  <List.Item.Meta
                    title={<Text strong>Date: {item.date}</Text>}
                    description={`Time: ${item.startTime} - ${item.endTime}  |  Slot Duration: ${item.slotDuration} mins`}
                  />
                  <Tag color="green">{item.status}</Tag>
                </List.Item>
              )}
              locale={{ emptyText: <Empty description="You have not set any availability yet." /> }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card title="Add New Availability Block">
            <Form form={form} layout="vertical" onFinish={handleAddAvailability}>
              <Form.Item name="date" label="Select Date" rules={[{ required: true }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="timeRange" label="Select Time Range" rules={[{ required: true }]}>
                <RangePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="slotDuration" label="Meeting Slot Duration (in minutes)" rules={[{ required: true }]}>
                <InputNumber min={10} max={60} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                  Add Availability
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SetAvailabilityPage;