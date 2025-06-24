import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Statistic, Space, Skeleton, Progress } from 'antd';
import { 
  TeamOutlined, 
  UserOutlined, 
  CheckCircleOutlined,
  CalendarOutlined,
  DollarOutlined
} from '@ant-design/icons';
import MetricCard from '../components/MetricCard';
import UpcomingEvents from '../components/UpcomingEvents';
import TeacherPerformance from '../components/TeacherPerformance';
import StudentPerformance from '../components/StudentPerformance';
import QuickActions from '../components/QuickActions';

const { Title, Text } = Typography;

// Mock data for metrics
interface SchoolMetrics {
  totalStudents: number;
  totalTeachers: number;
  attendanceRate: number;
  pendingTasks: number;
  budgetUtilization: number;
  lastUpdated: string;
}

const fetchMetrics = (): SchoolMetrics => ({
  totalStudents: 1245,
  totalTeachers: 45,
  attendanceRate: 94.5,
  pendingTasks: 7,
  budgetUtilization: 68,
  lastUpdated: new Date().toISOString()
});

const DeputyDashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<SchoolMetrics | null>(null);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setMetrics(fetchMetrics());
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <div className="deputy-dashboard">
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ marginBottom: 8 }}>Deputy Head Dashboard</Title>
        <Text type="secondary">
          Welcome back! Here's what's happening with your school today.
          {metrics && ` Last updated: ${new Date(metrics.lastUpdated).toLocaleString()}`}
        </Text>
      </div>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <MetricCard 
            title="Total Students" 
            value={metrics?.totalStudents?.toLocaleString() || '0'}
            change={2.5}
            icon={<TeamOutlined />}
            color="#1890ff"
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <MetricCard 
            title="Teaching Staff" 
            value={metrics?.totalTeachers?.toString() || '0'}
            change={0}
            icon={<UserOutlined />}
            color="#722ed1"
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <MetricCard 
            title="Attendance Rate" 
            value={`${metrics?.attendanceRate || 0}%`}
            change={1.2}
            icon={<CheckCircleOutlined />}
            color="#52c41a"
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <MetricCard 
            title="Pending Tasks" 
            value={metrics?.pendingTasks?.toString() || '0'}
            change={-3}
            icon={<CalendarOutlined />}
            color={(metrics?.pendingTasks || 0) > 5 ? "#f5222d" : "#faad14"}
          />
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[16, 16]}>
        {/* Left Column */}
        <Col xs={24} lg={16}>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={24}>
              <QuickActions />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <StudentPerformance />
            </Col>
          </Row>
        </Col>

        {/* Right Column */}
        <Col xs={24} lg={8}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <UpcomingEvents />
            </Col>
            <Col span={24}>
              <TeacherPerformance />
            </Col>
            <Col span={24}>
              <Card>
                <Statistic
                  title={
                    <Space>
                      <DollarOutlined />
                      <span>Budget Utilization</span>
                    </Space>
                  }
                  value={metrics?.budgetUtilization || 0}
                  suffix="%"
                  valueStyle={{ 
                    color: (metrics?.budgetUtilization || 0) > 75 ? '#f5222d' : 
                           (metrics?.budgetUtilization || 0) > 50 ? '#faad14' : '#52c41a' 
                  }}
                />
                <div style={{ marginTop: 16 }}>
                  <Progress 
                    percent={metrics?.budgetUtilization || 0} 
                    status={(metrics?.budgetUtilization || 0) > 90 ? 'exception' : 'normal'}
                    success={{
                      percent: (metrics?.budgetUtilization || 0) <= 90 && (metrics?.budgetUtilization || 0) > 75 ? (metrics?.budgetUtilization || 0) : undefined,
                      strokeColor: (metrics?.budgetUtilization || 0) > 75 ? '#faad14' : '#52c41a'
                    }}
                    showInfo={false}
                    strokeColor={(metrics?.budgetUtilization || 0) > 90 ? '#f5222d' : 
                                (metrics?.budgetUtilization || 0) > 75 ? '#faad14' : '#52c41a'}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                    <Text type="secondary">Spent: ${Math.floor(4500000 * (metrics?.budgetUtilization || 0) / 100).toLocaleString()}</Text>
                    <Text type="secondary">Remaining: ${Math.ceil(4500000 * (100 - (metrics?.budgetUtilization || 0)) / 100).toLocaleString()}</Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DeputyDashboardPage;
