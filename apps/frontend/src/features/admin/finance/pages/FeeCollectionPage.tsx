// apps/frontend/src/features/admin/finance/pages/FeeCollectionPage.tsx
import { useState } from 'react';
import {
  Card, Table, Typography, Button, Space, Input, Modal, Form,
  InputNumber, Select, Row, Col, message, Tag,
  Statistic,
  Divider
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { WalletOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;

// --- MOCK DATA ---
// This represents a search result from the backend
const allStudentsWithFees = [
  { key: '1', studentId: 'ST-00123', name: 'Asha Kimani', className: 'Grade 6', totalBilled: 75000, totalPaid: 60000, balance: 15000 },
  { key: '2', studentId: 'ST-00124', name: 'Brian Omondi', className: 'Grade 6', totalBilled: 60000, totalPaid: 60000, balance: 0 },
  { key: '3', studentId: 'ST-00125', name: 'Fatima Yusuf', className: 'Grade 6', totalBilled: 75000, totalPaid: 0, balance: 75000 },
  { key: '4', studentId: 'ST-00201', name: 'David Mwangi', className: 'Grade 5', totalBilled: 57000, totalPaid: 57000, balance: 0 },
  { key: '5', studentId: 'ST-00202', name: 'Christine Achieng', className: 'Grade 5', totalBilled: 57000, totalPaid: 30000, balance: 27000 },
];

const FeeCollectionPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [form] = Form.useForm();

  const handleSearch = (value: string) => {
    if (!value) {
      setFilteredData([]);
      return;
    }
    const results = allStudentsWithFees.filter(s =>
      s.name.toLowerCase().includes(value.toLowerCase()) ||
      s.studentId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(results);
  };

  const showPaymentModal = (student: any) => {
    setSelectedStudent(student);
    // Suggest paying the outstanding balance by default
    form.setFieldsValue({ amount: student.balance });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handlePaymentSubmit = (values: any) => {
    console.log("Submitting payment:", {
      studentId: selectedStudent.studentId,
      ...values,
    });
    message.success(`Payment of KES ${values.amount.toLocaleString()} for ${selectedStudent.name} recorded successfully!`);
    // TODO: API Call to post the payment, then refetch data to update the table
    setIsModalVisible(false);
  };

  const columns: ColumnsType<any> = [
    { title: 'Student ID', dataIndex: 'studentId', key: 'studentId' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Class', dataIndex: 'className', key: 'className' },
    { title: 'Outstanding Balance (KES)', dataIndex: 'balance', key: 'balance', 
      render: (val) => <Text type={val > 0 ? 'danger' : 'success'} strong>{val.toLocaleString()}</Text>
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="primary"
          ghost
          icon={<WalletOutlined />}
          onClick={() => showPaymentModal(record)}
          disabled={record.balance <= 0}
        >
          Record Payment
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Fee Collection</Title>
      <Card>
        <Text>Search for a student by their Name or Student ID to record a payment.</Text>
        <Search
          placeholder="Enter Student Name or ID..."
          onSearch={handleSearch}
          enterButton
          size="large"
          style={{ marginTop: 8, marginBottom: 24 }}
        />
        <Table
          columns={columns}
          dataSource={filteredData}
          bordered
          locale={{ emptyText: 'No students found. Please use the search bar above.' }}
        />
      </Card>
      
      <Modal
        title={`Record Payment for: ${selectedStudent?.name}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedStudent && (
          <Form form={form} layout="vertical" onFinish={handlePaymentSubmit}>
            <Statistic title="Current Outstanding Balance" value={selectedStudent.balance} prefix="KES" />
            <Divider />
            <Form.Item name="amount" label="Amount Being Paid" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>
            <Form.Item name="paymentMethod" label="Payment Method" rules={[{ required: true }]}>
              <Select placeholder="Select method">
                <Select.Option value="M-Pesa">M-Pesa</Select.Option>
                <Select.Option value="Bank Deposit">Bank Deposit</Select.Option>
                <Select.Option value="Card">Credit/Debit Card</Select.Option>
                <Select.Option value="Cash">Cash</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="reference" label="Transaction Reference / Receipt No." rules={[{ required: true }]}>
              <Input placeholder="e.g., RKI456ABCDE or Receipt #5543" />
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button onClick={handleCancel} style={{ marginRight: 8 }}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Submit Payment
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default FeeCollectionPage;