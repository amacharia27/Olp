// apps/frontend/src/features/superadmin/pages/SubscriptionBillingPage.tsx
import { Table, Typography, Tag, Input, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CheckCircleOutlined, SyncOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Paragraph } = Typography;
const { Search } = Input;

// --- MOCK DATA ---
const subscriptionData = [
  { key: '1', schoolName: 'Nairobi Primary School', status: 'Active', expires: dayjs().add(45, 'day').format('YYYY-MM-DD'), students: 1250, nextInvoice: 62500 },
  { key: '2', schoolName: 'Mombasa Academy', status: 'Active', expires: dayjs().add(20, 'day').format('YYYY-MM-DD'), students: 850, nextInvoice: 42500 },
  { key: '3', schoolName: 'Rift Valley Junior School', status: 'Expired', expires: dayjs().subtract(30, 'day').format('YYYY-MM-DD'), students: 670, nextInvoice: 33500 },
  { key: '4', schoolName: 'Kisumu Day Primary', status: 'Grace Period', expires: dayjs().add(5, 'day').format('YYYY-MM-DD'), students: 1100, nextInvoice: 55000 },
  { key: '5', schoolName: 'Nakuru Hills Academy', status: 'Pending Payment', expires: null, students: 0, nextInvoice: 0 },
];

const SubscriptionBillingPage = () => {

  const getStatusTag = (status: string) => {
    if (status === 'Active') return <Tag icon={<CheckCircleOutlined />} color="success">{status}</Tag>;
    if (status === 'Grace Period') return <Tag icon={<SyncOutlined spin />} color="processing">{status}</Tag>;
    if (status === 'Expired') return <Tag icon={<ExclamationCircleOutlined />} color="error">{status}</Tag>;
    return <Tag color="default">{status}</Tag>;
  };
  
  const columns: ColumnsType<any> = [
    { title: 'School Name', dataIndex: 'schoolName', key: 'schoolName' },
    { title: 'Subscription Status', dataIndex: 'status', key: 'status', render: getStatusTag },
    { title: 'Active Students', dataIndex: 'students', key: 'students' },
    { title: 'Next Invoice (KES)', dataIndex: 'nextInvoice', key: 'nextInvoice', render: (val) => val.toLocaleString() },
    { title: 'Subscription Expires', dataIndex: 'expires', key: 'expires' },
  ];
  
  return (
    <div>
      <Title level={2}>Subscriptions & Billing Overview</Title>
      <Paragraph type="secondary">Monitor the subscription status and upcoming renewals for all schools on the platform.</Paragraph>
      <Card>
        <Search 
          placeholder="Search by school name..." 
          style={{ marginBottom: 16, width: 300 }}
        />
        <Table columns={columns} dataSource={subscriptionData} />
      </Card>
    </div>
  );
};

export default SubscriptionBillingPage;