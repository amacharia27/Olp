import React, { useState } from 'react';
import { Row, Col, Card, Typography, Divider, Steps, Button } from 'antd';
import { CheckCircleOutlined, FormOutlined } from '@ant-design/icons';
import DisciplineReportForm from '../components/DisciplineReportForm';
import { DisciplineReportFormData, DisciplineIncident, IncidentStatus } from '../types';
import { mockStudents } from '../mockData';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const DisciplineReportPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submittedReport, setSubmittedReport] = useState<DisciplineIncident | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (formData: DisciplineReportFormData) => {
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, this would be an API call to create the incident
      const newIncident: DisciplineIncident = {
        id: Math.random().toString(36).substring(2, 15),
        title: formData.title,
        description: formData.description,
        date: formData.date,
        location: formData.location,
        severity: formData.severity,
        status: IncidentStatus.REPORTED,
        studentId: formData.studentId,
        student: mockStudents.find(s => s.id === formData.studentId),
        reportedById: '101', // In a real app, this would be the current user's ID
        witnesses: formData.witnesses,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      setSubmittedReport(newIncident);
      setCurrentStep(1);
      setLoading(false);
    }, 1000);
  };

  const handleNewReport = () => {
    setCurrentStep(0);
    setSubmittedReport(null);
  };

  const steps = [
    {
      title: 'Report Incident',
      content: <DisciplineReportForm onSubmit={handleSubmit} loading={loading} />,
      icon: <FormOutlined />
    },
    {
      title: 'Confirmation',
      content: (
        <Card>
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a' }} />
            <Title level={3}>Incident Report Submitted</Title>
            <Paragraph>
              Your incident report has been submitted successfully and is now pending review.
            </Paragraph>
          </div>
          
          <Divider />
          
          {submittedReport && (
            <div>
              <Title level={5}>Report Details</Title>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text strong>Incident ID:</Text> {submittedReport.id}
                </Col>
                <Col span={12}>
                  <Text strong>Status:</Text> {submittedReport.status.replace('_', ' ').toUpperCase()}
                </Col>
                <Col span={12}>
                  <Text strong>Student:</Text> {submittedReport.student?.name}
                </Col>
                <Col span={12}>
                  <Text strong>Date:</Text> {dayjs(submittedReport.date).format('MMMM D, YYYY h:mm A')}
                </Col>
                <Col span={24}>
                  <Text strong>Title:</Text> {submittedReport.title}
                </Col>
                <Col span={24}>
                  <Text strong>Description:</Text> {submittedReport.description}
                </Col>
                <Col span={12}>
                  <Text strong>Location:</Text> {submittedReport.location}
                </Col>
                <Col span={12}>
                  <Text strong>Severity:</Text> {submittedReport.severity.toUpperCase()}
                </Col>
              </Row>
              
              <Divider />
              
              <Paragraph>
                The deputy headteacher will review this report and may take appropriate disciplinary action.
                You will be notified of any updates.
              </Paragraph>
              
              <Button type="primary" onClick={handleNewReport}>
                Report Another Incident
              </Button>
            </div>
          )}
        </Card>
      ),
      icon: <CheckCircleOutlined />
    }
  ];

  return (
    <div>
      <Title level={2}>Discipline Incident Reporting</Title>
      <Text type="secondary">
        Report student discipline incidents for review and action by school administration.
      </Text>
      
      <Divider />
      
      <Steps current={currentStep} style={{ marginBottom: 24 }}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} icon={item.icon} />
        ))}
      </Steps>
      
      <div>{steps[currentStep].content}</div>
    </div>
  );
};

export default DisciplineReportPage;
