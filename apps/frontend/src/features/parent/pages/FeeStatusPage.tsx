// apps/frontend/src/features/parent/pages/FeeStatusPage.tsx
import { useState, useEffect } from 'react';
import { Card, Col, Row, Statistic, Typography, Button, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DollarCircleOutlined, FilePdfOutlined, CheckCircleOutlined } from '@ant-design/icons';
import ChildSelector, { Child } from '../components/ChildSelector';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

// --- MOCK DATA ---
const mockChildren: Child[] = [
  { id: 'child1', name: 'Asha Kimani', className: 'Grade 6', schoolName: 'Nairobi Primary School' },
  { id: 'child2', name: 'David Kimani', className: 'Grade 3', schoolName: 'Nairobi Primary School' },
];

const mockFeeData: Record<string, any> = {
  'child1': {
    term: 'Term 1, 2023',
    totalBilled: 75000,
    totalPaid: 60000,
    balance: 15000,
    statement: [
      { key: '1', item: 'Tuition Fees', billed: 45000, paid: 45000, balance: 0, type: 'billed' },
      { key: '2', item: 'Transport Fees', billed: 15000, paid: 15000, balance: 0, type: 'billed' },
      { key: '3', item: 'Lunch Program', billed: 15000, paid: 0, balance: 15000, type: 'billed' },
      { key: '4', item: 'Payment Received (Receipt #1234)', billed: 0, paid: 60000, balance: 0, date: '2023-09-05', type: 'paid' },
    ]
  },
  'child2': {
    term: 'Term 1, 2023',
    totalBilled: 55000,
    totalPaid: 55000,
    balance: 0,
    statement: [
      { key: '1', item: 'Tuition Fees', billed: 40000, paid: 40000, balance: 0, type: 'billed' },
      { key: '2', item: 'Lunch Program', billed: 15000, paid: 15000, balance: 0, type: 'billed' },
      { key: '3', item: 'Payment Received (Receipt #1199)', billed: 0, paid: 55000, balance: 0, date: '2023-09-02', type: 'paid' },
    ]
  }
};

// --- TABLE COLUMNS ---
const statementColumns: ColumnsType<any> = [
  { title: 'Date', dataIndex: 'date', key: 'date', render: (date) => date || '---' },
  { title: 'Description', dataIndex: 'item', key: 'item' },
  { title: 'Billed (KES)', dataIndex: 'billed', key: 'billed', render: (val) => val > 0 ? val.toLocaleString() : '-' },
  { title: 'Paid (KES)', dataIndex: 'paid', key: 'paid', render: (val) => val > 0 ? <Text type="success">{val.toLocaleString()}</Text> : '-' },
  { title: 'Balance (KES)', dataIndex: 'balance', key: 'balance', render: (val) => val > 0 ? <Text type="danger">{val.toLocaleString()}</Text> : '0' },
];

const FeeStatusPage = () => {
  const [children] = useState<Child[]>(mockChildren);
  const [selectedChildId, setSelectedChildId] = useState<string>(mockChildren[0].id);
  const [feeData, setFeeData] = useState<any>(mockFeeData[selectedChildId]);

  useEffect(() => {
    setFeeData(mockFeeData[selectedChildId]);
    // TODO: API call here: GET /api/v1/parent/fees?childId=${selectedChildId}
  }, [selectedChildId]);
  
  const selectedChildName = children.find(c => c.id === selectedChildId)?.name;

  return (
    <div>
      <Title level={2}>Fee Status & Statements</Title>
      
      {/* The Child Selector Component */}
      <ChildSelector 
        childrenData={children} 
        selectedChildId={selectedChildId} 
        onChange={setSelectedChildId} 
      />

      <Title level={4}>Fee Statement for {selectedChildName}</Title>
      <Text type="secondary">Term: {feeData.term}</Text>

      <Row gutter={[16, 16]} style={{ marginTop: 24, marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic title="Total Billed" value={feeData.totalBilled} prefix="KES" />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic title="Total Paid" value={feeData.totalPaid} prefix="KES" valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic title="Outstanding Balance" value={feeData.balance} prefix="KES" valueStyle={{ color: feeData.balance > 0 ? '#cf1322' : '#3f8600' }} />
          </Card>
        </Col>
      </Row>

      <Card
        title="Detailed Statement"
        extra={
          <Button type="primary" ghost icon={<FilePdfOutlined />}>Download Statement</Button>
        }
      >
        <Table
          columns={statementColumns}
          dataSource={feeData.statement}
          pagination={false}
          rowClassName={(record) => record.type === 'paid' ? 'ant-table-row-selected' : ''}
        />
      </Card>
    </div>
  );
};

export default FeeStatusPage;