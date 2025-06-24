// apps/frontend/src/features/teacher/pages/TeacherDashboardPage.tsx
import {
  Card, Col, Row, Statistic, Typography, Button, Space, List
} from 'antd';
import {
  PlusOutlined, EditOutlined, TeamOutlined, BarChartOutlined, CheckSquareOutlined
} from '@ant-design/icons';
import { useAuthStore } from '@/store/auth.store';
import { useNavigate } from 'react-router-dom';
import ClassPerformanceChart from '@/features/teacher/components/ClassPerformanceChart'; // Import our new chart

const { Title, Text } = Typography;

// --- MOCK DATA ---
const mockStats = {
  activeClass: 'Grade 6 - Eagles',
  studentCount: 32,
  assignmentsToGrade: 2,
  averagePerformance: 78.5,
};

const performanceChartData = [
    { name: 'Math', 'Needs Attention': 4, 'On Target': 20, 'Exceeding': 8 },
    { name: 'English', 'Needs Attention': 2, 'On Target': 25, 'Exceeding': 5 },
    { name: 'Science', 'Needs Attention': 5, 'On Target': 18, 'Exceeding': 9 },
];

const recentActivityData = [
  { text: 'You posted a new assignment: "Algebra II Worksheet"', time: '2h ago' },
  { text: 'Asha Kimani submitted her "Photosynthesis Lab Report"', time: '5h ago' },
  { text: 'You finished grading "Term 1 CAT 1" for Science', time: 'Yesterday' },
  { text: 'A new student, Samuel Leteipa, was enrolled in your class', time: '2 days ago' },
];
// --- END MOCK DATA ---

const TeacherDashboardPage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // TODO: Replace with a useEffect hook to fetch all overview data
  // e.g., GET /api/v1/teacher/dashboard-overview

  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={2}>Welcome, {user?.firstName}!</Title>
          <Text type="secondary">Here is your dashboard overview for today.</Text>
        </Col>
        <Col>
          <Space>
            <Button icon={<PlusOutlined />} onClick={() => navigate('/grading')}>New Assessment</Button>
            <Button type="primary" icon={<EditOutlined />} onClick={() => navigate('/attendance')}>Take Attendance</Button>
          </Space>
        </Col>
      </Row>

      {/* Statistic Cards */}
      <Row gutter={[16, 16]} style={{ marginTop: 24, marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Active Class" value={mockStats.activeClass} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Students" value={mockStats.studentCount} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Avg. Performance"
              value={mockStats.averagePerformance}
              precision={1}
              prefix={<BarChartOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Needs Grading"
              value={mockStats.assignmentsToGrade}
              valueStyle={{ color: '#cf1322' }}
              prefix={<CheckSquareOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content: Chart and Activity Feed */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <ClassPerformanceChart
            title="Class Performance Overview (Grade 6 - Eagles)"
            data={performanceChartData}
          />
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Recent Activity">
            <List
              dataSource={recentActivityData}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={<Text>{item.text}</Text>}
                    description={item.time}
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

export default TeacherDashboardPage;