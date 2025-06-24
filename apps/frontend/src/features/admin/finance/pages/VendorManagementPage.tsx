// apps/frontend/src/features/admin/finance/pages/VendorManagementPage.tsx
import { useState } from 'react';
import {
  Card, Table, Typography, Button, Space, Modal, Form,
  Input, Row, Col, message, Popconfirm, Tag, Drawer
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined, ShopOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;

// --- TYPES ---
interface Vendor {
  key: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  totalSpent: number;
  lastTransaction?: string;
}

interface Expense {
  key: string;
  date: string;
  description: string;
  amount: number;
}

type VendorExpenseHistory = Record<string, Expense[]>;

// --- MOCK DATA ---
const vendorsData: Vendor[] = [
  { 
    key: '1', 
    name: 'Text Book Centre', 
    category: 'Supplies', 
    contactPerson: 'John Doe', 
    phone: '0712345678', 
    email: 'sales@tbc.co.ke', 
    totalSpent: 125000 
  },
  { 
    key: '2', 
    name: 'Kamau Contractors', 
    category: 'Maintenance', 
    contactPerson: 'Peter Kamau', 
    phone: '0722112233', 
    email: 'kamau@contractors.com', 
    totalSpent: 80000 
  },
  { 
    key: '3', 
    name: 'Kenya Power (KPLC)', 
    category: 'Utilities', 
    contactPerson: 'Customer Service', 
    phone: '97771', 
    email: 'support@kplc.co.ke', 
    totalSpent: 55000 
  },
  { 
    key: '4', 
    name: 'Nairobi City Water', 
    category: 'Utilities', 
    contactPerson: 'Customer Care', 
    phone: '0703080000', 
    email: 'info@nairobiwater.co.ke', 
    totalSpent: 35000 
  },
];

const vendorExpenseHistory: VendorExpenseHistory = {
  '1': [
    { key: 'ex1', date: '2023-10-24', description: 'Purchase of whiteboard markers and printing paper', amount: 25000 },
    { key: 'ex2', date: '2023-08-10', description: 'Order of new curriculum textbooks', amount: 100000 },
  ],
  '2': [
    { key: 'ex3', date: '2023-10-20', description: 'Repair of leaking roof in Block B', amount: 80000 },
  ]
};

const VendorManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [editingRecord, setEditingRecord] = useState<Vendor | null>(null);
  const [form] = Form.useForm();

  const showVendorModal = (record: Vendor | null = null) => {
    setEditingRecord(record);
    form.setFieldsValue(record || {});
    setIsModalVisible(true);
  };

  const showDetailsDrawer = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setIsDrawerVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsDrawerVisible(false);
  };

  const handleFormSubmit = (values: Omit<Vendor, 'key'>) => {
    const action = editingRecord ? 'updated' : 'added';
    message.success(`Vendor "${values.name}" has been ${action} successfully!`);
    setIsModalVisible(false);
  };

  const vendorColumns: ColumnsType<Vendor> = [
    { title: 'Vendor Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Contact Person', dataIndex: 'contactPerson', key: 'contactPerson' },
    { 
      title: 'Email', 
      dataIndex: 'email', 
      key: 'email' 
    },
    { 
      title: 'Total Spent (KES)', 
      dataIndex: 'totalSpent', 
      key: 'totalSpent', 
      render: (val: number) => val.toLocaleString() 
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Vendor) => (
        <Space size="middle">
          <Button 
            icon={<EyeOutlined />} 
            onClick={() => showDetailsDrawer(record)} 
            aria-label="View details"
          />
          <Button 
            icon={<EditOutlined />} 
            onClick={() => showVendorModal(record)}
            aria-label="Edit vendor"
          />
          <Popconfirm
            title="Are you sure you want to delete this vendor?"
            onConfirm={() => message.success('Vendor deleted successfully')}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              aria-label="Delete vendor"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const expenseHistoryColumns: ColumnsType<Expense> = [
    { 
      title: 'Date', 
      dataIndex: 'date',
      key: 'date' 
    },
    { 
      title: 'Description', 
      dataIndex: 'description',
      key: 'description' 
    },
    { 
      title: 'Amount (KES)', 
      dataIndex: 'amount', 
      key: 'amount',
      render: (val: number) => val.toLocaleString() 
    }
  ];

  return (
    <div>
      <Title level={2}>Vendor Management</Title>
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Search 
              placeholder="Search by vendor name or category..." 
              style={{ width: 300 }} 
              allowClear
              onSearch={(value) => console.log('Search:', value)}
            />
          </Col>
          <Col>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => showVendorModal()}
            >
              Add New Vendor
            </Button>
          </Col>
        </Row>
        <Table 
          columns={vendorColumns} 
          dataSource={vendorsData} 
          bordered 
          rowKey="key"
        />
      </Card>

      <Modal
        title={editingRecord ? 'Edit Vendor Details' : 'Add New Vendor'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={handleFormSubmit}
          initialValues={editingRecord || {}}
        >
          <Form.Item 
            name="name" 
            label="Vendor Name" 
            rules={[{ required: true, message: 'Please input vendor name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="category" 
            label="Service/Product Category" 
            rules={[{ required: true, message: 'Please input category!' }]}
          >
            <Input placeholder="e.g., Supplies, Maintenance" />
          </Form.Item>
          <Form.Item 
            name="contactPerson" 
            label="Contact Person"
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="phone" 
            label="Phone Number" 
            rules={[{ required: true, message: 'Please input phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="email" 
            label="Email Address" 
            rules={[{ type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {editingRecord ? 'Update' : 'Save'} Vendor
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Drawer
        title={`Payment History for: ${selectedVendor?.name || 'Vendor'}`}
        width={600}
        onClose={handleCancel}
        open={isDrawerVisible}
        destroyOnClose
      >
        {selectedVendor && (
          <Table
            columns={expenseHistoryColumns}
            dataSource={selectedVendor.key in vendorExpenseHistory 
              ? vendorExpenseHistory[selectedVendor.key as keyof typeof vendorExpenseHistory] 
              : []}
            pagination={false}
            rowKey="key"
          />
        )}
      </Drawer>
    </div>
  );
};

export default VendorManagementPage;