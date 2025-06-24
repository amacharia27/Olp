// apps/frontend/src/features/official/county/pages/CountySchoolClassificationPage.tsx
import { Typography, Card, Table, Tag, Row, Col, Statistic, Progress, Space, Divider, Select, Button, Tooltip, message, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';
import { BankOutlined, StarOutlined, FilterOutlined, DownloadOutlined, InfoCircleOutlined, EyeOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

// Mock data for school classifications
const schoolClassificationData = [
  { id: 1, name: 'Westlands Secondary School', category: 'National', performance: 92.3, facilities: 'Excellent', enrollment: 1250, trend: 2.1 },
  { id: 2, name: 'Kasarani Girls High School', category: 'Extra-County', performance: 87.5, facilities: 'Good', enrollment: 980, trend: 1.5 },
  { id: 3, name: 'Dagoretti High School', category: 'County', performance: 78.2, facilities: 'Average', enrollment: 850, trend: -0.8 },
  { id: 4, name: 'Embakasi Secondary School', category: 'Sub-County', performance: 65.7, facilities: 'Fair', enrollment: 720, trend: 0.3 },
  { id: 5, name: 'Starehe Boys Centre', category: 'National', performance: 94.1, facilities: 'Excellent', enrollment: 1180, trend: 1.2 },
  { id: 6, name: 'Olympic High School', category: 'Extra-County', performance: 83.6, facilities: 'Good', enrollment: 910, trend: -0.5 },
  { id: 7, name: 'Buruburu Girls', category: 'National', performance: 90.8, facilities: 'Excellent', enrollment: 1050, trend: 1.8 },
  { id: 8, name: 'Highway Secondary School', category: 'County', performance: 76.3, facilities: 'Average', enrollment: 790, trend: 0.6 },
];

// Summary data
const classificationSummary = {
  national: 3,
  extraCounty: 2,
  county: 2,
  subCounty: 1,
  total: 8
};

// Chart data
const categoryData = [
  { name: 'National', value: 3, color: '#1890ff' },
  { name: 'Extra-County', value: 2, color: '#52c41a' },
  { name: 'County', value: 2, color: '#faad14' },
  { name: 'Sub-County', value: 1, color: '#722ed1' },
];

const COLORS = ['#1890ff', '#52c41a', '#faad14', '#722ed1'];

const performanceData = [
  { category: 'National', avg: 92.4 },
  { category: 'Extra-County', avg: 85.6 },
  { category: 'County', avg: 77.3 },
  { category: 'Sub-County', avg: 65.7 },
];

const CountySchoolClassificationPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<any>(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  const getCategoryColor = (category: string): string => {
    switch(category) {
      case 'National': return '#1890ff';
      case 'Extra-County': return '#52c41a';
      case 'County': return '#faad14';
      case 'Sub-County': return '#722ed1';
      default: return '#1890ff';
    }
  };

  const getFacilityColor = (facility: string): string => {
    switch(facility) {
      case 'Excellent': return 'green';
      case 'Good': return 'cyan';
      case 'Average': return 'orange';
      case 'Fair': return 'volcano';
      default: return 'blue';
    }
  };

  // Function to handle export button click
  const handleExport = () => {
    setIsExportModalVisible(true);
  };

  // Function to export data
  const handleExportData = (format: string) => {
    setIsExportModalVisible(false);
    const fileName = `School-Classification-${selectedCategory}`;
    message.success(`Exporting ${fileName} as ${format}`);
    // In a real implementation, you would use a library like xlsx or jspdf
  };

  // Handle view details button click
  const handleViewDetails = (school: any) => {
    // Set the selected school and show details modal
    setSelectedSchool(school);
    setDetailsModalVisible(true);
  };


  const columns: ColumnsType<any> = [
    {
      title: 'School Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color={getCategoryColor(category)} key={category}>
          {category.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'National', value: 'National' },
        { text: 'Extra-County', value: 'Extra-County' },
        { text: 'County', value: 'County' },
        { text: 'Sub-County', value: 'Sub-County' },
      ],
      onFilter: (value: boolean | React.Key, record: any) => record.category === value.toString(),
    },
    {
      title: 'Performance',
      dataIndex: 'performance',
      key: 'performance',
      sorter: (a, b) => a.performance - b.performance,
      render: (performance: number) => (
        <Progress 
          percent={performance} 
          size="small" 
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
          format={(percent?: number) => `${percent?.toFixed(1)}%`}
        />
      ),
    },
    {
      title: 'Facilities',
      dataIndex: 'facilities',
      key: 'facilities',
      render: (facilities: string) => (
        <Tag color={getFacilityColor(facilities)} key={facilities}>
          {facilities}
        </Tag>
      ),
    },
    {
      title: 'Enrollment',
      dataIndex: 'enrollment',
      key: 'enrollment',
      sorter: (a, b) => a.enrollment - b.enrollment,
      render: (enrollment: number) => enrollment.toLocaleString(),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Button 
          type="primary" 
          size="small" 
          icon={<EyeOutlined />}
          onClick={() => handleViewDetails(record)}
        >
          View Details
        </Button>
      ),
    },
  ];

  const filteredData = selectedCategory === 'All' 
    ? schoolClassificationData 
    : schoolClassificationData.filter(school => school.category === selectedCategory);

  return (
    <div style={{ padding: '0 12px' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)', 
        padding: '24px', 
        borderRadius: '8px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <Title level={2} style={{ color: 'white', margin: 0 }}>School Classification</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 0 }}>
          Categorization and performance metrics for all schools in Nairobi County.
        </Paragraph>
        <Text style={{ color: 'rgba(255,255,255,0.65)' }}>
          <InfoCircleOutlined style={{ marginRight: 8 }} />
          Last updated: June 20, 2025
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable style={{ height: '100%' }} bodyStyle={{ padding: '24px' }}>
            <Statistic 
              title={<Text strong>National Schools</Text>} 
              value={classificationSummary.national} 
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable style={{ height: '100%' }} bodyStyle={{ padding: '24px' }}>
            <Statistic 
              title={<Text strong>Extra-County Schools</Text>} 
              value={classificationSummary.extraCounty} 
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable style={{ height: '100%' }} bodyStyle={{ padding: '24px' }}>
            <Statistic 
              title={<Text strong>County Schools</Text>} 
              value={classificationSummary.county} 
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable style={{ height: '100%' }} bodyStyle={{ padding: '24px' }}>
            <Statistic 
              title={<Text strong>Sub-County Schools</Text>} 
              value={classificationSummary.subCounty} 
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card 
            title={<Title level={4}>School Categories Distribution</Title>}
            style={{ height: '100%' }}
            bordered={false}
            className="dashboard-card"
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }: { name: string, percent?: number }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card 
            title={<Title level={4}>Average Performance by Category</Title>}
            style={{ height: '100%' }}
            bordered={false}
            className="dashboard-card"
          >
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                <RechartsTooltip formatter={(value: number) => `${value}%`} />
                <Bar 
                  dataKey="avg" 
                  name="Average Score" 
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                >
                  {performanceData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Card 
        title={<Title level={4}>School Classification Details</Title>}
        style={{ marginTop: 24 }}
        bordered={false}
        className="dashboard-card"
        extra={
          <Space>
            <Select 
              defaultValue="All" 
              style={{ width: 150 }} 
              onChange={setSelectedCategory}
              suffixIcon={<FilterOutlined />}
            >
              <Option value="All">All Categories</Option>
              <Option value="National">National</Option>
              <Option value="Extra-County">Extra-County</Option>
              <Option value="County">County</Option>
              <Option value="Sub-County">Sub-County</Option>
            </Select>
            <Tooltip title="Export data">
              <Button icon={<DownloadOutlined />} onClick={handleExport} />
            </Tooltip>
          </Space>
        }
      >
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered={false}
          style={{ borderRadius: '8px', overflow: 'hidden' }}
        />
      </Card>

      <Divider style={{ margin: '24px 0' }} />
      <Paragraph type="secondary" style={{ textAlign: 'center' }}>
        <InfoCircleOutlined style={{ marginRight: 8 }} />
        School classification is based on Ministry of Education guidelines and performance metrics.
      </Paragraph>

      {/* Export Modal */}
      <Modal
        title="Export School Classification Data"
        open={isExportModalVisible}
        onCancel={() => setIsExportModalVisible(false)}
        footer={null}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button 
            type="primary" 
            icon={<DownloadOutlined />} 
            block 
            onClick={() => handleExportData('Excel')}
          >
            Export as Excel
          </Button>
          <Button 
            icon={<DownloadOutlined />} 
            block 
            onClick={() => handleExportData('PDF')}
          >
            Export as PDF
          </Button>
          <Button 
            icon={<DownloadOutlined />} 
            block 
            onClick={() => handleExportData('CSV')}
          >
            Export as CSV
          </Button>
        </Space>
      </Modal>

      {/* School Details Modal */}
      <Modal
        title={selectedSchool ? `${selectedSchool.name} Details` : 'School Details'}
        open={detailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedSchool && (
          <div>
            <Card bordered={false}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Statistic 
                  title="Performance Score" 
                  value={selectedSchool.performance} 
                  suffix="%" 
                  valueStyle={{ color: selectedSchool.performance > 80 ? '#3f8600' : selectedSchool.performance > 60 ? '#faad14' : '#cf1322' }}
                />
                <Progress 
                  percent={selectedSchool.performance} 
                  status={selectedSchool.performance > 80 ? 'success' : selectedSchool.performance > 60 ? 'normal' : 'exception'} 
                  strokeColor={selectedSchool.performance > 80 ? '#3f8600' : selectedSchool.performance > 60 ? '#faad14' : '#cf1322'}
                />
                <Divider />
                <p><strong>Category:</strong> <Tag color={getCategoryColor(selectedSchool.category)}>{selectedSchool.category}</Tag></p>
                <p><strong>Facilities:</strong> <Tag color={getFacilityColor(selectedSchool.facilities)}>{selectedSchool.facilities}</Tag></p>
                <p><strong>Enrollment:</strong> {selectedSchool.enrollment.toLocaleString()} students</p>
                <p>
                  <strong>Performance Trend:</strong> 
                  {selectedSchool.trend > 0 ? (
                    <Text type="success">{selectedSchool.trend}% ↑</Text>
                  ) : (
                    <Text type="danger">{selectedSchool.trend}% ↓</Text>
                  )}
                </p>
                <Divider />
                <Button type="primary" icon={<DownloadOutlined />} block onClick={() => {
                  message.success(`Generating detailed report for ${selectedSchool.name}`);
                }}>
                  Generate Detailed Report
                </Button>
              </Space>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CountySchoolClassificationPage;