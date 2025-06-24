// apps/frontend/src/features/official/county/pages/CountyDashboardPage.tsx
import { Card, Col, Row, Statistic, Typography, Table, Progress, Badge, Divider, Space, Avatar, Button, Modal, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BankOutlined, TeamOutlined, RiseOutlined, ArrowUpOutlined, ArrowDownOutlined, InfoCircleOutlined, FileTextOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title, Paragraph, Text } = Typography;

// --- MOCK DATA ---
const countyStats = {
    totalSubCounties: 8,
    totalSchools: 152,
    totalStudents: 185670,
    countyAverage: 76.2,
    lastUpdated: 'June 20, 2025',
};

const subCountyPerformanceData = [
  { name: 'Dagoretti', avg: 79.3, enrollment: 35240, trend: 1.2, schools: 28 },
  { name: 'Kasarani', avg: 78.1, enrollment: 41300, trend: -0.5, schools: 32 },
  { name: 'Westlands', avg: 81.5, enrollment: 29800, trend: 2.1, schools: 24 },
  { name: 'Starehe', avg: 75.4, enrollment: 31050, trend: 0.8, schools: 26 },
  { name: 'Embakasi', avg: 73.9, enrollment: 48300, trend: -1.2, schools: 42 },
];

// For the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const CountyDashboardPage = () => {
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [selectedSubCounty, setSelectedSubCounty] = useState<any>(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  
  // Handle export dashboard data
  const handleExport = () => {
    setIsExportModalVisible(true);
  };
  
  // Handle export format selection
  const handleExportFormat = (format: string) => {
    setIsExportModalVisible(false);
    message.success(`Exporting County Dashboard as ${format}`);
    // In a real implementation, you would use a library like xlsx or jspdf
  };
  
  // Handle view sub-county details
  const viewSubCountyDetails = (subCounty: any) => {
    setSelectedSubCounty(subCounty);
    setDetailsModalVisible(true);
  };

  const subCountyColumns: ColumnsType<any> = [
    { 
      title: 'Sub-County', 
      dataIndex: 'name', 
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <Avatar style={{ backgroundColor: record.trend >= 0 ? '#87d068' : '#f56a00' }}>
            {text.charAt(0)}
          </Avatar>
          <Button 
            type="link" 
            onClick={() => viewSubCountyDetails(record)}
            style={{ padding: 0 }}
          >
            <Text strong>{text}</Text>
          </Button>
        </Space>
      )
    },
    { 
      title: 'Schools', 
      dataIndex: 'schools', 
      key: 'schools',
      align: 'center',
      render: (val: number) => <Badge count={val} showZero style={{ backgroundColor: '#1890ff' }} />
    },
    { 
      title: 'Total Enrollment', 
      dataIndex: 'enrollment', 
      key: 'enrollment', 
      align: 'right',
      render: (val: number) => <Text>{val.toLocaleString()}</Text> 
    },
    { 
      title: 'Average Performance', 
      dataIndex: 'avg', 
      key: 'avg', 
      sorter: (a,b) => a.avg - b.avg,
      defaultSortOrder: 'descend',
      render: (avg: number) => (
        <div>
          <Progress 
            percent={avg} 
            size="small" 
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            format={(percent?: number) => `${percent?.toFixed(1)}%`}
          />
        </div>
      )
    },
    {
      title: 'Term Trend',
      dataIndex: 'trend',
      key: 'trend',
      align: 'center',
      sorter: (a,b) => a.trend - b.trend,
      render: (trend: number) => (
        <Typography.Text 
          style={{ 
            fontWeight: 'bold',
            color: trend >= 0 ? '#52c41a' : '#f5222d'
          }}
        >
          {trend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(trend)}%
        </Typography.Text>
      )
    }
  ];

  return (
    <div style={{ padding: '0 12px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button 
          type="primary" 
          icon={<DownloadOutlined />} 
          onClick={handleExport}
        >
          Export Dashboard
        </Button>
      </div>
      <div style={{ 
        background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)', 
        padding: '24px', 
        borderRadius: '8px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <Title level={2} style={{ color: 'white', margin: 0 }}>Nairobi County Dashboard</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 0 }}>
          An aggregated performance and administrative overview of all sub-counties.
        </Paragraph>
        <Text style={{ color: 'rgba(255,255,255,0.65)' }}>
          <InfoCircleOutlined style={{ marginRight: 8 }} />
          Last updated: {countyStats.lastUpdated}
        </Text>
      </div>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            hoverable 
            style={{ height: '100%' }}
            bodyStyle={{ padding: '24px' }}
          >
            <Statistic 
              title={<Text strong>Total Sub-Counties</Text>} 
              value={countyStats.totalSubCounties} 
              prefix={<BankOutlined style={{ color: '#1890ff' }} />} 
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            hoverable 
            style={{ height: '100%' }}
            bodyStyle={{ padding: '24px' }}
          >
            <Statistic 
              title={<Text strong>Total Schools</Text>} 
              value={countyStats.totalSchools} 
              prefix={<FileTextOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
              formatter={(val) => val.toLocaleString()} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            hoverable 
            style={{ height: '100%' }}
            bodyStyle={{ padding: '24px' }}
          >
            <Statistic 
              title={<Text strong>Total Students</Text>} 
              value={countyStats.totalStudents} 
              prefix={<TeamOutlined style={{ color: '#722ed1' }} />} 
              valueStyle={{ color: '#722ed1' }}
              formatter={(val) => val.toLocaleString()} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card 
            hoverable 
            style={{ height: '100%' }}
            bodyStyle={{ padding: '24px' }}
          >
            <Statistic 
              title={<Text strong>County Average Score</Text>} 
              value={countyStats.countyAverage} 
              suffix="%" 
              prefix={<RiseOutlined style={{ color: '#fa8c16' }} />} 
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card 
            title={<Title level={4}>Sub-County Performance Comparison</Title>}
            extra={<Badge color="#00529B" text="Average Score %" />}
            style={{ height: '100%' }}
            bordered={false}
            className="dashboard-card"
          >
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={subCountyPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(1)}%`, 'Average Score']}
                  contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                />
                <Legend wrapperStyle={{ paddingTop: 10 }} />
                <Bar 
                  dataKey="avg" 
                  name="Average Score" 
                  fill="#00529B" 
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card 
            title={<Title level={4}>Enrollment Distribution</Title>}
            style={{ height: '100%' }}
            bordered={false}
            className="dashboard-card"
          >
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={subCountyPerformanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="enrollment"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {subCountyPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toLocaleString()} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      
      <Card 
        title={<Title level={4}>Detailed Sub-County Data</Title>}
        style={{ marginTop: 24 }}
        bordered={false}
        className="dashboard-card"
      >
        <Table 
          columns={subCountyColumns} 
          dataSource={subCountyPerformanceData} 
          pagination={false}
          rowKey="name"
          bordered={false}
          style={{ borderRadius: '8px', overflow: 'hidden' }}
        />
      </Card>

      <Divider style={{ margin: '24px 0' }} />
      <Paragraph type="secondary" style={{ textAlign: 'center' }}>
        <InfoCircleOutlined style={{ marginRight: 8 }} />
        Data shown is for demonstration purposes only. In a production environment, this would display real-time data from the county education system.
      </Paragraph>
      
      {/* Export Modal */}
      <Modal
        title="Export County Dashboard"
        open={isExportModalVisible}
        onCancel={() => setIsExportModalVisible(false)}
        footer={null}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button 
            type="primary" 
            icon={<DownloadOutlined />} 
            block 
            onClick={() => handleExportFormat('Excel')}
          >
            Export as Excel
          </Button>
          <Button 
            icon={<DownloadOutlined />} 
            block 
            onClick={() => handleExportFormat('PDF')}
          >
            Export as PDF
          </Button>
        </Space>
      </Modal>
      
      {/* Sub-County Details Modal */}
      <Modal
        title={selectedSubCounty ? `${selectedSubCounty.name} Details` : 'Sub-County Details'}
        open={detailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailsModalVisible(false)}>
            Close
          </Button>,
          <Button 
            key="report" 
            type="primary" 
            onClick={() => {
              message.success(`Generating detailed report for ${selectedSubCounty?.name}`);
              setDetailsModalVisible(false);
            }}
          >
            Generate Report
          </Button>,
        ]}
        width={700}
      >
        {selectedSubCounty && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic 
                    title="Average Performance" 
                    value={selectedSubCounty.avg} 
                    suffix="%"
                    valueStyle={{ color: selectedSubCounty.avg >= 75 ? '#3f8600' : selectedSubCounty.avg >= 60 ? '#faad14' : '#cf1322' }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic 
                    title="Total Enrollment" 
                    value={selectedSubCounty.enrollment} 
                    formatter={(value) => `${value.toLocaleString()} students`}
                  />
                </Card>
              </Col>
            </Row>
            
            <Divider orientation="left">Performance Trend</Divider>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Progress 
                percent={selectedSubCounty.avg} 
                status={selectedSubCounty.trend >= 0 ? 'success' : 'exception'}
                style={{ flex: 1 }}
              />
              <div style={{ marginLeft: 16, color: selectedSubCounty.trend >= 0 ? '#3f8600' : '#cf1322' }}>
                {selectedSubCounty.trend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(selectedSubCounty.trend)}%
              </div>
            </div>
            
            <Divider orientation="left">Schools</Divider>
            <p>Total Schools: <strong>{selectedSubCounty.schools}</strong></p>
            <p>Click the button below to view all schools in this sub-county:</p>
            <Button 
              type="primary" 
              icon={<EyeOutlined />}
              onClick={() => {
                message.info(`Navigating to schools list for ${selectedSubCounty.name}`);
                setDetailsModalVisible(false);
              }}
            >
              View All Schools
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CountyDashboardPage;