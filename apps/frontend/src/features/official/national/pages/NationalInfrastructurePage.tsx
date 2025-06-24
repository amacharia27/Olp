// apps/frontend/src/features/official/national/pages/NationalInfrastructurePage.tsx
import { useState } from 'react';
import {
  Card, Col, Row, Statistic, Typography, Table, Tag, Progress, Button, Space, message, Popconfirm
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  ToolOutlined, SyncOutlined,
  CheckSquareOutlined, ScheduleOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// National infrastructure projects data
const nationalProjectsData = [
  { 
    key: '1', 
    name: 'Presidential Digital Literacy Programme (Phase 3)', 
    description: 'Distribution of learning tablets to all Grade 4 students.',
    budget: 5000000000, // 5B KES
    regions: ['Nairobi', 'Rift Valley', 'Coast'],
    progress: 45, 
    status: 'In Progress' 
  },
  { 
    key: '2', 
    name: 'National School Feeding Programme Expansion', 
    description: 'Expansion of feeding programs to 200 new schools in ASAL regions.',
    budget: 2500000000, // 2.5B KES
    regions: ['North Eastern', 'Eastern', 'Rift Valley'],
    progress: 80, 
    status: 'In Progress' 
  },
  { 
    key: '3', 
    name: 'Construction of 100 Model STEM Labs', 
    description: 'Building and equipping state-of-the-art STEM labs in selected national schools.',
    budget: 750000000, // 750M KES
    regions: ['All Counties'],
    progress: 0, 
    status: 'Pending Final Approval'
  },
  { 
    key: '4', 
    name: 'Junior Secondary School Infrastructure Grant', 
    description: 'Capitation grant for construction of JSS classrooms.',
    budget: 10000000000, // 10B KES
    regions: ['All Counties'],
    progress: 100, 
    status: 'Completed'
  },
];

const NationalInfrastructurePage = () => {
  const [projects, setProjects] = useState(nationalProjectsData);

  const handleApproveProject = (key: string) => {
    const project = projects.find(p => p.key === key);
    message.success(`Project "${project?.name}" has been approved and is now active!`);
    setProjects(projects.map(p => p.key === key ? {...p, status: 'In Progress', progress: 5 } : p));
    // In production, this would make an API call to update project status
  }
  
  const columns: ColumnsType<any> = [
    { title: 'Project Name', dataIndex: 'name', key: 'name', width: '30%' },
    { title: 'Regions', dataIndex: 'regions', key: 'regions', render: (regions: string[]) => (
        <Space wrap>{regions.map(r => <Tag key={r}>{r}</Tag>)}</Space>
    )},
    { title: 'Budget (KES)', dataIndex: 'budget', key: 'budget', render: (val) => `${(val / 1000000).toLocaleString()}M` },
    { title: 'Completion', dataIndex: 'progress', key: 'progress', render: (val) => <Progress percent={val} /> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status: string) => {
        let color = status === 'In Progress' ? 'processing' : status === 'Completed' ? 'success' : 'default';
        if (status === 'Pending Final Approval') color = 'warning';
        return <Tag color={color}>{status}</Tag>;
    }},
    {
        title: 'Action', key: 'action', render: (_, record) => record.status === 'Pending Final Approval' ? (
            <Popconfirm title="Are you sure you want to approve this national project?" onConfirm={() => handleApproveProject(record.key)}>
              <Button type="primary" size="small" icon={<CheckSquareOutlined />}>Approve Project</Button>
            </Popconfirm>
        ) : <Button size="small">View Progress Report</Button>
    }
  ];

  return (
    <div>
      <Title level={2}>National Infrastructure Projects</Title>
      <Paragraph type="secondary">Approve and monitor the progress of large-scale, national-level infrastructure and development projects.</Paragraph>
      
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="Total Projects" value={projects.length} prefix={<ToolOutlined />} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="Total Budget" value={projects.reduce((sum, p) => sum + p.budget, 0)} prefix="KES" formatter={(val) => `${(val as number / 1000000000).toFixed(2)}B`} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="Projects in Progress" value={projects.filter(p => p.status === 'In Progress').length} prefix={<SyncOutlined spin />} valueStyle={{color: '#1890ff'}} /></Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card><Statistic title="Awaiting Approval" value={projects.filter(p => p.status === 'Pending Final Approval').length} prefix={<ScheduleOutlined />} valueStyle={{color: '#faad14'}} /></Card>
        </Col>
      </Row>

      <Card title="All National Projects">
        <Table columns={columns} dataSource={projects} />
      </Card>
    </div>
  );
};

export default NationalInfrastructurePage;