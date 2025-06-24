import { Card, Table, Typography, Button, Progress, Tag, Row, Col, Modal, Form, Input, DatePicker, InputNumber, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Title } = Typography;

// --- MOCK DATA ---
const projects = [
  { key: '1', name: 'New Library Construction', budget: 5000000, progress: 75, status: 'In Progress', startDate: '2023-06-01', endDate: '2023-12-31' },
  { key: '2', name: 'Repainting of Classrooms (Block A)', budget: 250000, progress: 100, status: 'Completed', startDate: '2023-08-15', endDate: '2023-09-15' },
  { key: '3', name: 'Playground Upgrade & Equipment Purchase', budget: 750000, progress: 20, status: 'In Progress', startDate: '2023-10-01', endDate: '2024-02-28' },
  { key: '4', name: 'Installation of Water Tanks', budget: 400000, progress: 0, status: 'Planned', startDate: '2024-01-10', endDate: '2024-03-10' },
];

const InfrastructureProjectsPage = () => {

  const projectColumns: ColumnsType<any> = [
    { title: 'Project Name', dataIndex: 'name', key: 'name' },
    { title: 'Budget (KES)', dataIndex: 'budget', key: 'budget', render: (val) => val.toLocaleString() },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate' },
    { title: 'Expected End Date', dataIndex: 'endDate', key: 'endDate' },
    { title: 'Progress', dataIndex: 'progress', key: 'progress', render: (val) => <Progress percent={val} /> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (status: string) => {
        let color = 'blue';
        if (status === 'Completed') color = 'success';
        if (status === 'Planned') color = 'default';
        return <Tag color={color}>{status}</Tag>
    }},
  ];
  // ADD these inside the component
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showProjectModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCreateProject = (values: any) => {
    console.log("New Project:", values);
    message.success("New project has been logged successfully!");
    setIsModalVisible(false);
    // TODO: API call to create project
  };

  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={2}>Infrastructure & Projects</Title>
        </Col>
        <Col>
        <Button type="primary" icon={<PlusOutlined />} onClick={showProjectModal}>Log New Project</Button>
        </Col>
      </Row>
      <Card style={{marginTop: 16}}>
        <Table columns={projectColumns} dataSource={projects} />
      </Card>
      <Modal
        title="Log New Infrastructure Project"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateProject}>
          <Form.Item name="name" label="Project Name" rules={[{ required: true }]}>
            <Input placeholder="e.g., Construction of New Science Lab" />
          </Form.Item>
          <Form.Item name="budget" label="Estimated Budget (KES)" rules={[{ required: true }]}>
            <InputNumber 
              min={0} 
              style={{ width: '100%' }} 
              formatter={(value: string | number | undefined) => 
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              } 
              parser={(value: string | undefined) => 
                parseInt(value?.replace(/[^0-9]/g, '') || '0', 10)
              }
            />
          </Form.Item>
          <Form.Item name="dateRange" label="Expected Start & End Date" rules={[{ required: true }]}>
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Save Project</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InfrastructureProjectsPage;