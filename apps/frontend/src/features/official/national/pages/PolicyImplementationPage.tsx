import React from 'react';
import { Card, Typography, Row, Col, Steps, Progress, List, Tag, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

interface PolicyData {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'implementation' | 'monitoring' | 'evaluation' | 'completed';
  progress: number;
  startDate: string;
  endDate: string;
  tags: string[];
}

const PolicyImplementationPage: React.FC = () => {
  // Sample data for demonstration
  const policies: PolicyData[] = [
    {
      id: 'pol-001',
      name: 'Digital Learning Initiative',
      description: 'Implementing digital learning tools and resources across all public schools.',
      status: 'implementation',
      progress: 65,
      startDate: '2024-01-15',
      endDate: '2025-12-31',
      tags: ['digital', 'technology', 'priority'],
    },
    {
      id: 'pol-002',
      name: 'Teacher Professional Development Program',
      description: 'Nationwide teacher training and professional development initiative.',
      status: 'monitoring',
      progress: 78,
      startDate: '2023-09-01',
      endDate: '2025-08-31',
      tags: ['training', 'quality'],
    },
    {
      id: 'pol-003',
      name: 'School Feeding Program Expansion',
      description: 'Expanding the school feeding program to reach more underserved areas.',
      status: 'implementation',
      progress: 42,
      startDate: '2024-03-01',
      endDate: '2026-02-28',
      tags: ['nutrition', 'welfare', 'priority'],
    },
    {
      id: 'pol-004',
      name: 'Curriculum Reform Implementation',
      description: 'Rolling out the new competency-based curriculum nationwide.',
      status: 'evaluation',
      progress: 85,
      startDate: '2022-01-01',
      endDate: '2024-12-31',
      tags: ['curriculum', 'quality', 'priority'],
    },
  ];

  const getStatusStep = (status: PolicyData['status']) => {
    switch (status) {
      case 'planning': return 0;
      case 'implementation': return 1;
      case 'monitoring': return 2;
      case 'evaluation': return 3;
      case 'completed': return 4;
      default: return 0;
    }
  };

  const getStatusColor = (status: PolicyData['status']) => {
    switch (status) {
      case 'planning': return '#faad14';
      case 'implementation': return '#1890ff';
      case 'monitoring': return '#52c41a';
      case 'evaluation': return '#722ed1';
      case 'completed': return '#52c41a';
      default: return '#faad14';
    }
  };

  return (
    <div className="policy-implementation-page">
      <Title level={2}>Policy Implementation</Title>
      <Paragraph>
        Track and monitor the implementation of national education policies.
      </Paragraph>
      
      <Row gutter={[16, 16]}>
        {policies.map(policy => (
          <Col xs={24} sm={24} md={12} key={policy.id}>
            <Card 
              title={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text strong>{policy.name}</Text>
                  <div>
                    {policy.tags.map(tag => (
                      <Tag key={tag} color={tag === 'priority' ? 'red' : undefined}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              } 
              style={{ marginBottom: 16 }}
            >
              <Paragraph>{policy.description}</Paragraph>
              
              <Row>
                <Col span={24}>
                  <Text strong>Implementation Progress:</Text>
                  <Progress 
                    percent={policy.progress} 
                    status={policy.progress === 100 ? 'success' : 'active'} 
                    strokeColor={getStatusColor(policy.status)}
                  />
                </Col>
              </Row>
              
              <Row>
                <Col span={24}>
                  <Text strong>Status:</Text>
                  <Steps 
                    current={getStatusStep(policy.status)} 
                    size="small" 
                    style={{ marginTop: 8, marginBottom: 16 }}
                  >
                    <Step title="Planning" />
                    <Step title="Implementation" />
                    <Step title="Monitoring" />
                    <Step title="Evaluation" />
                    <Step title="Completed" />
                  </Steps>
                </Col>
              </Row>
              
              <Row>
                <Col span={12}>
                  <Text type="secondary">Start: {policy.startDate}</Text>
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                  <Text type="secondary">End: {policy.endDate}</Text>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
      
      <Divider />
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Implementation Summary">
            <List
              size="small"
              bordered
              dataSource={[
                'Total Policies: 4',
                'In Planning: 0',
                'In Implementation: 2',
                'In Monitoring: 1',
                'In Evaluation: 1',
                'Completed: 0',
              ]}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PolicyImplementationPage;