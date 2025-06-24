// apps/frontend/src/features/admin/finance/pages/BursaryManagementPage.tsx
import { useState } from 'react';
import {
  Card, Table, Typography, Button, Space, Tag, Tabs, Modal, Form,
  InputNumber, Select, message, List, Avatar, Descriptions,
  Divider,
  Input
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserOutlined, CheckCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// --- MOCK DATA ---
const pendingApplications = [
  { key: '1', studentName: 'Peter Jones', studentId: 'ST-00401', className: 'Grade 5', fund: 'CDF Bursary', amount: 15000, date: '2023-10-18', parentContact: '0711******' },
  { key: '2', studentName: 'Jane Smith', studentId: 'ST-00211', className: 'Grade 6', fund: 'County Fund', amount: 10000, date: '2023-10-20', parentContact: '0722******' },
];

const historicalApplications = [
  { key: '3', studentName: 'Alice Johnson', studentId: 'ST-00333', className: 'Grade 4', fund: 'ABC Foundation (NGO)', amount: 25000, date: '2023-09-20', status: 'Approved & Disbursed' },
  { key: '4', studentName: 'John Doe', studentId: 'ST-00111', className: 'Grade 6', fund: 'CDF Bursary', amount: 15000, date: '2023-08-15', status: 'Rejected' },
  { key: '5', studentName: 'Emily White', studentId: 'ST-00222', className: 'Grade 5', fund: 'County Fund', amount: 10000, date: '2023-07-10', status: 'Approved & Disbursed' },
];

const BursaryManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [form] = Form.useForm();

  const showDetailsModal = (record: any) => {
    setSelectedApplication(record);
    form.setFieldsValue({
      status: record.status || 'Approve', // Default to Approve for pending
      disbursedAmount: record.amount,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDecisionSubmit = (values: any) => {
    const action = values.status === 'Approve' ? 'approved' : 'rejected';
    message.success(`Bursary application for ${selectedApplication.studentName} has been ${action}.`);
    // TODO: API Call to update the bursary status
    setIsModalVisible(false);
  };

  const historyColumns: ColumnsType<any> = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Student Name', dataIndex: 'studentName', key: 'studentName' },
    { title: 'Student ID', dataIndex: 'studentId', key: 'studentId' },
    { title: 'Funding Source', dataIndex: 'fund', key: 'fund' },
    { title: 'Amount (KES)', dataIndex: 'amount', key: 'amount', render: (val) => val.toLocaleString() },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={status.includes('Approved') ? 'success' : 'error'}>{status}</Tag>
    },
  ];

  return (
    <div>
      <Title level={2}>Bursary & Scholarship Management</Title>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab={`Pending Applications (${pendingApplications.length})`} key="1">
          <Card>
            <List
              itemLayout="horizontal"
              dataSource={pendingApplications}
              renderItem={(item) => (
                <List.Item
                  actions={[<Button type="primary" ghost onClick={() => showDetailsModal(item)}>Review Application</Button>]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={<Text strong>{item.studentName}</Text>}
                    description={`Class: ${item.className} | Fund: ${item.fund} | Amount: KES ${item.amount.toLocaleString()}`}
                  />
                  <Text type="secondary">Applied on: {item.date}</Text>
                </List.Item>
              )}
            />
          </Card>
        </Tabs.TabPane>

        <Tabs.TabPane tab="Historical Records" key="2">
          <Card>
            <Input.Search placeholder="Search by Student Name, ID, or Fund" style={{ marginBottom: 16 }} />
            <Table columns={historyColumns} dataSource={historicalApplications} bordered />
          </Card>
        </Tabs.TabPane>
      </Tabs>

      <Modal
        title={`Review Bursary Application: ${selectedApplication?.studentName}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        {selectedApplication && (
          <Form form={form} layout="vertical" onFinish={handleDecisionSubmit}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Student Name">{selectedApplication.studentName}</Descriptions.Item>
              <Descriptions.Item label="Student ID">{selectedApplication.studentId}</Descriptions.Item>
              <Descriptions.Item label="Class">{selectedApplication.className}</Descriptions.Item>
              <Descriptions.Item label="Funding Source">{selectedApplication.fund}</Descriptions.Item>
              <Descriptions.Item label="Amount Requested">KES {selectedApplication.amount.toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="Parent Contact">{selectedApplication.parentContact}</Descriptions.Item>
              <Descriptions.Item label="Supporting Documents">
                <Button type="link">View Application Form.pdf</Button>
              </Descriptions.Item>
            </Descriptions>
            
            <Divider>Make a Decision</Divider>

            <Form.Item name="status" label="Decision" rules={[{ required: true }]}>
              <Select>
                <Select.Option value="Approve">Approve</Select.Option>
                <Select.Option value="Reject">Reject</Select.Option>
              </Select>
            </Form.Item>
            
            <Form.Item name="disbursedAmount" label="Amount to Disburse/Apply to Fees" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>

            <Form.Item name="notes" label="Internal Notes (Optional)">
              <Input.TextArea rows={2} placeholder="e.g., Rejected due to incomplete forms."/>
            </Form.Item>

            <Form.Item style={{ textAlign: 'right' }}>
              <Button onClick={handleCancel} style={{ marginRight: 8 }}>Cancel</Button>
              <Button type="primary" htmlType="submit" icon={<CheckCircleOutlined />}>
                Confirm Decision
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default BursaryManagementPage;