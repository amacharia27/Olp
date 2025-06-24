// apps/frontend/src/features/official/county/pages/CountyInfrastructurePage.tsx

import { Typography, Card, Table, Badge, Progress, Space, Divider, Button, Tag, Modal, message, Drawer, Row, Col, Statistic, Input, Select, Avatar } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BuildOutlined, DownloadOutlined, InfoCircleOutlined, FileExcelOutlined, FilePdfOutlined, CheckCircleOutlined, SyncOutlined, ToolOutlined, FilterOutlined } from '@ant-design/icons';
import { useState, Key } from 'react';
import { exportToExcel, exportToPdf } from '../utils/actionUtils';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

// --- MOCK DATA ---
const allProjectsData = [
  { key: '1', name: 'Classroom Block', school: 'Moi Avenue Primary', subCounty: 'Starehe', status: 'In Progress', budget: 2500000, completion: 65 },
  { key: '2', name: 'Laboratory', school: 'Eastleigh High School', subCounty: 'Kamukunji', status: 'Completed', budget: 1800000, completion: 100 },
  { key: '3', name: 'Library', school: 'Olympic Primary', subCounty: 'Kibra', status: 'Planned', budget: 3200000, completion: 0 },
  { key: '4', name: 'Dormitory', school: 'Huruma Girls', subCounty: 'Mathare', status: 'In Progress', budget: 4500000, completion: 35 },
  { key: '5', name: 'Admin Block', school: 'Westlands Primary', subCounty: 'Westlands', status: 'Completed', budget: 2200000, completion: 100 },
  { key: '6', name: 'Dining Hall', school: 'Dagoretti High', subCounty: 'Dagoretti', status: 'In Progress', budget: 3800000, completion: 75 },
  { key: '7', name: 'Sports Field', school: 'Langata High School', subCounty: 'Langata', status: 'Planned', budget: 1500000, completion: 0 },
  { key: '8', name: 'Computer Lab', school: 'Embakasi Girls', subCounty: 'Embakasi', status: 'Completed', budget: 2000000, completion: 100 },
];

const totalBudget = allProjectsData.reduce((sum, project) => sum + project.budget, 0);
const activeProjects = allProjectsData.filter(project => project.status === 'In Progress').length;
const completedProjects = allProjectsData.filter(project => project.status === 'Completed').length;

const projectStatusBySubcounty = [
  { name: 'Starehe', completed: 2, inProgress: 1, planned: 0 },
  { name: 'Westlands', completed: 1, inProgress: 2, planned: 1 },
  { name: 'Dagoretti', completed: 3, inProgress: 1, planned: 2 },
  { name: 'Embakasi', completed: 2, inProgress: 0, planned: 3 },
  { name: 'Kasarani', completed: 1, inProgress: 3, planned: 1 },
];

