import React, { useState, useEffect } from 'react';
import { 
  Typography, Card, Tabs, Table, Tag, Button, Space, 
  DatePicker, Select, Input, Row, Col, Statistic, 
  Badge, Spin, Alert, Modal, Form, Radio
} from 'antd';
import { 
  UserOutlined, TeamOutlined, CalendarOutlined, 
  CheckCircleOutlined, CloseCircleOutlined, 
  ExclamationCircleOutlined, SearchOutlined,
  DownloadOutlined, FilterOutlined, PieChartOutlined
} from '@ant-design/icons';
import type { TabsProps } from 'antd';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

// Mock data for staff attendance
const staffAttendanceData = [
  {
    id: '1',
    name: 'John Smith',
    employeeId: 'EMP001',
    department: 'Mathematics',
    date: '2025-06-23',
    checkIn: '07:45 AM',
    checkOut: '04:15 PM',
    status: 'present',
    reason: '',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    employeeId: 'EMP002',
    department: 'English',
    date: '2025-06-23',
    checkIn: '07:50 AM',
    checkOut: '04:00 PM',
    status: 'present',
    reason: '',
  },
  {
    id: '3',
    name: 'Michael Brown',
    employeeId: 'EMP003',
    department: 'Science',
    date: '2025-06-23',
    checkIn: '',
    checkOut: '',
    status: 'absent',
    reason: 'Sick leave',
  },
  {
    id: '4',
    name: 'Emily Davis',
    employeeId: 'EMP004',
    department: 'Social Studies',
    date: '2025-06-23',
    checkIn: '08:15 AM',
    checkOut: '04:05 PM',
    status: 'late',
    reason: 'Traffic',
  },
  {
    id: '5',
    name: 'David Wilson',
    employeeId: 'EMP005',
    department: 'Physical Education',
    date: '2025-06-23',
    checkIn: '07:30 AM',
    checkOut: '04:00 PM',
    status: 'present',
    reason: '',
  },
];

// Mock data for student attendance
const studentAttendanceData = [
  {
    id: '1',
    name: 'Alice Johnson',
    admissionNumber: 'ADM001',
    class: 'Grade 8A',
    date: '2025-06-23',
    status: 'present',
    reason: '',
  },
  {
    id: '2',
    name: 'Bob Smith',
    admissionNumber: 'ADM002',
    class: 'Grade 8A',
    date: '2025-06-23',
    status: 'absent',
    reason: 'Sick',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    admissionNumber: 'ADM003',
    class: 'Grade 8A',
    date: '2025-06-23',
    status: 'present',
    reason: '',
  },
  {
    id: '4',
    name: 'Diana Miller',
    admissionNumber: 'ADM004',
    class: 'Grade 8B',
    date: '2025-06-23',
    status: 'late',
    reason: 'Family emergency',
  },
  {
    id: '5',
    name: 'Edward Wilson',
    admissionNumber: 'ADM005',
    class: 'Grade 8B',
    date: '2025-06-23',
    status: 'present',
    reason: '',
  },
];

// Mock data for classes
const classes = [
  { id: '1', name: 'Grade 8A' },
  { id: '2', name: 'Grade 8B' },
  { id: '3', name: 'Grade 9A' },
  { id: '4', name: 'Grade 9B' },
  { id: '5', name: 'Grade 10A' },
  { id: '6', name: 'Grade 10B' },
];

// Mock data for departments
const departments = [
  { id: '1', name: 'Mathematics' },
  { id: '2', name: 'English' },
  { id: '3', name: 'Science' },
  { id: '4', name: 'Social Studies' },
  { id: '5', name: 'Physical Education' },
];

const DeputyAttendancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('staff');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<any>(null);
  const [form] = Form.useForm();

  // Load data on component mount
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Handle status change
  const handleStatusChange = (record: any) => {
    setCurrentRecord(record);
    form.setFieldsValue({
      status: record.status,
      reason: record.reason,
    });
    setIsModalVisible(true);
  };

  // Handle modal submit
  const handleModalSubmit = () => {
    form.validateFields().then(values => {
      console.log('Updated record:', { ...currentRecord, ...values });
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  // Staff attendance columns
  const staffColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Check In',
      dataIndex: 'checkIn',
      key: 'checkIn',
    },
    {
      title: 'Check Out',
      dataIndex: 'checkOut',
      key: 'checkOut',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'green';
        let icon = <CheckCircleOutlined />;
        
        if (status === 'absent') {
          color = 'red';
          icon = <CloseCircleOutlined />;
        } else if (status === 'late') {
          color = 'orange';
          icon = <ExclamationCircleOutlined />;
        }
        
        return (
          <Tag color={color} icon={icon}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => handleStatusChange(record)}>
          Update Status
        </Button>
      ),
    },
  ];

  // Student attendance columns
  const studentColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Admission Number',
      dataIndex: 'admissionNumber',
      key: 'admissionNumber',
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'green';
        let icon = <CheckCircleOutlined />;
        
        if (status === 'absent') {
          color = 'red';
          icon = <CloseCircleOutlined />;
        } else if (status === 'late') {
          color = 'orange';
          icon = <ExclamationCircleOutlined />;
        }
        
        return (
          <Tag color={color} icon={icon}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => handleStatusChange(record)}>
          Update Status
        </Button>
      ),
    },
  ];

  // Calculate statistics
  const calculateStats = (data: any[], type: string) => {
    const total = data.length;
    const present = data.filter(item => item.status === 'present').length;
    const absent = data.filter(item => item.status === 'absent').length;
    const late = data.filter(item => item.status === 'late').length;
    
    const presentPercentage = Math.round((present / total) * 100);
    const absentPercentage = Math.round((absent / total) * 100);
    const latePercentage = Math.round((late / total) * 100);
    
    return (
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic
              title={`Total ${type}`}
              value={total}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Present"
              value={present}
              suffix={`/ ${total}`}
              valueStyle={{ color: '#3f8600' }}
              prefix={<CheckCircleOutlined />}
            />
            <Text type="secondary">{presentPercentage}%</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Absent"
              value={absent}
              suffix={`/ ${total}`}
              valueStyle={{ color: '#cf1322' }}
              prefix={<CloseCircleOutlined />}
            />
            <Text type="secondary">{absentPercentage}%</Text>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Late"
              value={late}
              suffix={`/ ${total}`}
              valueStyle={{ color: '#faad14' }}
              prefix={<ExclamationCircleOutlined />}
            />
            <Text type="secondary">{latePercentage}%</Text>
          </Card>
        </Col>
      </Row>
    );
  };

  // Filter controls for staff
  const renderStaffFilters = () => (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      <Col span={6}>
        <DatePicker
          value={selectedDate}
          onChange={date => setSelectedDate(date || dayjs())}
          style={{ width: '100%' }}
        />
      </Col>
      <Col span={6}>
        <Select
          placeholder="Select Department"
          style={{ width: '100%' }}
          onChange={value => setSelectedDepartment(value)}
          allowClear
        >
          {departments.map(dept => (
            <Option key={dept.id} value={dept.name}>
              {dept.name}
            </Option>
          ))}
        </Select>
      </Col>
      <Col span={6}>
        <Input
          placeholder="Search by name or ID"
          prefix={<SearchOutlined />}
          onChange={e => setSearchText(e.target.value)}
        />
      </Col>
      <Col span={6}>
        <Space>
          <Button icon={<DownloadOutlined />}>Export</Button>
          <Button icon={<PieChartOutlined />}>Reports</Button>
        </Space>
      </Col>
    </Row>
  );

  // Filter controls for students
  const renderStudentFilters = () => (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      <Col span={6}>
        <DatePicker
          value={selectedDate}
          onChange={date => setSelectedDate(date || dayjs())}
          style={{ width: '100%' }}
        />
      </Col>
      <Col span={6}>
        <Select
          placeholder="Select Class"
          style={{ width: '100%' }}
          onChange={value => setSelectedClass(value)}
          allowClear
        >
          {classes.map(cls => (
            <Option key={cls.id} value={cls.name}>
              {cls.name}
            </Option>
          ))}
        </Select>
      </Col>
      <Col span={6}>
        <Input
          placeholder="Search by name or admission number"
          prefix={<SearchOutlined />}
          onChange={e => setSearchText(e.target.value)}
        />
      </Col>
      <Col span={6}>
        <Space>
          <Button icon={<DownloadOutlined />}>Export</Button>
          <Button icon={<PieChartOutlined />}>Reports</Button>
        </Space>
      </Col>
    </Row>
  );

  // Tab items
  const items: TabsProps['items'] = [
    {
      key: 'staff',
      label: (
        <span>
          <UserOutlined />
          Staff Attendance
        </span>
      ),
      children: (
        <>
          {calculateStats(staffAttendanceData, 'Staff')}
          <div style={{ marginTop: 24 }}>
            {renderStaffFilters()}
            <Table
              columns={staffColumns}
              dataSource={staffAttendanceData}
              rowKey="id"
              loading={loading}
            />
          </div>
        </>
      ),
    },
    {
      key: 'students',
      label: (
        <span>
          <TeamOutlined />
          Student Attendance
        </span>
      ),
      children: (
        <>
          {calculateStats(studentAttendanceData, 'Students')}
          <div style={{ marginTop: 24 }}>
            {renderStudentFilters()}
            <Table
              columns={studentColumns}
              dataSource={studentAttendanceData}
              rowKey="id"
              loading={loading}
            />
          </div>
        </>
      ),
    },
    {
      key: 'reports',
      label: (
        <span>
          <CalendarOutlined />
          Attendance Reports
        </span>
      ),
      children: (
        <div style={{ padding: '20px 0' }}>
          <Alert
            message="Reports Feature"
            description="Detailed attendance reports and analytics will be available here. This feature is coming soon."
            type="info"
            showIcon
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Attendance Management</Title>
        <Text type="secondary">
          Monitor and manage staff and student attendance records. Update attendance status, view reports, and export data.
        </Text>
      </div>

      <Card>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab} 
          items={items}
        />
      </Card>

      <Modal
        title="Update Attendance Status"
        open={isModalVisible}
        onOk={handleModalSubmit}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="status"
            label="Attendance Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Radio.Group>
              <Radio value="present">Present</Radio>
              <Radio value="absent">Absent</Radio>
              <Radio value="late">Late</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="reason"
            label="Reason (if absent or late)"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeputyAttendancePage;