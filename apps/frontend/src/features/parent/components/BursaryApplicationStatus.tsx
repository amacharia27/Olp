// apps/frontend/src/features/parent/components/BursaryApplicationStatus.tsx
import React from 'react';
import { Steps, Card, Typography, Tag, Descriptions, Button, Space, Timeline, Tooltip } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, FileDoneOutlined, FileSearchOutlined, FileTextOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

export interface BursaryApplication {
  id: string;
  applicationNumber: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  submissionDate?: string;
  lastUpdated: string;
  applicantName: string;
  childName: string;
  schoolName: string;
  term: string;
  year: string;
  amountRequested: number;
  amountApproved?: number;
  rejectionReason?: string;
  documents: {
    name: string;
    type: string;
    uploadDate: string;
    status: 'uploaded' | 'verified' | 'rejected';
  }[];
  timeline: {
    date: string;
    status: string;
    description: string;
    actor?: string;
  }[];
}

interface BursaryApplicationStatusProps {
  application: BursaryApplication;
  onEdit?: () => void;
  onViewDetails?: () => void;
  onWithdraw?: () => void;
}

const BursaryApplicationStatus: React.FC<BursaryApplicationStatusProps> = ({
  application,
  onEdit,
  onViewDetails,
  onWithdraw
}) => {
  // Helper function to get current step based on status
  const getCurrentStep = (status: BursaryApplication['status']) => {
    switch (status) {
      case 'draft': return 0;
      case 'submitted': return 1;
      case 'under_review': return 2;
      case 'approved': return 3;
      case 'rejected': return 3;
      default: return 0;
    }
  };

  // Helper function to get status tag
  const getStatusTag = (status: BursaryApplication['status']) => {
    switch (status) {
      case 'draft':
        return <Tag color="blue">Draft</Tag>;
      case 'submitted':
        return <Tag color="cyan">Submitted</Tag>;
      case 'under_review':
        return <Tag color="orange">Under Review</Tag>;
      case 'approved':
        return <Tag color="green">Approved</Tag>;
      case 'rejected':
        return <Tag color="red">Rejected</Tag>;
      default:
        return <Tag>Unknown</Tag>;
    }
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bursary-application-status">
      <Card bordered={false}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={4}>Bursary Application #{application.applicationNumber}</Title>
            {getStatusTag(application.status)}
          </div>

          <Steps current={getCurrentStep(application.status)} status={application.status === 'rejected' ? 'error' : 'process'}>
            <Step title="Draft" icon={<FileTextOutlined />} />
            <Step title="Submitted" icon={<FileDoneOutlined />} />
            <Step title="Under Review" icon={<FileSearchOutlined />} />
            <Step 
              title={application.status === 'rejected' ? 'Rejected' : 'Approved'} 
              icon={application.status === 'rejected' ? <CloseCircleOutlined /> : <CheckCircleOutlined />} 
            />
          </Steps>

          <Descriptions title="Application Details" bordered column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
            <Descriptions.Item label="Applicant">{application.applicantName}</Descriptions.Item>
            <Descriptions.Item label="Child">{application.childName}</Descriptions.Item>
            <Descriptions.Item label="School">{application.schoolName}</Descriptions.Item>
            <Descriptions.Item label="Term/Year">{application.term}, {application.year}</Descriptions.Item>
            <Descriptions.Item label="Amount Requested">KES {application.amountRequested.toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="Amount Approved">
              {application.amountApproved ? `KES ${application.amountApproved.toLocaleString()}` : 'Pending'}
            </Descriptions.Item>
            <Descriptions.Item label="Submission Date">{formatDate(application.submissionDate)}</Descriptions.Item>
            <Descriptions.Item label="Last Updated">{formatDate(application.lastUpdated)}</Descriptions.Item>
          </Descriptions>

          {application.status === 'rejected' && application.rejectionReason && (
            <Card title="Rejection Reason" bordered={false} style={{ backgroundColor: '#fff2f0' }}>
              <Paragraph>{application.rejectionReason}</Paragraph>
            </Card>
          )}

          <Card title="Application Timeline" bordered={false}>
            <Timeline mode="left">
              {application.timeline.map((event, index) => (
                <Timeline.Item 
                  key={index}
                  color={
                    event.status.includes('reject') ? 'red' : 
                    event.status.includes('approv') ? 'green' : 
                    'blue'
                  }
                  label={formatDate(event.date)}
                >
                  <Text strong>{event.status}</Text>
                  <br />
                  <Text>{event.description}</Text>
                  {event.actor && (
                    <div>
                      <Text type="secondary">By: {event.actor}</Text>
                    </div>
                  )}
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>

          <Card title="Uploaded Documents" bordered={false}>
            <Timeline>
              {application.documents.map((doc, index) => (
                <Timeline.Item 
                  key={index}
                  dot={
                    doc.status === 'verified' ? <CheckCircleOutlined style={{ color: 'green' }} /> :
                    doc.status === 'rejected' ? <CloseCircleOutlined style={{ color: 'red' }} /> :
                    <ClockCircleOutlined style={{ color: 'blue' }} />
                  }
                >
                  <Space>
                    <Text>{doc.name}</Text>
                    {doc.status === 'verified' && <Tag color="green">Verified</Tag>}
                    {doc.status === 'rejected' && <Tag color="red">Rejected</Tag>}
                    {doc.status === 'uploaded' && <Tag color="blue">Pending Verification</Tag>}
                  </Space>
                  <br />
                  <Text type="secondary">Uploaded on {formatDate(doc.uploadDate)}</Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            {application.status === 'draft' && (
              <Button type="primary" onClick={onEdit}>
                Continue Editing
              </Button>
            )}
            <Button type="default" onClick={onViewDetails}>
              View Full Details
            </Button>
            {['draft', 'submitted'].includes(application.status) && (
              <Tooltip title="Withdraw your application">
                <Button danger onClick={onWithdraw}>
                  Withdraw Application
                </Button>
              </Tooltip>
            )}
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default BursaryApplicationStatus;
