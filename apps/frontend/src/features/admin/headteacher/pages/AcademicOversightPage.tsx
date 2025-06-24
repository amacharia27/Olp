import React from 'react';
import { Card, Col, Row, Statistic, Typography, Table, Progress, Tag, Space, Select } from 'antd';
import { 
  BarChartOutlined, 
  TrophyOutlined, 
  WarningOutlined, 
  UserOutlined,
  ArrowUpOutlined, 
  ArrowDownOutlined 
} from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { Title, Text, Paragraph } = Typography;

// Mock data
const academicKpis = {
  schoolAverage: 76.8,
  bestPerformingSubject: 'Science',
  worstPerformingSubject: 'Kiswahili',
  topPerformerCount: 42,
  concernCount: 22,
};

const performanceByGrade = [
  { key: '1', grade: 'Grade 1', avgScore: 82.1, topSubject: 'English', lowSubject: 'Mathematics' },
  { key: '2', grade: 'Grade 2', avgScore: 80.5, topSubject: 'Science', lowSubject: 'Kiswahili' },
  { key: '3', grade: 'Grade 3', avgScore: 78.9, topSubject: 'Mathematics', lowSubject: 'Social Studies' },
  { key: '4', grade: 'Grade 4', avgScore: 75.3, topSubject: 'English', lowSubject: 'Science' },
  { key: '5', grade: 'Grade 5', avgScore: 74.1, topSubject: 'Kiswahili', lowSubject: 'Mathematics' },
  { key: '6', grade: 'Grade 6', avgScore: 72.5, topSubject: 'Science', lowSubject: 'Social Studies' },
];

const performanceBySubject = [
  { name: 'Mathematics', average: 78 },
  { name: 'English', average: 85 },
  { name: 'Kiswahili', average: 69 },
  { name: 'Science', average: 82 },
  { name: 'Social Studies', average: 76 },
  { name: 'CRE', average: 80 },
];

const topPerformers = [
  { key: '1', name: 'Fatima Yusuf', class: 'Grade 6', average: 94.2 },
  { key: '2', name: 'John Leteipa', class: 'Grade 5', average: 93.8 },
  { key: '3', name: 'Aisha Mohammed', class: 'Grade 4', average: 91.5 },
];

const studentsOfConcern = [
  { key: '1', name: 'Brian Omondi', class: 'Grade 6', average: 51.5 },
  { key: '2', name: 'Grace Wanjiru', class: 'Grade 4', average: 55.1 },
  { key: '3', name: 'Kevin Mutua', class: 'Grade 5', average: 53.7 },
];

const AcademicOversightPage: React.FC = () => {
  // TODO: Add API calls to fetch real data
  
  const gradeColumns = [
    { 
      title: 'Grade Level', 
      dataIndex: 'grade', 
      key: 'grade',
      sorter: (a: any, b: any) => a.key.localeCompare(b.key)
    },
    { 
      title: 'Average Score', 
      dataIndex: 'avgScore', 
      key: 'avgScore',
      sorter: (a: any, b: any) => a.avgScore - b.avgScore,
      render: (score: number) => <Progress percent={score} showInfo={false} strokeColor="#52c41a" />
    },
    { 
      title: 'Trend', 
      key: 'trend',
      render: (_: any, _record: any) => {
        const trend = Math.random() > 0.5 ? (Math.random() * 5) : (Math.random() * -5);
        const isPositive = trend >= 0;
        return (
          <Text type={isPositive ? 'success' : 'danger'}>
            {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(trend).toFixed(1)}%
          </Text>
        );
      }
    },
    { 
      title: 'Top Subject', 
      dataIndex: 'topSubject', 
      key: 'topSubject',
      render: (subject: string) => <Tag color="green">{subject}</Tag>
    },
    { 
      title: 'Needs Attention', 
      dataIndex: 'lowSubject', 
      key: 'lowSubject',
      render: (subject: string) => <Tag color="red">{subject}</Tag>
    },
  ];

  const studentColumns = [
    {
      title: 'Student',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <UserOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Average',
      dataIndex: 'average',
      key: 'average',
      render: (avg: number) => (
        <Text strong style={{ color: avg >= 70 ? '#52c41a' : avg >= 50 ? '#faad14' : '#f5222d' }}>
          {avg.toFixed(1)}%
        </Text>
      ),
    },
  ];

  return (
    <div className="academic-oversight-page">
      <Title level={2}>Academic Oversight</Title>
      <Paragraph type="secondary">A high-level overview of the school's academic performance for the current term.</Paragraph>

      {/* KPI Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic 
              title="School-wide Average" 
              value={academicKpis.schoolAverage} 
              precision={1}
              suffix="%" 
              prefix={<BarChartOutlined />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic 
              title="Best Performing Subject" 
              value={academicKpis.bestPerformingSubject} 
              prefix={<TrophyOutlined style={{ color: '#faad14' }} />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic 
              title="Needs Improvement" 
              value={academicKpis.worstPerformingSubject} 
              prefix={<WarningOutlined style={{ color: '#fa8c16' }} />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic 
              title="Students of Concern" 
              value={academicKpis.concernCount} 
              valueStyle={{ color: '#f5222d' }} 
            />
          </Card>
        </Col>
      </Row>

      {/* Performance Overview */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card 
            title="Performance by Subject" 
            extra={
              <Select defaultValue="current" style={{ width: 120 }}>
                <Select.Option value="current">Current Term</Select.Option>
                <Select.Option value="previous">Previous Term</Select.Option>
                <Select.Option value="year">This Year</Select.Option>
              </Select>
            }
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={performanceBySubject}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Average Score']} />
                <Legend />
                <Bar dataKey="average" name="Average Score" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Student Performance Summary">
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Statistic 
                title="School Average Score" 
                value={academicKpis.schoolAverage} 
                precision={1}
                suffix="%" 
              />
              <Statistic 
                title="Students Performing Above 80%" 
                value="42" 
                suffix="students" 
              />
              <Statistic 
                title="Students Needing Support" 
                value={academicKpis.concernCount} 
                suffix="students" 
                valueStyle={{ color: '#f5222d' }}
              />
            </Space>
          </Card>
        </Col>
      </Row>

      {/* Grade Level Performance */}
      <Card 
        title="Grade Level Performance" 
        style={{ marginBottom: 24 }}
        extra={
          <Select defaultValue="all" style={{ width: 120 }}>
            <Select.Option value="all">All Grades</Select.Option>
            <Select.Option value="primary">Primary</Select.Option>
            <Select.Option value="jss">JSS</Select.Option>
          </Select>
        }
      >
        <Table 
          columns={gradeColumns} 
          dataSource={performanceByGrade} 
          pagination={false}
          rowKey="key"
        />
      </Card>

      {/* Student Highlights */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Top Performers">
            <Table 
              columns={studentColumns} 
              dataSource={topPerformers} 
              pagination={false}
              rowKey="key"
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Students Needing Attention">
            <Table 
              columns={studentColumns} 
              dataSource={studentsOfConcern} 
              pagination={false}
              rowKey="key"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AcademicOversightPage;