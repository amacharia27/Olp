// apps/frontend/src/features/admin/headteacher/pages/SchoolDashboardPage.tsx
import {
  Card, Col, Row, Statistic, Typography, Button, Space, List, Tag, Avatar
} from 'antd';
import {
  TeamOutlined, RiseOutlined, ArrowUpOutlined, DollarCircleOutlined, UserAddOutlined, BellOutlined
} from '@ant-design/icons';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuthStore } from '@/store/auth.store';
import { useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

// --- MOCK DATA to match the design ---
const enrollmentData = [
  { year: '2021', students: 700 },
  { year: '2022', students: 1050 },
  { year: '2023', students: 1250 },
];

const attentionItems = [
    { key: '1', text: '3 Teacher accounts are pending approval', type: 'Approval', url: '/student-admin' },
    { key: '2', text: 'Term 1 Science grades for Grade 6 are overdue', type: 'Academics', url: '/academic-oversight' },
    { key: '3', text: 'Subscription renewal is due in 15 days', type: 'Billing', url: '#' },
];
// --- END MOCK DATA ---


const SchoolDashboardPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    // The main container has a light grey background to match the design
    <div style={{ background: '#f8f9fa', padding: '24px', borderRadius: '8px' }}>
      
      {/* Top Header Row */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2} style={{ margin: 0, fontWeight: 600 }}>Welcome, Headteacher {user?.lastName}!</Title>
          <Paragraph type="secondary" style={{ margin: 0 }}>Here's the pulse of Nairobi Primary School today.</Paragraph>
        </Col>
        <Col>
          <Button 
           type="primary" 
           icon={<UserAddOutlined />} 
           size="large"
           onClick={() => navigate('/staff-management')} 
           style={{ borderRadius: '8px', fontWeight: 500 }}
>
           Onboard New Staff
          </Button>
        </Col>
      </Row>

      {/* Statistic Cards Row */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title={<Text type="secondary">Total Enrollment</Text>}
              value={1250}
              valueStyle={{ color: '#28a745', fontWeight: 600, fontSize: '24px' }}
              prefix={<ArrowUpOutlined />}
              suffix="students"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title={<Text type="secondary">Today's Attendance</Text>}
              value={96.5}
              precision={1}
              valueStyle={{ color: '#00529B', fontWeight: 600, fontSize: '24px' }}
              prefix={<RiseOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
             <Statistic
              title={<Text type="secondary">Staff on Duty</Text>}
              value={75}
              valueStyle={{ fontWeight: 600, fontSize: '24px' }}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false}>
            <Statistic
              title={<Text type="secondary">Term Fees Collected</Text>}
              value={87}
              valueStyle={{ fontWeight: 600, fontSize: '24px' }}
              prefix={<DollarCircleOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content Area: Chart and Needs Attention List */}
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card title={<Title level={4} style={{margin:0}}>Enrollment Trend</Title>} bordered={false}>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={enrollmentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00529B" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00529B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="#888" />
                <YAxis stroke="#888" />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip />
                <Area type="monotone" dataKey="students" stroke="#00529B" strokeWidth={2} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title={<Title level={4} style={{margin:0}}>Needs Attention</Title>} bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={attentionItems}
              renderItem={(item) => (
                <List.Item actions={[<Button type="link" onClick={() => navigate(item.url)}>View</Button>]}>
                  <List.Item.Meta
                    avatar={<Avatar icon={<BellOutlined />} style={{backgroundColor: '#fff2f0', color: '#ff4d4f'}}/>}
                    title={<a onClick={() => navigate(item.url)} style={{fontWeight: 500}}>{item.text}</a>}
                    description={<Tag>{item.type}</Tag>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SchoolDashboardPage;