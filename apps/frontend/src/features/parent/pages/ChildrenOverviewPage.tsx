// apps/frontend/src/features/parent/pages/ChildrenOverviewPage.tsx
import { useEffect, useState } from 'react';
import {
  Card, Col, Row, Typography, List, Tag, Spin, Avatar, Progress, Space, theme
} from 'antd';
import {
  BarChartOutlined, SolutionOutlined, DollarOutlined,
  CheckCircleFilled, CloseCircleFilled, BellOutlined, MessageOutlined, BookOutlined
} from '@ant-design/icons';
import { useParentDashboard } from '../context/ParentDashboardContext';

const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

// --- MOCK DATA ---
const mockChildData: Record<string, any> = {
  'child1': {
    overallAverage: 82.5,
    attendance: 'Present',
    upcomingAssignments: 2,
    feeBalance: 15000,
    subjects: [
      { name: 'Mathematics', score: 78, grade: 'B' },
      { name: 'English', score: 85, grade: 'A' },
      { name: 'Science', score: 92, grade: 'A' },
      { name: 'Social Studies', score: 75, grade: 'B' },
    ],
    recentActivity: [
      { type: 'grade', text: 'New grade posted for Science Mid-Term', time: '1h ago'},
      { type: 'message', text: 'Received message from Mr. Otieno', time: 'Yesterday'},
      { type: 'assignment', text: 'Mathematics homework due tomorrow', time: '2 days ago'},
    ]
  },
  'child2': {
    overallAverage: 88.0,
    attendance: 'Present',
    upcomingAssignments: 1,
    feeBalance: 0,
    subjects: [
      { name: 'Mathematics', score: 90, grade: 'A' },
      { name: 'English', score: 88, grade: 'A' },
      { name: 'Science', score: 85, grade: 'A' },
      { name: 'Social Studies', score: 89, grade: 'A' },
    ],
    recentActivity: [
      { type: 'assignment', text: 'New assignment "Book Report" was added', time: '3 days ago'},
      { type: 'grade', text: 'New grade posted for Mathematics Quiz', time: '1 week ago'},
    ]
  }
};

