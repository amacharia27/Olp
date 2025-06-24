// apps/frontend/src/features/student/pages/AssignmentsPage.tsx
import { useState } from 'react';
import { List, Tag, Typography, Card, Badge, Button, Modal, Upload, message } from 'antd';
import { FilePdfOutlined, LinkOutlined, ClockCircleOutlined, InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;

const { Title, Text } = Typography;

// --- MOCK DATA ---
const assignments = [
  { id: 1, subject: 'Mathematics', title: 'Algebra II Worksheet', dueDate: '2023-11-15', status: 'Pending', description: 'Complete all questions on the attached PDF.', attachments: [{ type: 'pdf', name: 'algebra_worksheet.pdf' }] },
  { id: 2, subject: 'Science', title: 'Photosynthesis Lab Report', dueDate: '2023-11-18', status: 'Pending', description: 'Write a 2-page report based on the class experiment.', attachments: [] },
  { id: 3, subject: 'Kiswahili', title: 'Insha: Marafiki Wabaya', dueDate: '2023-11-22', status: 'Pending', description: 'Andika insha ya kurasa mbili.', attachments: [] },
  { id: 4, subject: 'English', title: 'Book Review: "The Pearl"', dueDate: '2023-10-30', status: 'Submitted', description: 'Submit a 500-word review of the book.', attachments: [] },
  { id: 5, subject: 'Social Studies', title: 'Kenya Independence Research', dueDate: '2023-10-25', status: 'Graded', description: 'Research and present on key figures in Kenya\'s independence.', attachments: [{ type: 'link', name: 'research_resources.com' }] },
];

const AssignmentsPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  
  const showSubmitModal = (item: any) => {
    setSelectedAssignment(item);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    message.success(`Work for "${selectedAssignment?.title}" submitted successfully!`);
    setIsModalVisible(false);
    // TODO: Add API call to submit assignment
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

    const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: () => {
      message.info('This is a demo. Files are not actually uploaded.');
      return Upload.LIST_IGNORE; // Prevents actual upload
    },
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Badge status="processing" text="Pending" />;
      case 'Submitted':
        return <Badge status="warning" text="Submitted" />;
      case 'Graded':
        return <Badge status="success" text="Graded" />;
      default:
        return <Badge status="default" text={status} />;
    }
  };

  return (
    <div>
      
      <Title level={2}>My Assignments</Title>
      <Card>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={assignments}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <Text type="secondary"><ClockCircleOutlined /> Due: {item.dueDate}</Text>,
                getStatusBadge(item.status),
              ]}
              // inside the renderItem function
              extra={
                item.status === 'Pending' ? 
                  <Button type="primary" onClick={() => showSubmitModal(item)}>Submit Work</Button> : 
                  <Button disabled>View Submission</Button>
              }
            >
              <List.Item.Meta
                title={<a href="#">{item.title}</a>}
                description={<Tag>{item.subject}</Tag>}
              />
              <Text>{item.description}</Text>
              {item.attachments.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  <Text strong>Attachments: </Text>
                  {item.attachments.map(att => (
                    <Button key={att.name} type="link" icon={att.type === 'pdf' ? <FilePdfOutlined /> : <LinkOutlined />}>
                      {att.name}
                    </Button>
                  ))}
                </div>
              )}
            </List.Item>
          )}
        />
      </Card>
      <Modal
        title={`Submit Assignment: ${selectedAssignment?.title}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
      >
        <p>Please upload your completed work file(s) below.</p>
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon"><InboxOutlined /></p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload.</p>
        </Dragger>
      </Modal>
    </div>
  );
};

export default AssignmentsPage;