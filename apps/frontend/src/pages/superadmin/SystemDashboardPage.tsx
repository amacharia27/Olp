// apps/frontend/src/pages/superadmin/SystemDashboardPage.tsx
import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Button, List, Tag, Space, Alert } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  BankOutlined,
  SettingOutlined,
  DatabaseOutlined,
  SafetyOutlined,
  AuditOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { superAdminUser } from '@/data/super-admin';

const { Title, Text } = Typography;

const SystemDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [lastLogin] = useState(new Date().toLocaleString());
  
  // Mock system statistics
  const systemStats = {
    totalSchools: 1250,
    activeUsers: 45678,
    counties: 47,
    subcounties: 290,
    pendingApprovals: 23,
    systemHealth: 'Good',
    storageUsed: '42%',
    lastBackup: '2025-06-23 22:00:00'
  };

  // Mock recent activities
  const recentActivities = [
    { action: 'User Registration', details: 'New headteacher account created', time: '10 minutes ago', type: 'user' },
    { action: 'School Registration', details: 'Pending approval for Moi Girls High School', time: '30 minutes ago', type: 'school' },
    { action: 'System Update', details: 'Curriculum module updated to v2.3', time: '2 hours ago', type: 'system' },
    { action: 'Data Import', details: 'Imported 150 new student records', time: '3 hours ago', type: 'data' },
    { action: 'Security Alert', details: 'Multiple failed login attempts detected', time: '5 hours ago', type: 'security' }
  ];

  // Action cards for quick access
  const actionCards = [
    { title: 'User Management', icon: <UserOutlined />, path: '/user-management', description: 'Manage users, roles and permissions' },
    { title: 'School Management', icon: <BankOutlined />, path: '/tenant-management', description: 'Register and manage schools' },
    { title: 'Database Management', icon: <DatabaseOutlined />, path: '/database-management', description: 'Manage curriculum and system data' },
    { title: 'System Settings', icon: <SettingOutlined />, path: '/system-settings', description: 'Configure system parameters' },
    { title: 'Security Center', icon: <SafetyOutlined />, path: '/security-center', description: 'Monitor and manage system security' },
    { title: 'Audit Logs', icon: <AuditOutlined />, path: '/audit-logs', description: 'View system audit trails' }
  ];

  return (
    <div className="system-dashboard">
      <Row gutter={[16, 16]} align="middle" justify="space-between">
        <Col>
          <Title level={2}>System Dashboard</Title>
          <Text type="secondary">Welcome back, {superAdminUser.firstName} {superAdminUser.lastName}</Text>
        </Col>
        <Col>
          <Space>
            <Text type="secondary">Last login: {lastLogin}</Text>
            <Tag color="green">Super Admin</Tag>
          </Space>
        </Col>
      </Row>

      <Alert 
        message="System Notice" 
        description="Daily database backup scheduled for 22:00 today. System performance may be affected during this time." 
        type="info" 
        showIcon 
        style={{ margin: '16px 0' }} 
      />

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Total Schools" value={systemStats.totalSchools} prefix={<BankOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Active Users" value={systemStats.activeUsers} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Counties" value={systemStats.counties} prefix={<BookOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic title="Pending Approvals" value={systemStats.pendingApprovals} prefix={<AuditOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
        <Col xs={24} md={16}>
          <Card title="Quick Actions" style={{ height: '100%' }}>
            <Row gutter={[16, 16]}>
              {actionCards.map((card, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Card 
                    hoverable 
                    style={{ textAlign: 'center', height: '100%' }}
                    onClick={() => navigate(card.path)}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{card.icon}</div>
                    <Title level={5}>{card.title}</Title>
                    <Text type="secondary">{card.description}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="System Health" style={{ height: '100%' }}>
            <Statistic
              title="Overall Status"
              value={systemStats.systemHealth}
              valueStyle={{ color: '#3f8600' }}
            />
            <div style={{ marginTop: '16px' }}>
              <Text>Storage Used: {systemStats.storageUsed}</Text>
            </div>
            <div style={{ marginTop: '8px' }}>
              <Text>Last Backup: {systemStats.lastBackup}</Text>
            </div>
            <Button type="primary" style={{ marginTop: '16px' }}>
              View Detailed Report
            </Button>
          </Card>
        </Col>
      </Row>

      <Card title="Recent Activities" style={{ marginTop: '16px' }}>
        <List
          itemLayout="horizontal"
          dataSource={recentActivities}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={item.action}
                description={item.details}
              />
              <div>
                <Tag color={
                  item.type === 'security' ? 'red' : 
                  item.type === 'system' ? 'blue' : 
                  item.type === 'user' ? 'green' : 
                  item.type === 'school' ? 'orange' : 'purple'
                }>
                  {item.type.toUpperCase()}
                </Tag>
                <div>{item.time}</div>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default SystemDashboardPage;
