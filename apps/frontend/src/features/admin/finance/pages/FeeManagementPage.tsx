// apps/frontend/src/features/admin/finance/pages/FeeManagementPage.tsx
import { useState } from 'react';
import {
  Card, Table, Typography, Button, Space, Tag, Modal, Form,
  Input, InputNumber, Select, Row, Col, message, Popconfirm
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// --- MOCK DATA ---
const gradeLevels = [
  { value: 'g1', label: 'Grade 1' },
  { value: 'g2', label: 'Grade 2' },
  { value: 'g3', label: 'Grade 3' },
  { value: 'g4', label: 'Grade 4' },
  { value: 'g5', label: 'Grade 5' },
  { value: 'g6', label: 'Grade 6' },
];

const feeStructureData: Record<string, any[]> = {
  'g6': [
    { key: '1', item: 'Tuition Fee', amount: 45000, type: 'Mandatory' },
    { key: '2', item: 'Transport Fee', amount: 15000, type: 'Optional' },
    { key: '3', item: 'Lunch Program', amount: 15000, type: 'Optional' },
    { key: '4', item: 'Swimming Club', amount: 5000, type: 'Co-curricular' },
  ],
  'g5': [
    { key: '1', item: 'Tuition Fee', amount: 42000, type: 'Mandatory' },
    { key: '2', item: 'Transport Fee', amount: 15000, type: 'Optional' },
    { key: '3', item: 'Lunch Program', amount: 15000, type: 'Optional' },
  ],
};

const FeeManagementPage = () => {
  const [selectedGrade, setSelectedGrade] = useState('g6');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [form] = Form.useForm();

  const handleShowModal = (record: any = null) => {
    setEditingRecord(record);
    form.setFieldsValue(record || {});
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = (values: any) => {
    const action = editingRecord ? 'updated' : 'added';
    message.success(`Fee item "${values.item}" has been ${action} successfully!`);
    // TODO: API Call to save the fee item
    setIsModalVisible(false);
  };
  
  const totalForGrade = feeStructureData[selectedGrade]?.reduce((sum, item) => sum + item.amount, 0) || 0;

  const columns: ColumnsType<any> = [
    { title: 'Fee Item', dataIndex: 'item', key: 'item' },
    { title: 'Amount (KES)', dataIndex: 'amount', key: 'amount', render: (val) => val.toLocaleString() },
    { title: 'Type', dataIndex: 'type', key: 'type', render: (type) => <Tag>{type}</Tag> },
    {
      title: 'Actions', key: 'actions', render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => handleShowModal(record)} />
          <Popconfirm title="Are you sure?" onConfirm={() => message.success('Item deleted!')}>
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Fee Structure Management</Title>
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Space>
              <Text>Viewing Fee Structure for:</Text>
              <Select
                value={selectedGrade}
                style={{ width: 200 }}
                onChange={setSelectedGrade}
                options={gradeLevels}
              />
            </Space>
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} onClick={() => handleShowModal()}>
              Add New Fee Item
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={feeStructureData[selectedGrade] || []}
          pagination={false}
          bordered
          summary={() => (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}><Text strong>Total</Text></Table.Summary.Cell>
              <Table.Summary.Cell index={1}><Text strong>{totalForGrade.toLocaleString()}</Text></Table.Summary.Cell>
              <Table.Summary.Cell index={2}></Table.Summary.Cell>
              <Table.Summary.Cell index={3}></Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </Card>
      
      <Modal
        title={editingRecord ? 'Edit Fee Item' : 'Add New Fee Item'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item name="item" label="Item Name" rules={[{ required: true }]}>
            <Input placeholder="e.g., Tuition Fee" />
          </Form.Item>
          <Form.Item name="amount" label="Amount (KES)" rules={[{ required: true }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="type" label="Item Type" rules={[{ required: true }]}>
            <Select placeholder="Select a type">
              <Select.Option value="Mandatory">Mandatory</Select.Option>
              <Select.Option value="Optional">Optional</Select.Option>
              <Select.Option value="Co-curricular">Co-curricular</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {editingRecord ? 'Save Changes' : 'Add Item'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FeeManagementPage;