import { useState, lazy, Suspense } from 'react';
import {
  Table, Typography, Button, Space, Card, Modal, Form, Input,
  Select, message, Popconfirm, Tag, Row, Col
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

// Lazy load ReactQuill to avoid SSR issues
const ReactQuill = lazy(() => import('react-quill'));
import 'react-quill/dist/quill.snow.css';

const { Title, Text } = Typography;

// --- MOCK DATA ---
const announcementHistory = [
  { key: '1', title: 'Mid-Term Break Announcement', audience: ['All Parents', 'All Staff'], date: '2023-10-20', author: 'H.T. Mwangi' },
  { key: '2', title: 'Grade 6 Parent-Teacher Meeting', audience: ['Grade 6 Parents'], date: '2023-10-15', author: 'H.T. Mwangi' },
  { key: '3', title: 'Staff Meeting - Term 3 Planning', audience: ['All Staff'], date: '2023-10-12', author: 'H.T. Mwangi' },
  { key: '4', title: 'Fee Payment Deadline Reminder', audience: ['All Parents'], date: '2023-10-10', author: 'Finance Office' },
];

const audienceOptions = [
  { value: 'all_staff', label: 'All Staff' },
  { value: 'all_parents', label: 'All Parents' },
  { value: 'all_students', label: 'All Students' },
  { value: 'g6_parents', label: 'Grade 6 Parents' },
  { value: 'g5_parents', label: 'Grade 5 Parents' },
];

const CommunicationHubPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  
  // TODO: Add state and API calls to manage announcements

  const showCreateModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSendAnnouncement = (values: any) => {
    console.log('Sending Announcement:', values);
    // The 'content' from ReactQuill is HTML, which can be stored and rendered
    if (!values.content || values.content === '<p><br></p>') {
      message.error('Content cannot be empty.');
      return;
    }
    message.success(`Announcement "${values.title}" sent successfully!`);
    setIsModalVisible(false);
    // TODO: Add API call to send announcement
  };

  const columns: ColumnsType<any> = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Sent To', dataIndex: 'audience', key: 'audience', render: (tags: string[]) => (
      <>
        {tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}
      </>
    )},
    { title: 'Date Sent', dataIndex: 'date', key: 'date' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, _record) => (
        <Space>
          <Button icon={<EyeOutlined />} size="small">View</Button>
          <Popconfirm title="Are you sure you want to delete this announcement?" onConfirm={() => message.success('Announcement deleted!')}>
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      )
    },
  ];

  return (
    <div>
      <Title level={2}>Communication Hub</Title>
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
            <Col>
                <Text>Broadcast messages to the entire school community.</Text>
            </Col>
            <Col>
                <Button type="primary" icon={<PlusOutlined />} onClick={showCreateModal}>
                    Create New Announcement
                </Button>
            </Col>
        </Row>
        <Table columns={columns} dataSource={announcementHistory} />
      </Card>

      <Modal
        title="Create New Announcement"
        visible={isModalVisible}
        onCancel={handleCancel}
        width={800}
        footer={null} // We use the form's button
      >
        <Form form={form} layout="vertical" onFinish={handleSendAnnouncement}>
          <Form.Item name="title" label="Announcement Title" rules={[{ required: true }]}>
            <Input placeholder="e.g., Important Update on Mid-Term Exams" />
          </Form.Item>
          <Form.Item name="audience" label="Target Audience" rules={[{ required: true }]}>
            <Select mode="multiple" allowClear options={audienceOptions} placeholder="Select who will receive this message" />
          </Form.Item>
          <Form.Item name="content" label="Message Content" rules={[{ required: true }]}>
            <Suspense fallback={<div>Loading editor...</div>}>
              <ReactQuill 
                theme="snow" 
                style={{ height: '200px', marginBottom: '50px' }} 
              />
            </Suspense>
          </Form.Item>
          <Form.Item style={{ textAlign: 'right', marginTop: '16px' }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>Cancel</Button>
            <Button type="primary" htmlType="submit">Send Announcement</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CommunicationHubPage;