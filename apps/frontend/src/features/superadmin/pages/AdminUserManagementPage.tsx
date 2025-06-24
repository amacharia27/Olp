// apps/frontend/src/features/superadmin/pages/AdminUserManagementPage.tsx
import { useState } from 'react';
import {
  Table, Typography, Button, Space, Card, Input, Tag,
  Modal, Form, Select, Row, Col, Popconfirm, message
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { UserRole } from '@olp-monitor/shared-types';

const { Title, Paragraph } = Typography;
const { Search } = Input;

// --- MOCK DATA ---
const adminUsersData = [
  { key: '1', name: 'John Admin', userId: 'SA-00001', role: UserRole.SUPER_ADMIN, email: 'j.admin@olp.system', status: 'Active' },
  { key: '2', name: 'Mary National', userId: 'NA-00001', role: UserRole.NATIONAL_OFFICIAL, email: 'm.national@ministry.gov', status: 'Active' },
  { key: '3', name: 'Peter County', userId: 'CD-00001', role: UserRole.COUNTY_OFFICIAL, email: 'p.county@ministry.gov', status: 'Active' },
  { key: '4', name: 'Jane SubCounty', userId: 'SC-00001', role: UserRole.SUB_COUNTY_OFFICIAL, email: 'j.subcounty@ministry.gov', status: 'Inactive' },
];

// List of roles a Super Admin can create
const adminRoles = [
    UserRole.SUPER_ADMIN, UserRole.NATIONAL_OFFICIAL, 
    UserRole.COUNTY_OFFICIAL, UserRole.SUB_COUNTY_OFFICIAL
];

const AdminUserManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [form] = Form.useForm();

  const showCreateModal = (record: any = null) => {
    setEditingRecord(record);
    form.setFieldsValue(record ? { ...record } : { role: UserRole.NATIONAL_OFFICIAL, status: 'Active' });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
  };

  const handleFormSubmit = (values: any) => {
    const action = editingRecord ? 'updated' : 'created';
    console.log(`Admin user ${action}:`, { ...values, password: 'a_default_or_random_password' });
    message.success(`Administrator ${values.firstName} ${action} successfully!`);
    setIsModalVisible(false);
    // TODO: API call to create or update admin user
  };
  
  const columns: ColumnsType<any> = [
    { title: 'Full Name', dataIndex: 'name', key: 'name' },
    { title: 'User ID', dataIndex: 'userId', key: 'userId' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role', render: (role) => <Tag color="purple">{role}</Tag> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status) => <Tag color={status === 'Active' ? 'success' : 'default'}>{status}</Tag> },
    { title: 'Actions', key: 'actions', render: (_, record) => (
        <Space>
            <Button icon={<EditOutlined />} size="small" onClick={() => showCreateModal(record)}>Edit</Button>
            <Popconfirm title="Are you sure you want to deactivate this admin account?" onConfirm={() => message.info('Action simulated.')}>
              <Button danger size="small">Deactivate</Button>
            </Popconfirm>
        </Space>
    )},
  ];

  return (
    <div>
      <Title level={2}>Platform Administrator Management</Title>
      <Paragraph type="secondary">Create, view, and manage high-level administrative users for the OLP Monitor platform.</Paragraph>

      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Search placeholder="Search by name or email..." style={{ width: 300 }} />
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => showCreateModal()}>
              Create New Administrator
            </Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={adminUsersData} />
      </Card>

      <Modal
        title={editingRecord ? `Edit Administrator: ${editingRecord.name}` : "Create New Administrator"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                <Input placeholder="John" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                <Input placeholder="Doe" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="email" label="Official Email Address" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Administrator Role" rules={[{ required: true }]}>
            <Select placeholder="Assign a high-level role">
              {adminRoles.map(role => <Select.Option key={role} value={role}>{role}</Select.Option>)}
            </Select>
          </Form.Item>
           <Paragraph type="secondary">An initial password will be generated and sent to the user's email address.</Paragraph>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {editingRecord ? 'Save Changes' : 'Create User'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUserManagementPage;