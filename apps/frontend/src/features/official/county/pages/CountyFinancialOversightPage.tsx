// apps/frontend/src/features/official/county/pages/CountyFinancialOversightPage.tsx
import { Typography, Card, Row, Col, Statistic, Table, Progress, Space, Divider, Button, Badge, Avatar, Modal, message, Drawer, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarOutlined, ArrowUpOutlined, ArrowDownOutlined, CheckCircleOutlined, InfoCircleOutlined, DownloadOutlined, FileExcelOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { exportToExcel, exportToPdf } from '../utils/actionUtils';

const { Title, Paragraph, Text } = Typography;
// Using Card's built-in tabs, not the Tabs component

// --- MOCK DATA ---
const financialSummary = {
  totalBudget: 1250000000,
  disbursed: 980000000,
  remaining: 270000000,
  utilizationRate: 78.4,
  lastUpdated: 'June 21, 2025'
};

const subCountyFinancialData = [
  { id: 1, name: 'Westlands', schools: 28, allocated: 320000000, disbursed: 290000000, utilization: 90.6, status: 'On Track' },
  { id: 2, name: 'Kasarani', schools: 32, allocated: 280000000, disbursed: 210000000, utilization: 75.0, status: 'On Track' },
  { id: 3, name: 'Dagoretti', schools: 25, allocated: 240000000, disbursed: 220000000, utilization: 91.7, status: 'On Track' },
  { id: 4, name: 'Embakasi', schools: 42, allocated: 350000000, disbursed: 220000000, utilization: 62.9, status: 'Under Review' },
  { id: 5, name: 'Starehe', schools: 26, allocated: 210000000, disbursed: 180000000, utilization: 85.7, status: 'On Track' },
];

// Monthly disbursement data for line chart
const monthlyDisbursementData = [
  { month: 'Jan', amount: 85000000, target: 100000000 },
  { month: 'Feb', amount: 92000000, target: 100000000 },
  { month: 'Mar', amount: 98000000, target: 100000000 },
  { month: 'Apr', amount: 105000000, target: 100000000 },
  { month: 'May', amount: 110000000, target: 100000000 },
  { month: 'Jun', amount: 115000000, target: 100000000 },
];

// Allocation by category for pie chart
const allocationByCategory = [
  { name: 'Infrastructure', value: 450000000, color: '#1890ff' },
  { name: 'Learning Materials', value: 320000000, color: '#52c41a' },
  { name: 'Teacher Development', value: 180000000, color: '#faad14' },
  { name: 'Student Programs', value: 150000000, color: '#722ed1' },
  { name: 'Administration', value: 150000000, color: '#f5222d' },
];

const COLORS = ['#1890ff', '#52c41a', '#faad14', '#722ed1', '#f5222d'];

const CountyFinancialOversightPage = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);
  const [selectedSubCounty, setSelectedSubCounty] = useState<any>(null);

  // Handle export report button click
  const handleExportReport = () => {
    setIsExportModalVisible(true);
  };

  // Handle export format selection
  const handleExportFormat = (format: string) => {
    setIsExportModalVisible(false);
    const reportName = activeTab === '1' ? 'Sub-County-Financial-Report' : 'Financial-Analytics-Report';
    
    if (format === 'Excel') {
      exportToExcel(subCountyFinancialData, reportName);
    } else if (format === 'PDF') {
      exportToPdf(subCountyFinancialData, reportName);
    }
  };

  // Handle view details button click
  const handleViewDetails = (record: any) => {
    // Enhance the record with additional mock data for the details view
    const enhancedRecord = {
      ...record,
      lastUpdated: 'June 21, 2025',
      contactPerson: 'Jane Smith',
      contactEmail: 'jane.smith@county.go.ke',
      contactPhone: '+254 712 345 678',
      monthlyData: [
        { month: 'Jan', disbursed: Math.round(record.allocated * 0.15), planned: Math.round(record.allocated * 0.17) },
        { month: 'Feb', disbursed: Math.round(record.allocated * 0.18), planned: Math.round(record.allocated * 0.17) },
        { month: 'Mar', disbursed: Math.round(record.allocated * 0.16), planned: Math.round(record.allocated * 0.17) },
        { month: 'Apr', disbursed: Math.round(record.allocated * 0.17), planned: Math.round(record.allocated * 0.17) },
        { month: 'May', disbursed: Math.round(record.allocated * 0.19), planned: Math.round(record.allocated * 0.16) },
        { month: 'Jun', disbursed: Math.round(record.allocated * 0.15), planned: Math.round(record.allocated * 0.16) },
      ],
      allocationBreakdown: [
        { category: 'Infrastructure', amount: Math.round(record.allocated * 0.35) },
        { category: 'Learning Materials', amount: Math.round(record.allocated * 0.25) },
        { category: 'Teacher Development', amount: Math.round(record.allocated * 0.15) },
        { category: 'Student Programs', amount: Math.round(record.allocated * 0.15) },
        { category: 'Administration', amount: Math.round(record.allocated * 0.10) },
      ],
      flaggedItems: record.utilization < 70 ? [
        { description: 'Low utilization rate', severity: 'High', recommendation: 'Review implementation capacity' },
        { description: 'Delayed project implementation', severity: 'Medium', recommendation: 'Accelerate procurement process' },
      ] : [],
    };
    
    setSelectedSubCounty(enhancedRecord);
    setDetailsDrawerVisible(true);
  };

  const getStatusColor = (status: string): string => {
    switch(status) {
      case 'On Track': return 'success';
      case 'Under Review': return 'warning';
      case 'At Risk': return 'error';
      default: return 'default';
    }
  };

  const columns: ColumnsType<any> = [
    { 
      title: 'Sub-County', 
      dataIndex: 'name', 
      key: 'name',
      render: (text: string) => (
        <Space>
          <Avatar style={{ backgroundColor: '#1890ff' }}>{text.charAt(0)}</Avatar>
          <Text strong>{text}</Text>
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
      title: 'Allocated Budget', 
      dataIndex: 'allocated', 
      key: 'allocated',
      align: 'right',
      sorter: (a: any, b: any) => a.allocated - b.allocated,
      render: (val: number) => <Text>KES {(val / 1000000).toFixed(1)}M</Text>
    },
    { 
      title: 'Disbursed', 
      dataIndex: 'disbursed', 
      key: 'disbursed',
      align: 'right',
      sorter: (a: any, b: any) => a.disbursed - b.disbursed,
      render: (val: number) => <Text>KES {(val / 1000000).toFixed(1)}M</Text>
    },
    { 
      title: 'Utilization', 
      dataIndex: 'utilization', 
      key: 'utilization',
      sorter: (a: any, b: any) => a.utilization - b.utilization,
      render: (val: number) => (
        <Progress 
          percent={val} 
          size="small" 
          strokeColor={{
            from: '#108ee9',
            to: '#87d068',
          }}
          format={(percent?: number) => `${percent?.toFixed(1)}%`}
        />
      )
    },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      align: 'center',
      render: (status: string) => (
        <Badge status={getStatusColor(status) as "success" | "warning" | "error" | "default" | "processing" | undefined} text={status} />
      )
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Button 
          type="link" 
          size="small"
          onClick={() => handleViewDetails(record)}
        >
          View Details
        </Button>
      )
    },
  ];

  return (
    <div style={{ padding: '0 12px' }}>
      <div style={{ 
        background: 'linear-gradient(135deg, #52c41a 0%, #237804 100%)', 
        padding: '24px', 
        borderRadius: '8px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}>
        <Title level={2} style={{ color: 'white', margin: 0 }}>Financial Oversight</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 0 }}>
          Comprehensive financial management and oversight for county education budget allocation and utilization.
        </Paragraph>
        <Text style={{ color: 'rgba(255,255,255,0.65)' }}>
          <InfoCircleOutlined style={{ marginRight: 8 }} />
          Last updated: {financialSummary.lastUpdated}
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable style={{ height: '100%' }} bodyStyle={{ padding: '24px' }}>
            <Statistic 
              title={<Text strong>Total Budget</Text>} 
              value={financialSummary.totalBudget} 
              prefix={<DollarOutlined style={{ color: '#1890ff' }} />}
              valueStyle={{ color: '#1890ff' }}
              formatter={(val) => {
                if (typeof val === 'number') {
                  return `KES ${(val / 1000000).toFixed(1)}M`;
                }
                return val?.toString();
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable style={{ height: '100%' }} bodyStyle={{ padding: '24px' }}>
            <Statistic 
              title={<Text strong>Disbursed</Text>} 
              value={financialSummary.disbursed} 
              prefix={<ArrowUpOutlined style={{ color: '#52c41a' }} />}
              valueStyle={{ color: '#52c41a' }}
              formatter={(val) => {
                if (typeof val === 'number') {
                  return `KES ${(val / 1000000).toFixed(1)}M`;
                }
                return val?.toString();
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable style={{ height: '100%' }} bodyStyle={{ padding: '24px' }}>
            <Statistic 
              title={<Text strong>Remaining</Text>} 
              value={financialSummary.remaining} 
              prefix={<ArrowDownOutlined style={{ color: '#faad14' }} />}
              valueStyle={{ color: '#faad14' }}
              formatter={(val) => {
                if (typeof val === 'number') {
                  return `KES ${(val / 1000000).toFixed(1)}M`;
                }
                return val?.toString();
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable style={{ height: '100%' }} bodyStyle={{ padding: '24px' }}>
            <Statistic 
              title={<Text strong>Utilization Rate</Text>} 
              value={financialSummary.utilizationRate} 
              prefix={<CheckCircleOutlined style={{ color: '#722ed1' }} />}
              valueStyle={{ color: '#722ed1' }}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Card 
        style={{ marginTop: 24 }}
        bordered={false}
        className="dashboard-card"
        tabList={[
          { key: '1', tab: 'Sub-County Allocation' },
          { key: '2', tab: 'Financial Analytics' },
        ]} // Using Card's built-in tabs, not the Tabs component
        activeTabKey={activeTab}
        onTabChange={key => setActiveTab(key)}
        extra={
          <Button 
            type="primary" 
            icon={<DownloadOutlined />}
            onClick={handleExportReport}
          >
            Export Report
          </Button>
        }
      >
        {activeTab === '1' ? (
          <Table 
            columns={columns} 
            dataSource={subCountyFinancialData} 
            rowKey="id"
            pagination={false}
            bordered={false}
            style={{ borderRadius: '8px', overflow: 'hidden' }}
          />
        ) : (
          <div>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card title={<Title level={4}>Monthly Disbursement Trend</Title>} bordered={false}>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={monthlyDisbursementData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tickFormatter={(value: number) => `${(value / 1000000).toFixed(0)}M`}
                      />
                      <Tooltip 
                        formatter={(value: number) => [`KES ${(value / 1000000).toFixed(1)}M`, 'Amount']}
                        contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="#1890ff" 
                        strokeWidth={2} 
                        activeDot={{ r: 8 }} 
                        name="Disbursed"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="#52c41a" 
                        strokeWidth={2} 
                        strokeDasharray="5 5" 
                        name="Target"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title={<Title level={4}>Budget Allocation by Category</Title>} bordered={false}>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={allocationByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }: { name: string, percent?: number }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
                      >
                        {allocationByCategory.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `KES ${(value / 1000000).toFixed(1)}M`} />
                    </PieChart>
                  </ResponsiveContainer>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </Card>

      <Divider style={{ margin: '24px 0' }} />
      <Paragraph type="secondary" style={{ textAlign: 'center' }}>
        <InfoCircleOutlined style={{ marginRight: 8 }} />
        Financial data is updated monthly based on reports from the County Treasury and Ministry of Education.
      </Paragraph>

      {/* Export Modal */}
      <Modal
        title="Export Financial Report"
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

      {/* Details Drawer */}
      <Drawer
        title={selectedSubCounty ? `${selectedSubCounty.name} Financial Details` : 'Financial Details'}
        placement="right"
        width={600}
        onClose={() => setDetailsDrawerVisible(false)}
        open={detailsDrawerVisible}
      >
        {selectedSubCounty && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card>
                  <Typography.Title level={4}>{selectedSubCounty.name} Sub-County</Typography.Title>
                  <Badge status={getStatusColor(selectedSubCounty.status) as "success" | "warning" | "error" | "default" | "processing" | undefined} text={selectedSubCounty.status} />
                  <p style={{ marginTop: 8 }}>Last Updated: {selectedSubCounty.lastUpdated}</p>
                </Card>
              </Col>
            </Row>
            
            <Divider orientation="left">Financial Summary</Divider>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic
                    title="Allocated Budget"
                    value={selectedSubCounty.allocated}
                    precision={0}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<DollarOutlined />}
                    formatter={(val) => {
                      if (typeof val === 'number') {
                        return `KES ${(val / 1000000).toFixed(1)}M`;
                      }
                      return val?.toString();
                    }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic
                    title="Disbursed"
                    value={selectedSubCounty.disbursed}
                    precision={0}
                    valueStyle={{ color: '#1890ff' }}
                    prefix={<ArrowUpOutlined />}
                    formatter={(val) => {
                      if (typeof val === 'number') {
                        return `KES ${(val / 1000000).toFixed(1)}M`;
                      }
                      return val?.toString();
                    }}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic
                    title="Utilization Rate"
                    value={selectedSubCounty.utilization}
                    precision={1}
                    valueStyle={{ color: selectedSubCounty.utilization > 80 ? '#3f8600' : selectedSubCounty.utilization > 60 ? '#faad14' : '#f5222d' }}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic
                    title="Number of Schools"
                    value={selectedSubCounty.schools}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
            </Row>
            
            <Divider orientation="left">Monthly Disbursement</Divider>
            <Card>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={selectedSubCounty.monthlyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                  <Tooltip formatter={(value) => `KES ${(Number(value) / 1000000).toFixed(1)}M`} />
                  <Legend />
                  <Line type="monotone" dataKey="disbursed" stroke="#8884d8" name="Disbursed" />
                  <Line type="monotone" dataKey="planned" stroke="#82ca9d" name="Planned" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
            
            <Divider orientation="left">Allocation Breakdown</Divider>
            <Card>
              <Row gutter={[16, 16]}>
                {selectedSubCounty.allocationBreakdown.map((item: any, index: number) => (
                  <Col span={12} key={index}>
                    <Card size="small">
                      <p><strong>{item.category}</strong></p>
                      <p>KES {(item.amount / 1000000).toFixed(1)}M</p>
                      <Progress 
                        percent={Math.round((item.amount / selectedSubCounty.allocated) * 100)} 
                        size="small" 
                        showInfo={false} 
                        strokeColor={COLORS[index % COLORS.length]} 
                      />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
            
            {selectedSubCounty.flaggedItems && selectedSubCounty.flaggedItems.length > 0 && (
              <>
                <Divider orientation="left">Flagged Items</Divider>
                {selectedSubCounty.flaggedItems.map((item: any, index: number) => (
                  <Card key={index} style={{ marginBottom: 8 }} size="small">
                    <p>
                      <Tag color={item.severity === 'High' ? 'red' : item.severity === 'Medium' ? 'orange' : 'blue'}>
                        {item.severity}
                      </Tag> 
                      {item.description}
                    </p>
                    <p><strong>Recommendation:</strong> {item.recommendation}</p>
                  </Card>
                ))}
              </>
            )}
            
            <Divider orientation="left">Contact Information</Divider>
            <p><strong>Contact Person:</strong> {selectedSubCounty.contactPerson}</p>
            <p><strong>Email:</strong> {selectedSubCounty.contactEmail}</p>
            <p><strong>Phone:</strong> {selectedSubCounty.contactPhone}</p>
            
            <Divider orientation="left">Actions</Divider>
            <Space>
              <Button type="primary" onClick={() => {
                message.success(`Approved budget for ${selectedSubCounty.name}`);
                setDetailsDrawerVisible(false);
              }}>
                Approve Budget
              </Button>
              <Button onClick={() => {
                message.info(`Requested additional information for ${selectedSubCounty.name}`);
              }}>
                Request Information
              </Button>
              <Button type="default" icon={<FileExcelOutlined />} onClick={() => {
                exportToExcel([selectedSubCounty], `${selectedSubCounty.name}_Financial_Details`);
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

export default CountyFinancialOversightPage;
