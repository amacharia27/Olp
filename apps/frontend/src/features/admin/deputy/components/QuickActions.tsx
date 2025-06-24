import React from 'react';
import { Card, Button, Space, Typography } from 'antd';
import { 
  FileAddOutlined, 
  ScheduleOutlined, 
  TeamOutlined, 
  BookOutlined,
  BellOutlined,
  CheckCircleOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const { Text } = Typography;

const quickActions = [
  {
    key: 'new-report',
    icon: <FileAddOutlined />,
    label: 'New Report',
    description: 'Create academic or administrative report'
  },
  {
    key: 'schedule',
    icon: <ScheduleOutlined />,
    label: 'Timetable',
    description: 'View or edit school timetable'
  },
  {
    key: 'staff',
    icon: <TeamOutlined />,
    label: 'Staff Management',
    description: 'Manage teaching and non-teaching staff'
  },
  {
    key: 'curriculum',
    icon: <BookOutlined />,
    label: 'Curriculum',
    description: 'View curriculum details'
  },
  {
    key: 'announcement',
    icon: <BellOutlined />,
    label: 'Announcement',
    description: 'Make an announcement'
  },
  {
    key: 'approvals',
    icon: <CheckCircleOutlined />,
    label: 'Approvals',
    description: 'Pending requests awaiting approval'
  },
  {
    key: 'analytics',
    icon: <BarChartOutlined />,
    label: 'Analytics',
    description: 'View school performance analytics'
  }
];

const QuickActions: React.FC = () => {
  return (
    <Card 
      title={
        <span>
          <span style={{ marginRight: 8 }}>⚡</span>
          Quick Actions
        </span>
      }
      className="quick-actions"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {quickActions.map((action) => (
          <Button 
            key={action.key}
            icon={action.icon}
            block
            style={{
              height: 'auto',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 20, marginBottom: 8 }}>{action.icon}</div>
            <Text strong style={{ display: 'block', marginBottom: 4 }}>{action.label}</Text>
            <Text type="secondary" style={{ fontSize: 12 }}>{action.description}</Text>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default QuickActions;
