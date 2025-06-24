// apps/frontend/src/pages/SchoolCalendarPage.tsx
import { useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import { Card, Typography, Button, Modal, Form, Input, Select, DatePicker, Tag, Col, Row, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/store/auth.store';
import { UserRole } from '@olp-monitor/shared-types';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

// Setup the localizer by telling it that we are using dayjs
const localizer = dayjsLocalizer(dayjs);

// --- MOCK DATA ---
const mockEvents = [
  {
    id: 1,
    title: 'Mid-Term Exams Begin',
    start: dayjs().startOf('week').add(1, 'day').hour(9).toDate(),
    end: dayjs().startOf('week').add(3, 'day').hour(15).toDate(),
    type: 'Academic',
  },
  {
    id: 2,
    title: 'Parent-Teacher Meetings',
    start: dayjs().add(1, 'week').startOf('week').add(4, 'day').hour(10).toDate(),
    end: dayjs().add(1, 'week').startOf('week').add(4, 'day').hour(16).toDate(),
    type: 'Meeting',
  },
  {
    id: 3,
    title: 'School Sports Day',
    start: dayjs().add(2, 'week').startOf('week').add(4, 'day').toDate(),
    end: dayjs().add(2, 'week').startOf('week').add(4, 'day').toDate(),
    allDay: true,
    type: 'Sporting',
  },
   {
    id: 4,
    title: 'Mashujaa Day - School Closed',
    start: dayjs('2023-10-20').toDate(), // Example of a fixed date
    end: dayjs('2023-10-20').toDate(),
    allDay: true,
    type: 'Holiday',
  },
];

const eventTypeColors: Record<string, string> = {
  Academic: 'blue',
  Meeting: 'purple',
  Sporting: 'green',
  Holiday: 'gold',
};

const SchoolCalendarPage = () => {
  const { user } = useAuthStore();
  const [events, setEvents] = useState(mockEvents);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const isAdministrator = user?.role === UserRole.HEADTEACHER || user?.role === UserRole.DEPUTY_HEADTEACHER;

  const eventStyleGetter = (event: any) => {
    const backgroundColor = eventTypeColors[event.type] || 'gray';
    const style = {
      backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return { style };
  };

  const handleCreateEvent = (values: any) => {
    console.log('New Event:', values);
    const newEvent = {
        id: events.length + 1,
        title: values.title,
        start: values.dateRange[0].toDate(),
        end: values.dateRange[1].toDate(),
        type: values.type,
    };
    setEvents([...events, newEvent]);
    message.success('Event created successfully!');
    setIsModalVisible(false);
  };

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={2}>School Calendar & Events</Title>
          <Paragraph type="secondary">View all upcoming school activities, holidays, and important dates.</Paragraph>
        </Col>
        {isAdministrator && (
          <Col>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalVisible(true)}>
              Create New Event
            </Button>
          </Col>
        )}
      </Row>
      <Card>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '70vh' }}
          eventPropGetter={eventStyleGetter}
        />
      </Card>

      <Modal
        title="Create New School Event"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateEvent}>
          <Form.Item name="title" label="Event Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="dateRange" label="Start & End Date/Time" rules={[{ required: true }]}>
            <RangePicker showTime format="YYYY-MM-DD HH:mm" style={{width: '100%'}}/>
          </Form.Item>
          <Form.Item name="type" label="Event Type" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="Academic">Academic</Select.Option>
              <Select.Option value="Meeting">Meeting</Select.Option>
              <Select.Option value="Sporting">Sporting</Select.Option>
              <Select.Option value="Holiday">Holiday</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button onClick={() => setIsModalVisible(false)} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit">Save Event</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SchoolCalendarPage;