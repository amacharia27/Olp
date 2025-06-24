import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Tag, DatePicker, Select, Input, Card, Typography, Tooltip, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { 
  DownloadOutlined, 
  FileExcelOutlined, 
  FilePdfOutlined, 
  SearchOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  ClockCircleOutlined,
  PrinterOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

export interface BillingRecord {
  key: string;
  invoiceNumber: string;
  schoolName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId?: string;
  date: string;
  dueDate?: string;
  studentCount: number;
}

interface BillingHistoryTableProps {
  data: BillingRecord[];
  loading?: boolean;
  onDownloadInvoice?: (record: BillingRecord) => void;
  onSendReminder?: (record: BillingRecord) => void;
  onMarkAsPaid?: (record: BillingRecord) => void;
}

const BillingHistoryTable: React.FC<BillingHistoryTableProps> = ({
  data,
  loading = false,
  onDownloadInvoice,
  onSendReminder,
  onMarkAsPaid
}) => {
  const [filteredData, setFilteredData] = useState<BillingRecord[]>(data);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [paymentMethodFilter, setPaymentMethodFilter] = useState<string | null>(null);

  useEffect(() => {
    let result = [...data];
    
    // Apply search filter
    if (searchText) {
      result = result.filter(
        record => 
          record.schoolName.toLowerCase().includes(searchText.toLowerCase()) ||
          record.invoiceNumber.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    
    // Apply date range filter
    if (dateRange && dateRange[0] && dateRange[1]) {
      result = result.filter(record => {
        const recordDate = dayjs(record.date);
        return recordDate.isAfter(dateRange[0]) && recordDate.isBefore(dateRange[1]);
      });
    }
    
    // Apply status filter
    if (statusFilter) {
      result = result.filter(record => record.status === statusFilter);
    }
    
    // Apply payment method filter
    if (paymentMethodFilter) {
      result = result.filter(record => record.paymentMethod === paymentMethodFilter);
    }
    
    setFilteredData(result);
  }, [data, searchText, dateRange, statusFilter, paymentMethodFilter]);

  const handleExportCSV = () => {
    // Implementation for CSV export would go here
    console.log('Exporting to CSV:', filteredData);
  };

  const handleExportExcel = () => {
    // Implementation for Excel export would go here
    console.log('Exporting to Excel:', filteredData);
  };

  const handleExportPDF = () => {
    // Implementation for PDF export would go here
    console.log('Exporting to PDF:', filteredData);
  };

  const handlePrint = () => {
    // Implementation for printing would go here
    console.log('Printing:', filteredData);
  };

  const handleReset = () => {
    setSearchText('');
    setDateRange(null);
    setStatusFilter(null);
    setPaymentMethodFilter(null);
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'paid':
        return <Tag icon={<CheckCircleOutlined />} color="success">Paid</Tag>;
      case 'pending':
        return <Tag icon={<ClockCircleOutlined />} color="processing">Pending</Tag>;
      case 'overdue':
        return <Tag icon={<ClockCircleOutlined />} color="error">Overdue</Tag>;
      case 'failed':
        return <Tag icon={<CloseCircleOutlined />} color="error">Failed</Tag>;
      case 'refunded':
        return <Tag color="default">Refunded</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const columns: ColumnsType<BillingRecord> = [
    {
      title: 'Invoice #',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      sorter: (a, b) => a.invoiceNumber.localeCompare(b.invoiceNumber),
    },
    {
      title: 'School',
      dataIndex: 'schoolName',
      key: 'schoolName',
      sorter: (a, b) => a.schoolName.localeCompare(b.schoolName),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: 'Amount (KES)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => amount.toLocaleString(),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Students',
      dataIndex: 'studentCount',
      key: 'studentCount',
      sorter: (a, b) => a.studentCount - b.studentCount,
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      filters: [
        { text: 'M-Pesa', value: 'M-Pesa' },
        { text: 'Bank Transfer', value: 'Bank Transfer' },
        { text: 'Credit Card', value: 'Credit Card' },
      ],
      onFilter: (value, record) => record.paymentMethod === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'Paid', value: 'paid' },
        { text: 'Pending', value: 'pending' },
        { text: 'Overdue', value: 'overdue' },
        { text: 'Failed', value: 'failed' },
        { text: 'Refunded', value: 'refunded' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Download Invoice">
            <Button 
              type="text" 
              icon={<DownloadOutlined />} 
              onClick={() => onDownloadInvoice && onDownloadInvoice(record)} 
            />
          </Tooltip>
          
          {record.status === 'pending' || record.status === 'overdue' ? (
            <Tooltip title="Send Payment Reminder">
              <Button 
                type="text" 
                danger={record.status === 'overdue'}
                onClick={() => onSendReminder && onSendReminder(record)} 
              >
                Remind
              </Button>
            </Tooltip>
          ) : null}
          
          {record.status === 'pending' || record.status === 'overdue' ? (
            <Tooltip title="Mark as Paid">
              <Button 
                type="text" 
                onClick={() => onMarkAsPaid && onMarkAsPaid(record)} 
              >
                Mark Paid
              </Button>
            </Tooltip>
          ) : null}
        </Space>
      ),
    },
  ];

  const paymentMethods = Array.from(new Set(data.map(item => item.paymentMethod)));

  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <Title level={4} style={{ margin: 0 }}>
            Billing History
            <Badge 
              count={filteredData.length} 
              style={{ backgroundColor: '#52c41a', marginLeft: 8 }} 
              overflowCount={999} 
            />
          </Title>
          
          <Space>
            <Tooltip title="Export to CSV">
              <Button icon={<DownloadOutlined />} onClick={handleExportCSV}>CSV</Button>
            </Tooltip>
            <Tooltip title="Export to Excel">
              <Button icon={<FileExcelOutlined />} onClick={handleExportExcel}>Excel</Button>
            </Tooltip>
            <Tooltip title="Export to PDF">
              <Button icon={<FilePdfOutlined />} onClick={handleExportPDF}>PDF</Button>
            </Tooltip>
            <Tooltip title="Print">
              <Button icon={<PrinterOutlined />} onClick={handlePrint}>Print</Button>
            </Tooltip>
          </Space>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <Input
            placeholder="Search by school or invoice #"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
            prefix={<SearchOutlined />}
            allowClear
          />
          
          <RangePicker 
            value={dateRange}
            onChange={(dates) => setDateRange(dates)}
            style={{ width: 250 }}
          />
          
          <Select
            placeholder="Filter by status"
            style={{ width: 150 }}
            value={statusFilter}
            onChange={setStatusFilter}
            allowClear
          >
            <Option value="paid">Paid</Option>
            <Option value="pending">Pending</Option>
            <Option value="overdue">Overdue</Option>
            <Option value="failed">Failed</Option>
            <Option value="refunded">Refunded</Option>
          </Select>
          
          <Select
            placeholder="Payment method"
            style={{ width: 150 }}
            value={paymentMethodFilter}
            onChange={setPaymentMethodFilter}
            allowClear
          >
            {paymentMethods.map(method => (
              <Option key={method} value={method}>{method}</Option>
            ))}
          </Select>
          
          <Button onClick={handleReset}>Reset Filters</Button>
        </div>
        
        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}
          summary={(pageData) => {
            const totalAmount = pageData.reduce((sum, record) => sum + record.amount, 0);
            
            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={3}>
                    <Text strong>Total</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <Text strong>{totalAmount.toLocaleString()} KES</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2} colSpan={4}></Table.Summary.Cell>
                </Table.Summary.Row>
              </>
            );
          }}
        />
      </Space>
    </Card>
  );
};

export default BillingHistoryTable;
