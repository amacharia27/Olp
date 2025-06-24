// apps/frontend/src/features/student/pages/StudentOverviewPage.tsx
import { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Statistic, List, Tag, Spin, Alert, Button, Space, Avatar } from 'antd';
import {
  BookOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  RiseOutlined,
  MessageOutlined,
  CalculatorOutlined,
  FileTextOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import { Line } from '@ant-design/charts'; // Import the chart component
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { useAuthStore } from '@/store/auth.store';
import TodayTimetable from '../components/Timetable';

const { Title, Paragraph, Text } = Typography;

// Mock data for assignments
const mockAssignments = [
  {
    id: 1,
    title: 'Math Homework',
    subject: 'Mathematics',
    dueDate: 'Tomorrow',
    priority: 'High'
  },
  {
    id: 2,
    title: 'Science Project',
    subject: 'Science',
    dueDate: 'In 3 days',
    priority: 'Medium'
  },
  {
    id: 3,
    title: 'English Essay',
    subject: 'English',
    dueDate: 'Next week',
    priority: 'Low'
  }
];

// Mock data for announcements
const mockAnnouncements = [
  {
    id: 1,
    title: 'School Closed',
    content: 'School will be closed on Friday for a public holiday.',
    type: 'warning'
  },
  {
    id: 2,
    title: 'Sports Day',
    content: 'Annual sports day will be held next month.',
    type: 'info'
  }
];

// Update interface to include the new performanceTrend data
interface DashboardSummary {
    upcomingAssignments: { title: string; subject: string; dueDate: string; }[];
    recentScores: { assessment: string; subject: string; score: string; }[];
    schoolAnnouncements: { title: string; content: string; date: string; }[];
    performanceSummary: { overallGrade: string; attendance: string; };
    performanceTrend: { term: string; score: number; }[];
}

const StudentOverviewPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const response = await api.get('/students/me/dashboard-summary');
        if (response.data.success) {
          setSummary(response.data.data);
        } else {
          throw new Error('Failed to fetch dashboard data.');
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  // Configuration for the Ant Design Chart
  const chartConfig = {
    data: summary?.performanceTrend || [],
    padding: 'auto' as const,
    xField: 'term',
    yField: 'score',
    xAxis: { tickCount: 5 },
    smooth: true,
    height: 250,
    yAxis: {
        min: 0,
        max: 100
    },
    tooltip: {
        title: (title: string) => title,
        formatter: (datum: any) => ({ name: 'Score', value: `${datum.score}%` }),
    },
  };

  if (loading) {
    return <Spin size="large" tip="Loading Dashboard..." style={{ display: 'block', marginTop: '50px' }} />;
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={2} style={{ marginBottom: 0 }}>Welcome back, {user?.firstName}!</Title>
          <Paragraph type="secondary">Here's what's happening today.</Paragraph>
        </Col>
        <Col>
          {/* --- QUICK ACTIONS SECTION --- */}
          <Space>
            <Button icon={<FileTextOutlined />} onClick={() => navigate('/assignments')}>View Assignments</Button>
            <Button icon={<MessageOutlined />} onClick={() => navigate('/messages')}>Contact Teacher</Button>
            <Button type="primary" icon={<CalculatorOutlined />} onClick={() => navigate('/performance')}>
              View Full Report
            </Button>
          </Space>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        {/* --- STATISTIC CARDS --- */}
        <Col xs={24} sm={12} md={6}>
            <Card><Statistic title="Overall Grade" value={summary?.performanceSummary.overallGrade} prefix={<RiseOutlined />} /></Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
            <Card><Statistic title="Attendance" value={summary?.performanceSummary.attendance} prefix={<CheckCircleOutlined />} /></Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
            <Card><Statistic title="Upcoming Assignments" value={summary?.upcomingAssignments.length} prefix={<CalendarOutlined />} /></Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
            <Card><Statistic title="Overdue Books" value={0} prefix={<BookOutlined />} suffix="/ 3"/></Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        {/* --- PERFORMANCE TREND CHART --- */}
        <Col xs={24} lg={16}>
          <Card title="My Performance Trend">
            {summary?.performanceTrend && <Line {...chartConfig} />}
          </Card>
        </Col>
        
        {/* --- RECENT SCORES LIST --- */}
        <Col xs={24} lg={8}>
          <Card title="Recent Scores">
            <List
                dataSource={summary?.recentScores}
                renderItem={item => (
                    <List.Item>
                    <List.Item.Meta
                        title={<Text>{item.assessment} - {item.subject}</Text>}
                    />
                    <Tag color="blue" style={{fontSize: '14px', padding: '4px 8px'}}>{item.score}</Tag>
                    </List.Item>
                )}
            />
          </Card>
        </Col>
      </Row>
      
      {/* --- ANNOUNCEMENTS & ASSIGNMENTS --- */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        {/* Column 1: Upcoming Assignments */}
        <Col xs={24} lg={8}>
          <Card title="Upcoming Assignments">
            <List
              itemLayout="horizontal"
              dataSource={mockAssignments}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<SolutionOutlined />} style={{ backgroundColor: '#1890ff' }} />}
                    title={<a href="#">{item.title}</a>}
                    description={`Subject: ${item.subject} | Due in: ${item.dueDate}`}
                  />
                  <div>
                    <Tag color={item.priority === 'High' ? 'volcano' : item.priority === 'Medium' ? 'gold' : 'green'}>
                      {item.priority}
                    </Tag>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Column 2: Today's Timetable (NEW) */}
        <Col xs={24} lg={8}>
          <TodayTimetable />
        </Col>
        
        {/* Column 3: Recent Announcements */}
        <Col xs={24} lg={8}>
          <Card title="Recent Announcements">
            <Space direction="vertical" style={{ width: '100%' }}>
              {mockAnnouncements.map(ann => (
                <Alert
                  key={ann.id}
                  message={ann.title}
                  description={ann.content}
                  type={ann.type as 'info' | 'warning'}
                  showIcon
                />
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StudentOverviewPage;