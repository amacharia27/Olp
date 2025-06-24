// apps/frontend/src/features/superadmin/pages/AuditLogsPage.tsx
import { Card, Table, Typography, Input, Space, DatePicker, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title, Paragraph } = Typography;
const { Search } = Input;

// --- MOCK DATA ---
const auditLogData = [
  { key: '1', timestamp: '2023-10-27 10:15:22', user: 'superadmin@olp.system', ip: '192.168.1.1', action: 'APPROVE_SCHOOL', entity: 'School', entityId: 'NHA-001', details: 'School "Nakuru Hills Academy" was approved.' },
  { key: '2', timestamp: '2023-10-27 09:30:11', user: 'ht.mwangi@nps.school', ip: '41.204.16.8', action: 'DEACTIVATE_USER', entity: 'User', entityId: 'TR-00045', details: 'User account for "John Smith" was deactivated.' },
  { key: '3', timestamp: '2023-10-26 15:45:05', user: 'finance@nps.school', ip: '41.204.16.9', action: 'RECORD_PAYMENT', entity: 'Transaction', entityId: 'TRX-98765', details: 'Recorded payment of KES 25,000 for student ST-00123.' },
  { key: '4', timestamp: '2023-10-26 11:20:54', user: 'superadmin@olp.system', ip: '192.168.1.1', action: 'UPDATE_SETTING', entity: 'System', entityId: 'Billing', details: 'Changed costPerStudent from 50 to 55.' },
];

const AuditLogsPage = () => {
  const columns: ColumnsType<any> = [
    { title: 'Timestamp', dataIndex: 'timestamp', key: 'timestamp', width: 180 },
    { title: 'User/Actor', dataIndex: 'user', key: 'user' },
    { title: 'Action', dataIndex: 'action', key: 'action', render: (text) => <code>{text}</code> },
    { title: 'Entity', dataIndex: 'entityId', key: 'entityId', render: (text, record) => `${record.entity} (${text})`},
    { title: 'Details', dataIndex: 'details', key: 'details'},
  ];

  return (
    <div>
      <Title level={2}>System Audit Logs</Title>
      <Paragraph type="secondary">A chronological log of all important administrative actions performed on the system.</Paragraph>
      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Search placeholder="Search by user or details" style={{ width: 300 }} />
          <Select placeholder="Filter by action..." style={{ width: 180 }} allowClear>
            <Select.Option value="APPROVE_SCHOOL">APPROVE_SCHOOL</Select.Option>
            <Select.Option value="DEACTIVATE_USER">DEACTIVATE_USER</Select.Option>
            <Select.Option value="UPDATE_SETTING">UPDATE_SETTING</Select.Option>
          </Select>
          <DatePicker.RangePicker />
        </Space>
        <Table columns={columns} dataSource={auditLogData} />
      </Card>
    </div>
  );
};

export default AuditLogsPage;