const ChildrenOverviewPage = () => {
  const { selectedChildId, selectedChild, isLoading } = useParentDashboard();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const { token } = useToken();

  useEffect(() => {
    if (selectedChildId) {
      // This simulates fetching new data when the selected child changes
      setDashboardData(mockChildData[selectedChildId]);
      // TODO: API call here: GET /api/v1/parent/dashboard?childId=${selectedChildId}
    }
  }, [selectedChildId]);

  if (isLoading || !dashboardData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <Spin size="large" tip="Loading dashboard data..." />
      </div>
    );
  }

  // Get activity icon based on type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'grade': return <BarChartOutlined style={{ color: token.colorPrimary }} />;
      case 'message': return <MessageOutlined style={{ color: '#722ed1' }} />;
      case 'assignment': return <BookOutlined style={{ color: '#fa8c16' }} />;
      default: return <BellOutlined style={{ color: token.colorInfo }} />;
    }
  };

  // Get color for progress bar based on score
  const getProgressColor = (score: number) => {
    if (score >= 80) return token.colorSuccess;
    if (score >= 70) return token.colorPrimary;
    if (score >= 60) return token.colorWarning;
    return token.colorError;
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24
      }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>My Children's Overview</Title>
          <Paragraph type="secondary">View your child's performance and activities</Paragraph>
        </div>
      </div>
      
      {/* Child Info Card */}
      <Card 
        style={{ 
          marginBottom: 24, 
          borderRadius: token.borderRadiusLG,
          boxShadow: token.boxShadowTertiary
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <Avatar 
            size={64} 
            style={{ 
              backgroundColor: token.colorPrimary,
              marginRight: 16
            }}
          >
            {selectedChild?.name.charAt(0)}
          </Avatar>
          <div>
            <Title level={3} style={{ margin: 0 }}>{selectedChild?.name}</Title>
            <Text type="secondary">{selectedChild?.className} • {selectedChild?.schoolName}</Text>
          </div>
        </div>
      </Card>

      {/* Statistic Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            hoverable 
            style={{ 
              borderRadius: token.borderRadiusLG,
              height: '100%',
              boxShadow: token.boxShadowTertiary
            }}
            bodyStyle={{ padding: '24px 24px' }}
          >
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <Progress 
                type="dashboard" 
                percent={dashboardData.overallAverage} 
                format={(percent) => `${percent}%`}
                strokeColor={getProgressColor(dashboardData.overallAverage)}
                width={80}
              />
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text strong style={{ fontSize: 16 }}>Overall Average</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            hoverable 
            style={{ 
              borderRadius: token.borderRadiusLG,
              height: '100%',
              boxShadow: token.boxShadowTertiary
            }}
            bodyStyle={{ padding: '24px 24px' }}
          >
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              {dashboardData.attendance === 'Present' ? (
                <CheckCircleFilled style={{ fontSize: 64, color: token.colorSuccess }} />
              ) : (
                <CloseCircleFilled style={{ fontSize: 64, color: token.colorError }} />
              )}
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text strong style={{ fontSize: 16 }}>Today's Attendance</Text>
              <br />
              <Tag color={dashboardData.attendance === 'Present' ? 'success' : 'error'} style={{ marginTop: 8 }}>
                {dashboardData.attendance}
              </Tag>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            hoverable 
            style={{ 
              borderRadius: token.borderRadiusLG,
              height: '100%',
              boxShadow: token.boxShadowTertiary
            }}
            bodyStyle={{ padding: '24px 24px' }}
          >
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <SolutionOutlined style={{ fontSize: 64, color: token.colorInfo }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text strong style={{ fontSize: 16 }}>Upcoming Assignments</Text>
              <br />
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: token.colorInfo, display: 'block', marginTop: 8 }}>
                {dashboardData.upcomingAssignments}
              </Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            hoverable 
            style={{ 
              borderRadius: token.borderRadiusLG,
              height: '100%',
              boxShadow: token.boxShadowTertiary
            }}
            bodyStyle={{ padding: '24px 24px' }}
          >
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <DollarOutlined style={{ fontSize: 64, color: dashboardData.feeBalance > 0 ? token.colorError : token.colorSuccess }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <Text strong style={{ fontSize: 16 }}>Outstanding Fees</Text>
              <br />
              <Text 
                style={{ 
                  fontSize: 20, 
                  fontWeight: 'bold', 
                  color: dashboardData.feeBalance > 0 ? token.colorError : token.colorSuccess,
                  display: 'block',
                  marginTop: 8
                }}
              >
                KES {dashboardData.feeBalance.toLocaleString()}
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* Subject Performance */}
        <Col xs={24} lg={12}>
          <Card 
            title="Subject Performance" 
            style={{ 
              borderRadius: token.borderRadiusLG,
              marginBottom: 24,
              boxShadow: token.boxShadowTertiary
            }}
          >
            <List
              dataSource={dashboardData.subjects}
              renderItem={(subject: any) => (
                <List.Item>
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <Text strong>{subject.name}</Text>
                      <Space>
                        <Text>{subject.score}%</Text>
                        <Tag color={getProgressColor(subject.score)}>{subject.grade}</Tag>
                      </Space>
                    </div>
                    <Progress 
                      percent={subject.score} 
                      showInfo={false} 
                      strokeColor={getProgressColor(subject.score)}
                      size="small"
                    />
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Recent Activity */}
        <Col xs={24} lg={12}>
          <Card 
            title="Recent Activity" 
            style={{ 
              borderRadius: token.borderRadiusLG,
              marginBottom: 24,
              boxShadow: token.boxShadowTertiary
            }}
          >
            <List
              itemLayout="horizontal"
              dataSource={dashboardData.recentActivity}
              renderItem={(item: any) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={getActivityIcon(item.type)}
                    title={item.text}
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

export default ChildrenOverviewPage;