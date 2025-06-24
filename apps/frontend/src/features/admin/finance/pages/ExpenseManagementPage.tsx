// apps/frontend/src/features/admin/finance/pages/ExpenseManagementPage.tsx
import { useState } from 'react';
import {
  Card, Table, Typography, Button, Space, Modal, Form, Input,
  InputNumber, Select, DatePicker, Row, Col, message, Popconfirm, Tag,
  Statistic
} from 'antd';
import type { ColumnsType } from 'antd/es/table/interface';
import type { SelectProps } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ArrowDownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title } = Typography;

// --- MOCK DATA ---
const expenseData = [
  { key: '1', date: '2023-10-25', category: 'Utilities', description: 'KPLC Electricity Bill - October', amount: 55000, paidTo: 'Kenya Power', status: 'Paid' },
  { key: '2', date: '2023-10-24', category: 'Supplies', description: 'Purchase of whiteboard markers and printing paper', amount: 25000, paidTo: 'Text Book Centre', status: 'Paid' },
  { key: '3', date: '2023-10-20', category: 'Maintenance', description: 'Repair of leaking roof in Block B', amount: 80000, paidTo: 'Kamau Contractors', status: 'Paid' },
  { key: '4', date: '2023-10-15', category: 'Salaries', description: 'October Salaries - Teaching Staff', amount: 1200000, paidTo: 'Staff Payroll', status: 'Paid' },
  { key: '5', date: '2023-11-01', category: 'Utilities', description: 'Nairobi Water Bill - November', amount: 35000, paidTo: 'NCWSC', status: 'Pending' },
];

const expenseCategories: SelectProps['options'] = [
  { label: 'Salaries', value: 'Salaries' },
  { label: 'Utilities', value: 'Utilities' },
  { label: 'Office & School Supplies', value: 'Supplies' },
  { label: 'Maintenance & Repairs', value: 'Maintenance' },
  { label: 'Infrastructure Projects', value: 'Projects' },
  { label: 'Other', value: 'Other' },
];

const tableFilters = [
  { text: 'Salaries', value: 'Salaries' },
  { text: 'Utilities', value: 'Utilities' },
  { text: 'Supplies', value: 'Supplies' },
  { text: 'Maintenance', value: 'Maintenance' },
  { text: 'Projects', value: 'Projects' },
  { text: 'Other', value: 'Other' },
];

const ExpenseManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [form] = Form.useForm();

  const showExpenseModal = (record: any = null) => {
    setEditingRecord(record);
    // When editing, convert date string back to a dayjs object for the DatePicker
    const formValues = record ? { ...record, date: dayjs(record.date) } : { date: dayjs() };
    form.setFieldsValue(formValues);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = () => {
    const action = editingRecord ? 'updated' : 'logged';
    message.success(`Expense has been ${action} successfully!`);
    // TODO: API Call to save the expense
    setIsModalVisible(false);
  };
  
  const totalExpensesThisMonth = expenseData
    .filter(e => dayjs(e.date).isSame(dayjs(), 'month'))
    .reduce((sum, item) => sum + item.amount, 0);

  const columns: ColumnsType<any> = [
    { title: 'Date', dataIndex: 'date', key: 'date', defaultSortOrder: 'descend', sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix() },
    { title: 'Category', dataIndex: 'category', key: 'category', filters: tableFilters, onFilter: (value, record) => record.category === value },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Amount (KES)', dataIndex: 'amount', key: 'amount', render: (val) => val.toLocaleString(), sorter: (a, b) => a.amount - b.amount },
    { title: 'Paid To', dataIndex: 'paidTo', key: 'paidTo' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => <Tag color={status === 'Paid' ? 'green' : 'gold'}>{status}</Tag> },
    {
      title: 'Actions', key: 'actions', render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => showExpenseModal(record)} />
          <Popconfirm title="Are you sure?" onConfirm={() => message.success('Expense deleted!')}>
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Expense Management</Title>
      
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title={`Total Expenses - ${dayjs().format('MMMM')}`}
              value={totalExpensesThisMonth}
              prefix="KES"
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
           <Card>
             <Statistic title="Highest Expense Category" value="Salaries" prefix={<ArrowDownOutlined />} />
           </Card>
        </Col>
      </Row>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showExpenseModal()}>
            Log New Expense
          </Button>
        </div>
        <Table columns={columns} dataSource={expenseData} bordered />
      </Card>
      
      <Modal
        title={editingRecord ? 'Edit Expense Record' : 'Log New Expense'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item name="date" label="Date of Expense" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="category" label="Expense Category" rules={[{ required: true }]}>
            <Select options={expenseCategories} placeholder="Select category" />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input.TextArea rows={2} placeholder="e.g., KPLC Electricity Bill - October" />
          </Form.Item>
          <Form.Item name="amount" label="Amount (KES)" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
           <Form.Item name="paidTo" label="Paid To / Vendor" rules={[{ required: true }]}>
            <Input placeholder="e.g., Kenya Power" />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {editingRecord ? 'Save Changes' : 'Log Expense'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ExpenseManagementPage;