import { useState } from 'react';
import { Table, Typography, Button, Space, Card, Modal, Form, Input, Select, Avatar, Tag, Row, Col, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { UserRole } from '@olp-monitor/shared-types';

const { Text, Paragraph } = Typography;

// --- MOCK DATA ---
const staffData: StaffMember[] = [
  { key: '1', name: 'James Otieno', userId: 'TR-00001', role: UserRole.TEACHER, email: 'jotieno@example.com', status: 'Active', classes: ['Grade 6 - Eagles', 'Grade 5 - Lions'] },
  { key: '2', name: 'Susan Wanjiku', userId: 'TR-00002', role: UserRole.TEACHER, email: 'swanjiku@example.com', status: 'Active', classes: ['Grade 6 - Falcons'] },
  { key: '3', name: 'David Were', userId: 'TR-00003', role: UserRole.TEACHER, email: 'dwere@example.com', status: 'Pending Approval', classes: [] },
  { key: '4', name: 'Mary Oloo', userId: 'FA-00001', role: UserRole.FINANCE_ADMIN, email: 'moloo@example.com', status: 'Active', classes: [] },
  { key: '5', name: 'Peter Kamau', userId: 'DHT-00001', role: UserRole.DEPUTY_HEADTEACHER, email: 'pkamau@example.com', status: 'Active', classes: [] },
];

interface StaffMember {
  key: string;
  name: string;
  userId: string;
  role: UserRole;
  email: string;
  status: 'Active' | 'Inactive' | 'Pending Approval';
  classes: string[];
}

const StaffManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<StaffMember | null>(null);
  const [staffList, setStaffList] = useState<StaffMember[]>(staffData);
  const [form] = Form.useForm();

  const showOnboardModal = (record: any = null) => {
    setEditingRecord(record);
    form.setFieldsValue(record ? { ...record } : { role: UserRole.TEACHER, status: 'Active' });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord(null);
  };

  const handleOnboardStaff = (values: any) => {
    const action = editingRecord ? 'updated' : 'created';
    console.log(`Staff member ${action}:`, { ...values, password: 'a_default_or_random_password' });
    message.success(`Staff member ${values.name} ${action} successfully!`);
    setIsModalVisible(false);
  };
  const handleApprove = (record: StaffMember) => {
    message.success(`User "${record.name}" has been approved and activated.`);
    setStaffList(prevList => 
      prevList.map(item => 
        item.key === record.key ? { ...item, status: 'Active' as const } : item
      )
    );
    // TODO: API call to set user.isActive = true
  };

  const handleDeactivate = (record: StaffMember) => {
    message.warning(`User "${record.name}" has been deactivated.`);
    setStaffList(prevList =>
      prevList.map(item =>
        item.key === record.key ? { ...item, status: 'Inactive' as const } : item
      )
    );
    // TODO: API call to set user.isActive = false
  };

  const renderActions = (_: unknown, record: StaffMember) => (
    <Space>
      <Button icon={<EditOutlined />} size="small" onClick={() => showOnboardModal(record)}>Edit</Button>
      {record.status === 'Pending Approval' ? (
        <Button type="primary" size="small" ghost onClick={() => handleApprove(record)}>
          Approve
        </Button>
      ) : record.status === 'Active' ? (
        <Popconfirm 
          title="Are you sure you want to deactivate this user?" 
          onConfirm={() => handleDeactivate(record)}
          okText="Yes"
          cancelText="No"
        >
          <Button size="small" danger>Deactivate</Button>
        </Popconfirm>
      ) : (
        <Button size="small" onClick={() => handleApprove(record)}>
          Re-activate
        </Button>
      )}
    </Space>
  );

  const columns: ColumnsType<StaffMember> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    { title: 'User ID', dataIndex: 'userId', key: 'userId' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { 
      title: 'Role', 
      dataIndex: 'role', 
      key: 'role',
      render: (role: UserRole) => <Tag color="cyan">{role}</Tag>
    },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: StaffMember['status']) => (
        <Tag color={status === 'Active' ? 'success' : 'warning'}>{status}</Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: renderActions
    }
  ];

  return (
    <div>
      <h2>Staff Management</h2>
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Input.Search 
              placeholder="Search by name or User ID..." 
              style={{ width: 300 }} 
              onSearch={(value) => console.log('Search:', value)}
            />
          </Col>
          <Col>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => showOnboardModal()}
            >
              Onboard New Staff
            </Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={staffList} scroll={{ x: 800 }} />
      </Card>

      <Modal
        title={editingRecord ? `Edit Staff: ${editingRecord.name}` : "Onboard New Staff Member"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleOnboardStaff}>
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
          <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="user@school.com" />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select placeholder="Assign a role">
              <Select.Option value={UserRole.TEACHER}>Teacher</Select.Option>
              <Select.Option value={UserRole.FINANCE_ADMIN}>Finance Admin</Select.Option>
              <Select.Option value={UserRole.DEPUTY_HEADTEACHER}>Deputy Headteacher</Select.Option>
            </Select>
          </Form.Item>
          <Paragraph type="secondary">An initial password will be generated and sent to their email address.</Paragraph>
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

export default StaffManagementPage;