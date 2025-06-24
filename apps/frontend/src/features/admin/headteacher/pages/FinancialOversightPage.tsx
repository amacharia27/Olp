// apps/frontend/src/features/admin/headteacher/pages/FinancialOversightPage.tsx
import React from 'react';
import { Card, Table, Typography, Statistic, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title, Paragraph } = Typography;

// --- MOCK DATA ---
const capitationData = {
  expected: 12500000,
  received: 9800000,
  balance: 2700000,
  lastTrancheDate: '2023-09-05',
};

const bursaryData = [
  { key: '1', studentName: 'Jane Doe', fund: 'CDF Bursary', amount: 15000, status: 'Approved', date: '2023-10-10' },
  { key: '2', studentName: 'John Smith', fund: 'County Fund', amount: 10000, status: 'Paid', date: '2023-10-05' },
  { key: '3', studentName: 'Alice Johnson', fund: 'ABC Foundation (NGO)', amount: 25000, status: 'Paid', date: '2023-09-20' },
  { key: '4', studentName: 'Peter Jones', fund: 'CDF Bursary', amount: 15000, status: 'Pending', date: '2023-10-18' },
];

const FinancialOversightPage = () => {

  const bursaryColumns: ColumnsType<any> = [
    { title: 'Student Name', dataIndex: 'studentName' },
    { title: 'Funding Source', dataIndex: 'fund' },
    { title: 'Amount (KES)', dataIndex: 'amount', render: (val) => val.toLocaleString() },
    { title: 'Status', dataIndex: 'status' },
    { title: 'Date', dataIndex: 'date' },
  ];

  return (
    <div>
      <Title level={2}>Financial Oversight</Title>
      <Paragraph type="secondary">A high-level view of government and donor funds. For detailed school fee management, please see the Finance Administrator's dashboard.</Paragraph>
      
      <Card title="Government Capitation Status (Term 1, 2023)" style={{ marginBottom: 24 }}>
        <Row gutter={16}>
          <Col span={8}><Statistic title="Total Expected" value={capitationData.expected} prefix="KES" /></Col>
          <Col span={8}><Statistic title="Total Received" value={capitationData.received} prefix="KES" valueStyle={{color: '#3f8600'}} /></Col>
          <Col span={8}><Statistic title="Outstanding Balance" value={capitationData.balance} prefix="KES" valueStyle={{color: '#cf1322'}} /></Col>
        </Row>
      </Card>

      <Card title="External Bursary & Donor Funds Tracking">
        <Table columns={bursaryColumns} dataSource={bursaryData} />
      </Card>
    </div>
  );
};

export default FinancialOversightPage;