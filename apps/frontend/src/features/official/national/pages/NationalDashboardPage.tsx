// apps/frontend/src/features/official/national/pages/NationalDashboardPage.tsx
import { Card, Col, Row, Statistic, Typography, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GlobalOutlined, TeamOutlined, RiseOutlined, BankOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// --- MOCK DATA ---
const nationalStats = {
    totalCounties: 47,
    totalSchools: 22540,
    totalStudents: 10567890,
    nationalAverage: 71.5,
};

const countyPerformanceData = [
  { name: 'Nairobi', avg: 76.2 }, { name: 'Mombasa', avg: 74.8 }, { name: 'Kiambu', avg: 73.5 },
  { name: 'Kisumu', avg: 72.1 }, { name: 'Nakuru', avg: 71.9 }, { name: 'Uasin Gishu', avg: 71.2 },
  { name: 'Kajiado', avg: 70.8 }, { name: 'Garissa', avg: 61.2 }, { name: 'Turkana', avg: 59.8 },
  { name: 'Wajir', avg: 58.1 },
];

const NationalDashboardPage = () => {

  const countyColumns: ColumnsType<any> = [
    { title: 'County', dataIndex: 'name', key: 'name' },
    { 
        title: 'Average Score (%)', 
        dataIndex: 'avg', 
        key: 'avg',
        sorter: (a,b) => a.avg - b.avg,
        defaultSortOrder: 'descend',
    },
    // In a real app, you'd add more columns like student count, teacher ratio, etc.
  ];
  
  const topCounties = [...countyPerformanceData].sort((a,b) => b.avg - a.avg).slice(0, 5);
  const bottomCounties = [...countyPerformanceData].sort((a,b) => a.avg - b.avg).slice(0, 5);

  return (
    <div>
      <Title level={2}>National Education Dashboard</Title>
      <Paragraph type="secondary">A cumulative performance overview of all counties in the Republic of Kenya.</Paragraph>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="Total Counties" value={nationalStats.totalCounties} prefix={<GlobalOutlined />} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="Total Schools Monitored" value={nationalStats.totalSchools} formatter={(val) => val.toLocaleString()} prefix={<BankOutlined />} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="Total Students Monitored" value={nationalStats.totalStudents} prefix={<TeamOutlined />} formatter={(val) => (val as number / 1000000).toFixed(2) + 'M'} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="National Average Score" value={nationalStats.nationalAverage} suffix="%" prefix={<RiseOutlined />} /></Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Top 5 Performing Counties">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCounties} layout="vertical" margin={{left: 20}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip />
                <Bar dataKey="avg" name="Average Score" fill="#3f8600" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Bottom 5 Performing Counties">
             <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bottomCounties} layout="vertical" margin={{left: 20}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip />
                <Bar dataKey="avg" name="Average Score" fill="#cf1322" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Card title="All County Rankings" style={{marginTop: 24}}>
          <Table columns={countyColumns} dataSource={countyPerformanceData} rowKey="name" />
      </Card>

    </div>
  );
};

export default NationalDashboardPage;