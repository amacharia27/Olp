// apps/frontend/src/features/teacher/pages/ResourceManagementPage.tsx
import { useState } from 'react';
import {
  Table, Typography, Button, Space, Card, Modal, Form, Input,
  Select, Upload, message, Popconfirm
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlusOutlined, UploadOutlined, LinkOutlined, FilePdfOutlined,
  FilePptOutlined, FileWordOutlined, EditOutlined, DeleteOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// --- MOCK DATA ---
const teacherClasses = [
  { value: 'class_6A', label: 'Grade 6 - Eagles' },
  { value: 'class_6B', label: 'Grade 6 - Falcons' },
  { value: 'class_5C', label: 'Grade 5 - Lions' },
];

const subjects = [
  { value: 'math', label: 'Mathematics' },
  { value: 'eng', label: 'English' },
  { value: 'sci', label: 'Science' },
  { value: 'kis', label: 'Kiswahili' },
];

const resourcesData = [
  { key: '1', title: 'Algebra Worksheet 1', type: 'PDF', subject: 'Mathematics', class: 'Grade 6 - Eagles', uploadDate: '2023-10-25' },
  { key: '2', title: 'Photosynthesis Slides', type: 'PPT', subject: 'Science', class: 'Grade 6 - Eagles', uploadDate: '2023-10-22' },
  { key: '3', title: 'River and the Source - Notes', type: 'DOC', subject: 'English', class: 'Grade 6 - Eagles', uploadDate: '2023-10-20' },
  { key: '4', title: 'External Link: Khan Academy', type: 'Link', subject: 'Mathematics', class: 'All Classes', uploadDate: '2023-09-15', url: 'https://www.khanacademy.org/math' },
];

const ResourceManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  
  // TODO: Add state and API calls to manage resources

  const showUploadModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleUploadResource = (values: any) => {
    console.log('Uploading resource:', values);
    message.success(`Resource "${values.title}" uploaded successfully!`);
    setIsModalVisible(false);
    // TODO: Add API call to upload resource and handle file
  };

  const getIconForType = (type: string) => {
    switch(type) {
      case 'PDF': return <FilePdfOutlined style={{ color: '#E74C3C' }} />;
      case 'PPT': return <FilePptOutlined style={{ color: '#D35400' }} />;
      case 'DOC': return <FileWordOutlined style={{ color: '#2980B9' }} />;
      case 'Link': return <LinkOutlined style={{ color: '#27AE60' }} />;
      default: return <UploadOutlined />;
    }
  }

  const columns: ColumnsType<any> = [
    {
      title: 'Resource Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          {getIconForType(record.type)}
          <Text strong>{text}</Text>
        </Space>
      )
    },
    { title: 'Subject', dataIndex: 'subject', key: 'subject' },
    { title: 'Class', dataIndex: 'class', key: 'class' },
    { title: 'Date Uploaded', dataIndex: 'uploadDate', key: 'uploadDate' },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button type="primary" size="small" ghost>View</Button>
          <Button icon={<EditOutlined />} size="small" />
          <Popconfirm title="Are you sure you want to delete this resource?" onConfirm={() => message.success('Resource deleted!')}>
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Popconfirm>
        </Space>
      )
    },
  ];

  return (
    <div>
      <Title level={2}>Resource Management</Title>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={showUploadModal}>
            Upload New Resource
          </Button>
        </div>
        <Table columns={columns} dataSource={resourcesData} />
      </Card>

      <Modal
        title="Upload New Resource"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // We will use the form's button
      >
        <Form form={form} layout="vertical" onFinish={handleUploadResource}>
          <Form.Item name="title" label="Resource Title" rules={[{ required: true }]}>
            <Input placeholder="e.g., Chapter 1 Photosynthesis Notes" />
          </Form.Item>
          <Form.Item name="type" label="Resource Type" rules={[{ required: true }]}>
            <Select placeholder="Select the type of resource">
              <Select.Option value="PDF">PDF Document</Select.Option>
              <Select.Option value="DOC">Word Document</Select.Option>
              <Select.Option value="PPT">PowerPoint Presentation</Select.Option>
              <Select.Option value="Link">External Web Link</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
          >
            {({ getFieldValue }) =>
              getFieldValue('type') === 'Link' ? (
                <Form.Item name="url" label="URL" rules={[{ required: true, type: 'url' }]}>
                  <Input placeholder="https://example.com/resource" />
                </Form.Item>
              ) : (
                <Form.Item name="file" label="Upload File" rules={[{ required: true }]}>
                   <Upload.Dragger 
                      name="file" 
                      beforeUpload={() => {
                        // Prevent actual upload in this mock UI
                        return Upload.LIST_IGNORE;
                      }}
                    >
                    <p className="ant-upload-drag-icon"><UploadOutlined /></p>
                    <p className="ant-upload-text">Click or drag file to this area</p>
                  </Upload.Dragger>
                </Form.Item>
              )
            }
          </Form.Item>
          <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
            <Select options={subjects} placeholder="Assign to a subject" />
          </Form.Item>
          <Form.Item name="class" label="Class" rules={[{ required: true }]}>
            <Select options={[{value: 'all', label: 'All Classes'}, ...teacherClasses]} placeholder="Assign to a class" />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button onClick={handleCancel} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Save Resource
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ResourceManagementPage;