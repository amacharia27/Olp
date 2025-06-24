// apps/frontend/src/features/official/subcounty/pages/SubcountyTransferApprovalPage.tsx
import { useState } from 'react';
import {
  Typography,
  Card,
  Table,
  Tag,
  Space,
  Button,
  Modal,
  Form,
  Input,
  message,
  Tabs,
  Badge
} from 'antd';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

interface TransferApplication {
  id: string;
  applicantId: string;
  applicantName: string;
  applicantRole: string;
  currentSchool: string;
  requestedSchool: string;
  county: string;
  subCounty: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'objected';
  dateSubmitted: string;
  approvalChain: {
    headteacher?: {
      status: 'pending' | 'approved' | 'rejected' | 'objected';
      comment?: string;
      date?: string;
    };
    subcounty?: {
      status: 'pending' | 'approved' | 'rejected' | 'objected';
      comment?: string;
      date?: string;
    };
    county?: {
      status: 'pending' | 'approved' | 'rejected' | 'objected';
      comment?: string;
      date?: string;
    };
  };
}

// Mock data for transfer applications
const mockTransferApplications: TransferApplication[] = [
  {
    id: 'TA-001',
    applicantId: 'T-001',
    applicantName: 'John Doe',
    applicantRole: 'Teacher',
    currentSchool: 'Westlands Primary School',
    requestedSchool: 'Dagoretti High School',
    county: 'Nairobi',
    subCounty: 'Dagoretti',
    reason: 'Moving closer to home',
    status: 'pending',
    dateSubmitted: '2025-05-15',
    approvalChain: {
      headteacher: {
        status: 'approved',
        comment: 'Teacher has served well and deserves the transfer',
        date: '2025-05-20',
      },
      subcounty: {
        status: 'pending',
      },
    },
  },
  {
    id: 'TA-002',
    applicantId: 'T-002',
    applicantName: 'Jane Smith',
    applicantRole: 'Teacher',
    currentSchool: 'Westlands Primary School',
    requestedSchool: 'Kisumu Boys High School',
    county: 'Kisumu',
    subCounty: 'Kisumu Central',
    reason: 'Family relocation',
    status: 'pending',
    dateSubmitted: '2025-06-10',
    approvalChain: {
      headteacher: {
        status: 'approved',
        comment: 'Approved due to family circumstances',
        date: '2025-06-15',
      },
      subcounty: {
        status: 'pending',
      },
    },
  },
  {
    id: 'TA-003',
    applicantId: 'D-001',
    applicantName: 'Michael Johnson',
    applicantRole: 'Deputy Headteacher',
    currentSchool: 'Westlands Primary School',
    requestedSchool: 'Naivasha Boys High School',
    county: 'Nakuru',
    subCounty: 'Naivasha',
    reason: 'Career advancement opportunity',
    status: 'pending',
    dateSubmitted: '2025-06-18',
    approvalChain: {
      headteacher: {
        status: 'approved',
        comment: 'Deputy has shown excellent leadership skills',
        date: '2025-06-20',
      },
      subcounty: {
        status: 'pending',
      },
    },
  },
  {
    id: 'TA-004',
    applicantId: 'H-001',
    applicantName: 'Sarah Williams',
    applicantRole: 'Headteacher',
    currentSchool: 'Parklands Primary School',
    requestedSchool: 'Nyali Primary School',
    county: 'Mombasa',
    subCounty: 'Nyali',
    reason: 'Personal health reasons',
    status: 'pending',
    dateSubmitted: '2025-06-05',
    approvalChain: {
      subcounty: {
        status: 'pending',
      },
    },
  },
];

