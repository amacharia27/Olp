// apps/frontend/src/features/admin/finance/pages/InvoicingPage.tsx
import { useState } from 'react';
import {
  Card, Table, Typography, Button, Space, Tag, Select,
  Input, message, Popconfirm, Progress
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EyeOutlined, ThunderboltOutlined, MailOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// --- MOCK DATA ---
const invoiceData = [
  { 
    key: '1', 
    invoiceId: 'INV-2023-001', 
    studentName: 'Asha Kimani', 
    className: 'Grade 6', 
    amount: 75000, 
    status: 'Partially Paid', 
    dueDate: '2023-09-15' 
  },
  { 
    key: '2', 
    invoiceId: 'INV-2023-002', 
    studentName: 'Brian Omondi', 
    className: 'Grade 6', 
    amount: 60000, 
    status: 'Paid', 
    dueDate: '2023-09-15' 
  },
  { 
    key: '3', 
    invoiceId: 'INV-2023-003', 
    studentName: 'Fatima Yusuf', 
    className: 'Grade 6', 
    amount: 75000, 
    status: 'Unpaid', 
    dueDate: '2023-09-15' 
  },
  { 
    key: '4', 
    invoiceId: 'INV-2023-004', 
    studentName: 'David Mwangi', 
    className: 'Grade 5', 
    amount: 57000, 
    status: 'Paid', 
    dueDate: '2023-09-15' 
  },
];

const InvoicingPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedTerm, setSelectedTerm] = useState('T1_2024');

  const handleGenerateInvoices = () => {
    setIsGenerating(true);
    setProgress(0);

    // Simulate a batch process with progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          message.success(`Term ${selectedTerm} invoices generated for all students!`);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  const columns: ColumnsType<typeof invoiceData[0]> = [
    { 
      title: 'Invoice ID', 
      dataIndex: 'invoiceId', 
      key: 'invoiceId' 
    },
    { 
      title: 'Student Name', 
      dataIndex: 'studentName', 
      key: 'studentName' 
    },
    { 
      title: 'Class', 
      dataIndex: 'className', 
      key: 'className' 
    },
    { 
      title: 'Amount (KES)', 
      dataIndex: 'amount', 
      key: 'amount', 
      render: (val: number) => val.toLocaleString() 
    },
    { 
      title: 'Due Date', 
      dataIndex: 'dueDate', 
      key: 'dueDate' 
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'gold';
        if (status === 'Paid') color = 'success';
        if (status === 'Unpaid') color = 'error';
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space size="small">
          <Button size="small" icon={<EyeOutlined />}>View</Button>
          <Button size="small" icon={<MailOutlined />}>Remind</Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <Title level={2}>Invoicing</Title>
      
      <Card style={{ marginBottom: 24 }}>
        <Title level={4}>Batch Invoice Generation</Title>
        <Paragraph type="secondary">
          Use this tool at the beginning of a term to automatically generate fee invoices 
          for every active student based on the current fee structure.
        </Paragraph>
        
        <Space wrap>
          <Text>For Term:</Text>
          <Select 
            value={selectedTerm}
            onChange={setSelectedTerm}
            style={{ width: 200 }}
            disabled={isGenerating}
          >
            <Select.Option value="T1_2024">Term 1, 2024</Select.Option>
            <Select.Option value="T2_2024">Term 2, 2024</Select.Option>
            <Select.Option value="T3_2024">Term 3, 2024</Select.Option>
          </Select>
          
          <Popconfirm
            title="Are you sure you want to generate invoices?"
            description={`This will create new invoices for ALL active students for ${selectedTerm}. This action cannot be undone.`}
            onConfirm={handleGenerateInvoices}
            okText="Generate Invoices"
            cancelText="Cancel"
            disabled={isGenerating}
          >
            <Button 
              type="primary" 
              icon={<ThunderboltOutlined />} 
              loading={isGenerating}
            >
              Generate Termly Invoices
            </Button>
          </Popconfirm>
        </Space>

        {isGenerating && (
          <div style={{ marginTop: 16 }}>
            <Progress percent={progress} status="active" />
            <Text type="secondary">Generating invoices, please wait...</Text>
          </div>
        )}
      </Card>

      <Card 
        title={`Generated Invoices for ${selectedTerm.replace('_', ' ')}`}
        style={{ marginBottom: 24 }}
      >
        <Input.Search 
          placeholder="Search by Invoice ID or Student Name" 
          style={{ marginBottom: 16, maxWidth: 400 }} 
        />
        <Table 
          columns={columns} 
          dataSource={invoiceData} 
          pagination={{ pageSize: 10 }}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  );
};

export default InvoicingPage;