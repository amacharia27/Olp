import React from 'react';
import { Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  ExclamationCircleOutlined 
} from '@ant-design/icons';

interface Transaction {
  key: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'completed' | 'pending' | 'failed';
  category: string;
}

interface TransactionsTableProps {
  data: Transaction[];
  loading?: boolean;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ data, loading = false }) => {
  const statusTag = (status: string) => {
    switch (status) {
      case 'completed':
        return <Tag icon={<CheckCircleOutlined />} color="success">Completed</Tag>;
      case 'pending':
        return <Tag icon={<ClockCircleOutlined />} color="warning">Pending</Tag>;
      case 'failed':
        return <Tag icon={<ExclamationCircleOutlined />} color="error">Failed</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const amountRender = (amount: number, record: Transaction) => (
    <span style={{ color: record.type === 'credit' ? '#52c41a' : '#f5222d' }}>
      {record.type === 'credit' ? '+' : '-'} KES {amount.toLocaleString()}
    </span>
  );

  const columns = [
    { 
      title: 'Date', 
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('MMM D, YYYY'),
      sorter: (a: Transaction, b: Transaction) => 
        dayjs(a.date).unix() - dayjs(b.date).unix()
    },
    { 
      title: 'Description', 
      dataIndex: 'description',
      key: 'description',
      ellipsis: true
    },
    { 
      title: 'Category', 
      dataIndex: 'category',
      key: 'category',
      filters: [
        { text: 'Tuition', value: 'Tuition' },
        { text: 'Fines', value: 'Fines' },
        { text: 'Supplies', value: 'Supplies' },
        { text: 'Equipment', value: 'Equipment' },
        { text: 'Activities', value: 'Activities' },
        { text: 'Salaries', value: 'Salaries' },
      ],
      onFilter: (value: any, record: Transaction) => record.category.includes(value),
    },
    { 
      title: 'Amount', 
      dataIndex: 'amount',
      key: 'amount',
      render: amountRender,
      sorter: (a: Transaction, b: Transaction) => a.amount - b.amount,
    },
    { 
      title: 'Status', 
      dataIndex: 'status',
      key: 'status',
      render: statusTag,
      filters: [
        { text: 'Completed', value: 'completed' },
        { text: 'Pending', value: 'pending' },
        { text: 'Failed', value: 'failed' },
      ],
      onFilter: (value: any, record: Transaction) => record.status === value,
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={data} 
      loading={loading}
      rowKey="key"
      pagination={{ pageSize: 5 }}
      scroll={{ x: true }}
    />
  );
};

export default TransactionsTable;