const budgetByProjectType = [
  { name: 'Classrooms', value: 12500000 },
  { name: 'Laboratories', value: 8200000 },
  { name: 'Libraries', value: 5300000 },
  { name: 'Dormitories', value: 9800000 },
  { name: 'Admin Blocks', value: 4200000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const CountyInfrastructurePage = () => {
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Use utility functions for export

  // Handle export button click
  const handleExport = () => {
    setIsExportModalVisible(true);
  };

  // Handle export format selection
  const handleExportFormat = (format: string) => {
    setIsExportModalVisible(false);
    
    if (format === 'Excel') {
      exportToExcel(allProjectsData, 'Infrastructure_Projects');
    } else if (format === 'PDF') {
      exportToPdf(allProjectsData, 'Infrastructure_Projects');
    }
  };

  // Handle view details button click
  const handleViewDetails = (record: any) => {
    // Enhance the record with additional mock data for the details view
    const enhancedRecord = {
      ...record,
      type: record.name.includes('Classroom') ? 'Classroom' : 
            record.name.includes('Laboratory') ? 'Laboratory' : 
            record.name.includes('Library') ? 'Library' : 
            record.name.includes('Dormitory') ? 'Dormitory' : 
            record.name.includes('Admin') ? 'Administration' : 
            record.name.includes('Dining') ? 'Dining Hall' : 
            record.name.includes('Sports') ? 'Sports Facility' : 
            record.name.includes('Computer') ? 'ICT Facility' : 'Other',
      location: `${record.school}, ${record.subCounty} Sub-County`,
      startDate: '2023-01-15',
      endDate: '2023-12-31',
      contractor: 'County Construction Ltd.',
      projectManager: 'John Doe',
      contactEmail: 'john.doe@county.go.ke',
      contactPhone: '+254 712 345 678',
      milestones: [
        { name: 'Planning & Design', completion: 100, date: '2023-02-28' },
        { name: 'Foundation', completion: 100, date: '2023-04-15' },
        { name: 'Structure', completion: record.completion >= 50 ? 100 : 0, date: '2023-06-30' },
        { name: 'Finishing', completion: record.completion >= 75 ? 100 : 0, date: '2023-09-30' },
        { name: 'Handover', completion: record.completion >= 100 ? 100 : 0, date: '2023-12-15' },
      ],
      issues: record.completion < 100 ? [
        { description: 'Material delivery delay', severity: 'Medium', status: 'Resolved' },
        { description: 'Budget adjustment needed', severity: 'High', status: 'In Progress' },
      ] : [],
      comments: [
        { author: 'Project Manager', date: '2023-05-15', text: 'Project is on track with minor delays in material delivery.' },
        { author: 'County Engineer', date: '2023-06-20', text: 'Quality inspection passed. Construction meets required standards.' },
      ]
    };
    
    setSelectedProject(enhancedRecord);
    setDetailsDrawerVisible(true);
  };

  // --- COMPONENT STATE ---
  const [activeTab, setActiveTab] = useState('1');
  const [filteredData, setFilteredData] = useState(allProjectsData);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'In Progress': return 'processing';
      case 'Completed': return 'success';
      case 'Planned': return 'default';
      default: return 'default';
    }
  };
  
  const columns: ColumnsType<any> = [
    { 
      title: 'Project Name', 
      dataIndex: 'name', 
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>
    },
    { 
      title: 'School', 
      dataIndex: 'school', 
      key: 'school', 
      sorter: (a: any, b: any) => a.school.localeCompare(b.school),
      render: (text: string) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1890ff' }}>{text.charAt(0)}</Avatar>
          {text}
        </Space>
      )
    },
    { 
      title: 'Sub-County', 
      dataIndex: 'subCounty', 
      key: 'subCounty', 
      sorter: (a: any, b: any) => a.subCounty.localeCompare(b.subCounty),
      filters: [
        { text: 'Dagoretti', value: 'Dagoretti' },
        { text: 'Westlands', value: 'Westlands' },
        { text: 'Kasarani', value: 'Kasarani' },
        { text: 'Embakasi', value: 'Embakasi' },
        { text: 'Starehe', value: 'Starehe' },
      ],
      onFilter: (value: boolean | Key, record: any) => record.subCounty === value.toString(),
    },
    { 
      title: 'Budget (KES)', 
      dataIndex: 'budget', 
      key: 'budget', 
      sorter: (a: any, b: any) => a.budget - b.budget, 
      render: (val: number) => <Text style={{ color: '#1890ff' }}>{val.toLocaleString()}</Text>,
      align: 'right',
    },
    { 
      title: 'Completion', 
      dataIndex: 'completion', 
      key: 'completion', 
      render: (val: number) => (
        <Progress percent={val} size="small" strokeColor={{ from: '#108ee9', to: '#87d068' }} format={(percent?: number) => `${percent?.toFixed(0)}%`} />
      ),
      sorter: (a: any, b: any) => a.completion - b.completion,
    },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => <Badge status={getStatusColor(status) as "success" | "processing" | "default" | "error" | "warning" | undefined} text={status} />,
      filters: [
        { text: 'In Progress', value: 'In Progress' },
        { text: 'Completed', value: 'Completed' },
        { text: 'Planned', value: 'Planned' },
      ],
      onFilter: (value: Key | boolean, record: any) => record.status.indexOf(value as string) === 0,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record: any) => (
        <Space size="small">
          <Button 
            type="link" 
            size="small"
            onClick={() => handleViewDetails(record)}
          >
            View
          </Button>
          <Button 
            type="link" 
            size="small"
            onClick={() => {
              message.info(`Updating project: ${record.name}`);
            }}
          >
            Update
          </Button>
        </Space>
      ),
      align: 'center',
    },
  ];

  return (
    <div style={{ padding: '0 12px' }}>
      {/* Header with gradient background */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)', 
        padding: '24px', 
        borderRadius: '8px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <Title level={2} style={{ color: 'white', margin: 0 }}>County Infrastructure Projects</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 0 }}>
          Track and oversee the progress of major infrastructural development in schools across the county.
        </Paragraph>
        <Text style={{ color: 'rgba(255,255,255,0.65)' }}>
          <InfoCircleOutlined style={{ marginRight: 8 }} />
          Last updated: June 22, 2025
        </Text>
      </div>
      
      {/* Statistics Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable style={{ height: '100%' }} bodyStyle={{ padding: '24px' }}>
            <Statistic 
              title={<Text strong>Total Project Budget</Text>} 
              value={totalBudget} 
              prefix={<ToolOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
              formatter={(val) => `KES ${(val as number / 1000000).toFixed(1)}M`} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable style={{ height: '100%' }} bodyStyle={{ padding: '24px' }}>
            <Statistic 
              title={<Text strong>Active Projects</Text>} 
              value={activeProjects} 
              prefix={<SyncOutlined spin style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable style={{ height: '100%' }} bodyStyle={{ padding: '24px' }}>
            <Statistic 
              title={<Text strong>Completed Projects</Text>} 
              value={completedProjects} 
              prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable style={{ height: '100%' }} bodyStyle={{ padding: '24px' }}>
            <Statistic 
              title={<Text strong>Total Projects</Text>} 
              value={allProjectsData.length} 
              prefix={<BuildOutlined style={{ color: '#722ed1' }} />}
              valueStyle={{ color: '#722ed1' }} 
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content with Tabs */}
      <Card
        style={{ marginBottom: 24 }}
        tabList={[
          { key: '1', tab: 'Projects List' },
          { key: '2', tab: 'Analytics Dashboard' },
        ]}
        activeTabKey={activeTab}
        onTabChange={key => setActiveTab(key)}
        extra={
          <Button 
            type="primary" 
            icon={<DownloadOutlined />}
            onClick={handleExport}
          >
            Export Projects
          </Button>
        }>
        {activeTab === '1' ? (
          <>
            <Space style={{ marginBottom: 16 }} size="middle" wrap>
              <Search placeholder="Search by project or school" style={{ width: 300 }} 
                onSearch={(value) => setFilteredData(allProjectsData.filter(item => 
                  item.name.toLowerCase().includes(value.toLowerCase()) || 
                  item.school.toLowerCase().includes(value.toLowerCase())
                ))}
              />
              <Select placeholder="Filter by Sub-County" style={{ width: 200 }} allowClear
                onChange={(value) => setFilteredData(value ? 
                  allProjectsData.filter(item => item.subCounty === value) : 
                  allProjectsData
                )}
              >
                <Select.Option value="Dagoretti">Dagoretti</Select.Option>
                <Select.Option value="Kasarani">Kasarani</Select.Option>
                <Select.Option value="Westlands">Westlands</Select.Option>
                <Select.Option value="Embakasi">Embakasi</Select.Option>
                <Select.Option value="Starehe">Starehe</Select.Option>
              </Select>
              <Select placeholder="Filter by Status" style={{ width: 200 }} allowClear
                onChange={(value) => setFilteredData(value ? 
                  allProjectsData.filter(item => item.status === value) : 
                  allProjectsData
                )}
              >
                <Select.Option value="In Progress">In Progress</Select.Option>
                <Select.Option value="Completed">Completed</Select.Option>
                <Select.Option value="Planned">Planned</Select.Option>
              </Select>
              <Button icon={<FilterOutlined />}>More Filters</Button>
            </Space>
            <Table 
              columns={columns} 
              dataSource={filteredData} 
              rowKey="key"
              pagination={{ pageSize: 5 }}
              bordered={false}
              style={{ borderRadius: '8px', overflow: 'hidden' }}
            />
          </>
        ) : (
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <Card title="Project Status by Sub-County" bordered={false}>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectStatusBySubcounty} layout="vertical" margin={{ top: 20, right: 30, left: 60, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" name="Completed" stackId="a" fill="#52c41a" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="#1890ff" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="planned" name="Planned" stackId="a" fill="#faad14" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Budget Allocation by Project Type" bordered={false}>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={budgetByProjectType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }: { name: string, percent: number }) => (`${name}: ${(percent * 100).toFixed(0)}%`)}
                    >
                      {budgetByProjectType.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `KES ${(value / 1000000).toFixed(1)}M`} />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        )}
      </Card>

      <Divider style={{ margin: '24px 0' }} />
      <Paragraph type="secondary" style={{ textAlign: 'center' }}>
        <InfoCircleOutlined style={{ marginRight: 8 }} />
        Infrastructure data is updated weekly based on reports from project managers and county engineers.
      </Paragraph>

      {/* Export Modal */}
      <Modal
        title="Export Infrastructure Projects"
        open={isExportModalVisible}
        onCancel={() => setIsExportModalVisible(false)}
        footer={null}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button 
            type="primary" 
            icon={<FileExcelOutlined />} 
            block 
            onClick={() => handleExportFormat('Excel')}
          >
            Export as Excel
          </Button>
          <Button 
            icon={<FilePdfOutlined />} 
            block 
            onClick={() => handleExportFormat('PDF')}
          >
            Export as PDF
          </Button>
        </Space>
      </Modal>

      {/* Project Details Drawer */}
      <Drawer
        title={selectedProject ? `${selectedProject.name} Details` : 'Project Details'}
        placement="right"
        width={600}
        onClose={() => setDetailsDrawerVisible(false)}
        open={detailsDrawerVisible}
      >
        {selectedProject && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card>
                  <Typography.Title level={4}>{selectedProject.name}</Typography.Title>
                  <Tag color={selectedProject.status === 'Completed' ? 'green' : selectedProject.status === 'In Progress' ? 'blue' : 'default'}>
                    {selectedProject.status}
                  </Tag>
                </Card>
              </Col>
            </Row>
            
            <Divider orientation="left">Project Information</Divider>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic title="Type" value={selectedProject.type} />
              </Col>
              <Col span={12}>
                <Statistic 
                  title="Budget" 
                  value={selectedProject.budget} 
                  prefix="KES " 
                  formatter={(value) => `${value.toLocaleString()}`} 
                />
              </Col>
              <Col span={24}>
                <p><strong>Location:</strong> {selectedProject.location}</p>
              </Col>
              <Col span={12}>
                <p><strong>Start Date:</strong> {selectedProject.startDate}</p>
              </Col>
              <Col span={12}>
                <p><strong>Expected Completion:</strong> {selectedProject.endDate}</p>
              </Col>
            </Row>
            
            <Divider orientation="left">Project Team</Divider>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <p><strong>Contractor:</strong> {selectedProject.contractor}</p>
              </Col>
              <Col span={12}>
                <p><strong>Project Manager:</strong> {selectedProject.projectManager}</p>
              </Col>
              <Col span={12}>
                <p><strong>Contact Email:</strong> {selectedProject.contactEmail}</p>
              </Col>
              <Col span={12}>
                <p><strong>Contact Phone:</strong> {selectedProject.contactPhone}</p>
              </Col>
            </Row>
            
            <Divider orientation="left">Progress</Divider>
            <p><strong>Overall Completion:</strong></p>
            <Progress 
              percent={selectedProject.completion} 
              status={selectedProject.status === 'Completed' ? 'success' : 'active'} 
              strokeColor={{ from: '#108ee9', to: '#87d068' }} 
            />
            
            <Divider orientation="left">Milestones</Divider>
            {selectedProject.milestones && selectedProject.milestones.map((milestone: any, index: number) => (
              <Row key={index} style={{ marginBottom: '10px' }}>
                <Col span={8}>
                  <p>{milestone.name}</p>
                </Col>
                <Col span={8}>
                  <p>{milestone.date}</p>
                </Col>
                <Col span={8}>
                  <Progress 
                    percent={milestone.completion} 
                    size="small" 
                    status={milestone.completion === 100 ? 'success' : 'active'}
                  />
                </Col>
              </Row>
            ))}
            
            {selectedProject.issues && selectedProject.issues.length > 0 && (
              <>
                <Divider orientation="left">Issues</Divider>
                {selectedProject.issues.map((issue: any, index: number) => (
                  <Row key={index} style={{ marginBottom: '10px' }}>
                    <Col span={12}>
                      <p>{issue.description}</p>
                    </Col>
                    <Col span={6}>
                      <Tag color={issue.severity === 'High' ? 'red' : issue.severity === 'Medium' ? 'orange' : 'blue'}>
                        {issue.severity}
                      </Tag>
                    </Col>
                    <Col span={6}>
                      <Tag color={issue.status === 'Resolved' ? 'green' : 'processing'}>
                        {issue.status}
                      </Tag>
                    </Col>
                  </Row>
                ))}
              </>
            )}
            
            <Divider orientation="left">Comments</Divider>
            {selectedProject.comments && selectedProject.comments.map((comment: any, index: number) => (
              <Card key={index} style={{ marginBottom: '10px' }} size="small">
                <p><strong>{comment.author}</strong> - {comment.date}</p>
                <p>{comment.text}</p>
              </Card>
            ))}
            
            <Divider orientation="left">Actions</Divider>
            <Space>
              <Button type="primary" onClick={() => {
                message.success(`Updated status for ${selectedProject.name}`);
                setDetailsDrawerVisible(false);
              }}>
                Update Status
              </Button>
              <Button onClick={() => {
                message.info(`Added comment to ${selectedProject.name}`);
              }}>
                Add Comment
              </Button>
              <Button type="default" icon={<FileExcelOutlined />} onClick={() => {
                exportToExcel([selectedProject], `Project_${selectedProject.key}`);
              }}>
                Export Details
              </Button>
            </Space>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default CountyInfrastructurePage;