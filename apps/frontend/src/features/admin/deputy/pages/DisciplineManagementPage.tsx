// apps/frontend/src/features/admin/deputy/pages/DisciplineManagementPage.tsx
import {
  Card, Table, Typography, Button, Space, Tag, Tabs, Input, Select
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { WarningOutlined, CheckCircleOutlined, TrophyOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Search } = Input;

// --- MOCK DATA ---
const disciplineRecords = [
  { key: '1', student: 'Brian Omondi (ST-00124)', class: 'Grade 6', type: 'Major Infraction', details: 'Bullying a Grade 4 student.', reportedBy: 'Mr. Otieno', date: '2023-10-26', status: 'Action Required' },
  { key: '2', student: 'Asha Kimani (ST-00123)', class: 'Grade 6', type: 'Positive Conduct', details: 'Helped a new student feel welcome.', reportedBy: 'Ms. Were', date: '2023-10-25', status: 'Closed' },
  { key: '3', student: 'Grace Wanjiru (ST-00130)', class: 'Grade 4', type: 'Minor Infraction', details: 'Repeatedly late for class.', reportedBy: 'Ms. Wanjiku', date: '2023-10-24', status: 'Action Taken' },
  { key: '4', student: 'David Mwangi (ST-00126)', class: 'Grade 6', type: 'Major Infraction', details: 'Skipped afternoon classes.', reportedBy: 'Mr. Otieno', date: '2023-10-23', status: 'Closed' },
];

const DisciplineManagementPage = () => {
  // TODO: Add state and API calls

  const getIconAndColor = (type: string) => {
    if (type === 'Major Infraction') return { icon: <WarningOutlined />, color: 'volcano' };
    if (type === 'Minor Infraction') return { icon: <WarningOutlined />, color: 'gold' };
    if (type === 'Positive Conduct') return { icon: <TrophyOutlined />, color: 'green' };
    return { icon: null, color: 'default' };
  };

  const columns: ColumnsType<any> = [
    { title: 'Student', dataIndex: 'student', key: 'student' },
    { title: 'Class', dataIndex: 'class', key: 'class' },
    { 
      title: 'Incident Type', 
      dataIndex: 'type', 
      key: 'type',
      render: (type) => {
        const { icon, color } = getIconAndColor(type);
        return <Tag icon={icon} color={color}>{type}</Tag>;
      }
    },
    { title: 'Details', dataIndex: 'details', key: 'details', ellipsis: true },
    { title: 'Reported By', dataIndex: 'reportedBy', key: 'reportedBy' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => <Tag color={status === 'Action Required' ? 'red' : 'default'}>{status}</Tag> },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => <Button size="small">View / Manage</Button>
    },
  ];

  return (
    <div>
      <Title level={2}>Discipline Management</Title>
      <Paragraph type="secondary">Oversee all student conduct records. Use the filters to narrow down incidents.</Paragraph>
      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Search placeholder="Search by student name or ID" style={{ width: 300 }} />
          <Select defaultValue="all" style={{ width: 180 }}>
            <Select.Option value="all">All Incident Types</Select.Option>
            <Select.Option value="major">Major Infractions</Select.Option>
            <Select.Option value="minor">Minor Infractions</Select.Option>
            <Select.Option value="positive">Positive Conduct</Select.Option>
          </Select>
          <Select defaultValue="all_status" style={{ width: 180 }}>
            <Select.Option value="all_status">All Statuses</Select.Option>
            <Select.Option value="action_required">Action Required</Select.Option>
            <Select.Option value="closed">Closed</Select.Option>
          </Select>
        </Space>
        <Table columns={columns} dataSource={disciplineRecords} />
      </Card>
    </div>
  );
};

export default DisciplineManagementPage;