const SubcountyTransferApprovalPage = () => {
  const [applications, setApplications] = useState<TransferApplication[]>(mockTransferApplications);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentApplication, setCurrentApplication] = useState<TransferApplication | null>(null);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState('pending');

  const showApprovalModal = (application: TransferApplication) => {
    setCurrentApplication(application);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleApprove = () => {
    form.validateFields().then(values => {
      const updatedApplications = applications.map(app => {
        if (app.id === currentApplication?.id) {
          return {
            ...app,
            approvalChain: {
              ...app.approvalChain,
              subcounty: {
                status: 'approved' as const,
                comment: values.comment,
                date: new Date().toISOString().split('T')[0],
              },
            },
            status: 'pending' as const, // Still pending as it needs county approval
          };
        }
        return app;
      });

      setApplications(updatedApplications);
      message.success('Transfer application approved successfully!');
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleReject = () => {
    form.validateFields().then(values => {
      if (!values.comment) {
        message.error('Please provide a reason for rejection');
        return;
      }

      const updatedApplications = applications.map(app => {
        if (app.id === currentApplication?.id) {
          return {
            ...app,
            approvalChain: {
              ...app.approvalChain,
              subcounty: {
                status: 'rejected' as const,
                comment: values.comment,
                date: new Date().toISOString().split('T')[0],
              },
            },
            status: 'rejected' as const, // Rejected by subcounty
          };
        }
        return app;
      });

      setApplications(updatedApplications);
      message.success('Transfer application rejected');
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleObject = () => {
    form.validateFields().then(values => {
      if (!values.comment) {
        message.error('Please provide a reason for objection');
        return;
      }

      const updatedApplications = applications.map(app => {
        if (app.id === currentApplication?.id) {
          return {
            ...app,
            approvalChain: {
              ...app.approvalChain,
              subcounty: {
                status: 'objected' as const,
                comment: values.comment,
                date: new Date().toISOString().split('T')[0],
              },
            },
            status: 'objected' as const, // Objected by subcounty
          };
        }
        return app;
      });

      setApplications(updatedApplications);
      message.success('Objection recorded');
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const columns: ColumnsType<TransferApplication> = [
    {
      title: 'Application ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Applicant',
      dataIndex: 'applicantName',
      key: 'applicantName',
      render: (text, record) => (
        <span>
          {text} <Tag color="blue">{record.applicantRole}</Tag>
        </span>
      ),
    },
    {
      title: 'Current School',
      dataIndex: 'currentSchool',
      key: 'currentSchool',
    },
    {
      title: 'Requested School',
      dataIndex: 'requestedSchool',
      key: 'requestedSchool',
    },
    {
      title: 'Headteacher',
      key: 'headteacher',
      render: (_, record) => {
        if (!record.approvalChain.headteacher) {
          return <Tag color="default">N/A</Tag>; // For headteacher applications
        }
        
        const status = record.approvalChain.headteacher.status;
        let color = 'gold';
        if (status === 'approved') color = 'green';
        else if (status === 'rejected') color = 'red';
        else if (status === 'objected') color = 'orange';
        
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Subcounty',
      key: 'subcounty',
      render: (_, record) => {
        const status = record.approvalChain.subcounty?.status || 'pending';
        let color = 'gold';
        if (status === 'approved') color = 'green';
        else if (status === 'rejected') color = 'red';
        else if (status === 'objected') color = 'orange';
        
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => {
        // Only show review button if:
        // 1. For teachers/deputies: headteacher has approved and subcounty status is pending
        // 2. For headteachers: subcounty status is pending
        const isReviewable = 
          (record.applicantRole === 'Headteacher' && record.approvalChain.subcounty?.status === 'pending') ||
          (record.applicantRole !== 'Headteacher' && 
           record.approvalChain.headteacher?.status === 'approved' && 
           record.approvalChain.subcounty?.status === 'pending');
        
        return (
          <Space>
            <Button 
              size="small" 
              type="primary" 
              onClick={() => showApprovalModal(record)}
              disabled={!isReviewable}
            >
              Review
            </Button>
            <Button size="small">View Details</Button>
          </Space>
        );
      },
    },
  ];

  const filteredApplications = applications.filter(app => {
    if (activeTab === 'pending') {
      return app.approvalChain.subcounty?.status === 'pending';
    } else if (activeTab === 'approved') {
      return app.approvalChain.subcounty?.status === 'approved';
    } else if (activeTab === 'rejected') {
      return app.approvalChain.subcounty?.status === 'rejected';
    } else if (activeTab === 'objected') {
      return app.approvalChain.subcounty?.status === 'objected';
    }
    return true;
  });

  const pendingCount = applications.filter(app => {
    // For teachers/deputies: headteacher has approved and subcounty status is pending
    // For headteachers: subcounty status is pending
    return (app.applicantRole === 'Headteacher' && app.approvalChain.subcounty?.status === 'pending') ||
      (app.applicantRole !== 'Headteacher' && 
       app.approvalChain.headteacher?.status === 'approved' && 
       app.approvalChain.subcounty?.status === 'pending');
  }).length;

  return (
    <div>
      <Title level={2}>Transfer Applications Review</Title>
      <Text>As a subcounty official, you need to review transfer applications from schools in your subcounty.</Text>
      
      <Card style={{ marginTop: 16 }}>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane 
            tab={
              <span>
                Pending <Badge count={pendingCount} style={{ backgroundColor: '#faad14' }} />
              </span>
            } 
            key="pending"
          />
          <TabPane tab="Approved" key="approved" />
          <TabPane tab="Rejected" key="rejected" />
          <TabPane tab="Objected" key="objected" />
        </Tabs>
        
        <Table 
          columns={columns} 
          dataSource={filteredApplications} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="Review Transfer Application"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {currentApplication && (
          <div>
            <p><strong>Applicant:</strong> {currentApplication.applicantName} ({currentApplication.applicantRole})</p>
            <p><strong>Current School:</strong> {currentApplication.currentSchool}</p>
            <p><strong>Requested School:</strong> {currentApplication.requestedSchool}</p>
            <p><strong>County:</strong> {currentApplication.county}</p>
            <p><strong>Sub-County:</strong> {currentApplication.subCounty}</p>
            <p><strong>Reason:</strong> {currentApplication.reason}</p>
            
            {currentApplication.approvalChain.headteacher && (
              <div>
                <p><strong>Headteacher Decision:</strong> {currentApplication.approvalChain.headteacher.status.toUpperCase()}</p>
                <p><strong>Headteacher Comments:</strong> {currentApplication.approvalChain.headteacher.comment}</p>
              </div>
            )}
            
            <Form form={form} layout="vertical">
              <Form.Item
                name="comment"
                label="Comments/Reason"
                rules={[{ required: true, message: 'Please provide comments or reason for your decision' }]}
              >
                <TextArea rows={4} placeholder="Provide your comments or reason for approval/rejection/objection" />
              </Form.Item>
              
              <Space>
                <Button type="primary" onClick={handleApprove}>
                  Approve
                </Button>
                <Button danger onClick={handleReject}>
                  Reject
                </Button>
                <Button type="default" onClick={handleObject}>
                  Object
                </Button>
                <Button onClick={handleCancel}>
                  Cancel
                </Button>
              </Space>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SubcountyTransferApprovalPage;
