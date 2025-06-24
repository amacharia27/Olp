// apps/frontend/src/features/teacher/pages/ClassManagementPage.tsx
import { useState } from 'react';
import {
  Table, Input, Typography, Button, Space, Select, Avatar, Tag, Dropdown, Card, Row, Col
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  UserOutlined, MailOutlined, PhoneOutlined, MoreOutlined, UserAddOutlined,SafetyCertificateOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;

// --- MOCK DATA ---
const teacherClasses = [
  { value: 'class_6A', label: 'Grade 6 - Eagles' },
  { value: 'class_6B', label: 'Grade 6 - Falcons' },
  { value: 'class_5C', label: 'Grade 5 - Lions' },
];

const studentsData: Record<string, any[]> = {
  'class_6A': [
    { key: '1', studentId: 'ST-00123', name: 'Asha Kimani', parentName: 'Jane Kimani', parentContact: '0722000111', status: 'Active' },
    { key: '2', studentId: 'ST-00124', name: 'Brian Omondi', parentName: 'Mary Omondi', parentContact: '0711222333', status: 'Active' },
    { key: '3', studentId: 'ST-00125', name: 'Fatima Yusuf', parentName: 'Ali Yusuf', parentContact: '0733444555', status: 'Suspended' },
    { key: '4', studentId: 'ST-00126', name: 'David Mwangi', parentName: 'Grace Mwangi', parentContact: '0744555666', status: 'Active' },
  ],
  'class_6B': [
    { key: '5', studentId: 'ST-00130', name: 'Grace Wanjiru', parentName: 'Peter Wanjiru', parentContact: '0755111222', status: 'Active' },
    { key: '6', studentId: 'ST-00131', name: 'Samuel Leteipa', parentName: 'Naserian Leteipa', parentContact: '0766333444', status: 'Active' },
  ],
  'class_5C': [
    { key: '7', studentId: 'ST-00145', name: 'Christine Achieng', parentName: 'Joseph Achieng', parentContact: '0777444555', status: 'Active' },
  ],
};

const ClassManagementPage = () => {
  const [selectedClass, setSelectedClass] = useState('class_6A');
  const [filteredStudents, setFilteredStudents] = useState(studentsData[selectedClass]);

  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    setFilteredStudents(studentsData[value] || []);
    // TODO: In real app, this would trigger an API call: GET /api/v1/classes/${value}/students
  };

  const handleSearch = (value: string) => {
    const filtered = studentsData[selectedClass].filter(student =>
      student.name.toLowerCase().includes(value.toLowerCase()) ||
      student.studentId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  // Record type for student data
  interface StudentRecord {
    key: string;
    name: string;
    studentId: string;
    parentName: string;
    parentContact: string;
    status: string;
  }

  // @ts-ignore - record will be used in future implementation
 // in ClassManagementPage.tsx
 const dropdownMenu = (record: any) => ({
  items: [
    { key: '1', label: 'View Full Profile', icon: <UserOutlined /> },
    { key: '2', label: 'Message Parent', icon: <MailOutlined /> },
    { key: '3', label: 'Record Disciplinary Note', icon: <SafetyCertificateOutlined />, danger: true }, // Updated icon and danger prop
  ],
  // Add an onClick handler to trigger a modal
  // onClick: (e) => handleMenuClick(e, record)
});
  const columns: ColumnsType<any> = [
    {
      title: 'Student Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    { title: 'Student ID', dataIndex: 'studentId', key: 'studentId' },
    { title: 'Parent/Guardian', dataIndex: 'parentName', key: 'parentName' },
    { title: 'Parent Contact', dataIndex: 'parentContact', key: 'parentContact' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'green' : 'volcano'}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Dropdown menu={dropdownMenu(record)} trigger={['click']}>
          <Button icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Class Management</Title>
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col xs={24} md={12}>
            <Space>
              <Text>Select Class:</Text>
              <Select
                style={{ width: 200 }}
                options={teacherClasses}
                value={selectedClass}
                onChange={handleClassChange}
              />
            </Space>
          </Col>
          <Col xs={24} md={12} style={{ textAlign: 'right', marginTop: '10px' }}>
            <Button type="primary" icon={<UserAddOutlined />}>
              Enroll New Student
            </Button>
          </Col>
        </Row>
        <Search
          placeholder="Search for a student by name or ID..."
          onSearch={handleSearch}
          style={{ marginBottom: 16 }}
          enterButton
        />
        <Table
          columns={columns}
          dataSource={filteredStudents}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
};

export default ClassManagementPage;