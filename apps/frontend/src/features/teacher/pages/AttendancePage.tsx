// apps/frontend/src/features/teacher/pages/AttendancePage.tsx
import { useState } from 'react';
import {
  Table, Typography, Button, Select, Card,
  Form, DatePicker, Radio, Row, Col, message
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title } = Typography;

// --- MOCK DATA ---
const teacherClasses = [
  { value: 'class_6A', label: 'Grade 6 - Eagles' },
  { value: 'class_6B', label: 'Grade 6 - Falcons' },
  { value: 'class_5C', label: 'Grade 5 - Lions' },
];

const studentsData = [
  { key: '1', studentId: 'ST-00123', name: 'Asha Kimani' },
  { key: '2', studentId: 'ST-00124', name: 'Brian Omondi' },
  { key: '3', studentId: 'ST-00125', name: 'Fatima Yusuf' },
  { key: '4', studentId: 'ST-00126', name: 'David Mwangi' },
  { key: '5', studentId: 'ST-00130', name: 'Grace Wanjiru' },
  { key: '6', studentId: 'ST-00131', name: 'Samuel Leteipa' },
];

const AttendancePage = () => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with all students marked as 'Present' by default
  const initialFormValues = {
    attendance: studentsData.reduce((acc, student) => {
      acc[student.key] = 'Present';
      return acc;
    }, {} as Record<string, string>),
    date: dayjs(), // Set date to today by default
    classId: 'class_6A', // Set a default class
  };

  const handleMarkAllPresent = () => {
    const currentValues = form.getFieldValue('attendance') || {};
    const allPresent = { ...currentValues };
    studentsData.forEach(student => {
      allPresent[student.key] = 'Present';
    });
    form.setFieldsValue({ attendance: allPresent });
    message.info('All students marked as Present.');
  };

  const handleAttendanceSubmit = (values: any) => {
    setIsSubmitting(true);
    // Structure the data for an API call
    const payload = {
      classId: values.classId,
      date: values.date.format('YYYY-MM-DD'),
      records: Object.entries(values.attendance).map(([studentKey, status]) => ({
        studentId: studentsData.find(s => s.key === studentKey)?.studentId,
        status,
      })),
    };

    console.log('Submitting Attendance:', payload);
    
    setTimeout(() => { // Simulate API call
      message.success('Attendance for the selected class has been saved successfully!');
      setIsSubmitting(false);
    }, 1500);
    // TODO: Add API call to bulk-submit attendance records
  };

  const columns: ColumnsType<any> = [
    { 
      title: 'Student ID', 
      dataIndex: 'studentId', 
      key: 'studentId',
      width: '20%',
    },
    { 
      title: 'Student Name', 
      dataIndex: 'name', 
      key: 'name',
      width: '40%',
    },
    { 
      title: 'Status', 
      key: 'status',
      width: '40%',
      render: (_, record) => (
        <Form.Item
          name={['attendance', record.key]}
          noStyle
        >
          <Radio.Group>
            <Radio.Button value="Present">Present</Radio.Button>
            <Radio.Button value="Absent">Absent</Radio.Button>
            <Radio.Button value="Late">Late</Radio.Button>
          </Radio.Group>
        </Form.Item>
      )
    },
  ];

  return (
    <div>
      <Title level={2}>Mark Attendance</Title>
      <Card>
        <Form
          form={form}
          onFinish={handleAttendanceSubmit}
          initialValues={initialFormValues}
          layout="vertical"
        >
          <Row gutter={16} align="bottom">
            <Col>
              <Form.Item name="classId" label="Select Class" rules={[{ required: true }]}>
                <Select style={{ width: 200 }} options={teacherClasses} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="date" label="Select Date" rules={[{ required: true }]}>
                <DatePicker />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item>
                <Button onClick={handleMarkAllPresent}>Mark All as Present</Button>
              </Form.Item>
            </Col>
          </Row>

          <Table 
            columns={columns} 
            dataSource={studentsData} 
            pagination={false}
            bordered
          />

          <Form.Item style={{ marginTop: 24, textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              Submit Attendance
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AttendancePage;