// apps/frontend/src/features/official/subcounty/pages/SubCountyDashboardPage.tsx
import { Card, Col, Row, Statistic, Typography, Table, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BankOutlined, TeamOutlined, RiseOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// --- MOCK DATA ---
const subCountyPerformance = [
  { name: 'Nairobi Primary', avg: 82.1 },
  { name: 'Westlands Primary', avg: 79.5 },
  { name: 'Lavington Primary', avg: 78.8 },
  { name: 'Kasarani Academy', avg: 75.2 },
  { name: 'Starehe Junior', avg: 74.9 },
  { name: 'Makini School', avg: 85.3 },
];

const subjectPerformance = [
  { subject: 'Mathematics', avg: 75 },
  { subject: 'English', avg: 82 },
  { subject: 'Science', avg: 81 },
  { subject: 'Kiswahili', avg: 72 },
  { subject: 'Social Studies', avg: 79 },
];

const SubCountyDashboardPage = () => {

  const schoolColumns: ColumnsType<any> = [
    { title: 'School Name', dataIndex: 'name', key: 'name', sorter: (a,b) => a.name.localeCompare(b.name) },
    { title: 'Average Score (%)', dataIndex: 'avg', key: 'avg', sorter: (a,b) => a.avg - b.avg, defaultSortOrder: 'descend'},
  ];

  return (
    <div>
      <Title level={2}>Dagoretti Sub-county Dashboard</Title>
      <Paragraph type="secondary">An aggregated overview of all schools within this sub-county.</Paragraph>
      
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="Total Schools" value={25} prefix={<BankOutlined />} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="Total Students" value={35240} prefix={<TeamOutlined />} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="Sub-county Average" value={79.3} suffix="%" prefix={<RiseOutlined />} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
           <Card>
            <Typography.Text strong>Filter by Academic Year</Typography.Text><br/>
            <Select defaultValue="2023" style={{width: '100%', marginTop: '8px'}}>
                <Select.Option value="2023">2023</Select.Option>
                <Select.Option value="2022">2022</Select.Option>
            </Select>
           </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Average Performance by School">
             <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subCountyPerformance} layout="vertical" margin={{left: 30}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" width={120} />
                <Tooltip />
                <Bar dataKey="avg" name="Average Score" fill="#00529B" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Average Performance by Subject">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="avg" name="Average Score" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Card title="School Ranking" style={{marginTop: 24}}>
          <Table columns={schoolColumns} dataSource={subCountyPerformance} rowKey="name" />
      </Card>

    </div>
  );
};

export default SubCountyDashboardPage;