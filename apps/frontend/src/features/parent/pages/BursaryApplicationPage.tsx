// apps/frontend/src/features/parent/pages/BursaryApplicationPage.tsx
import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Card, Tabs, Steps, Typography, InputNumber, Radio, Spin, Modal, Alert, Empty, message, Space, theme, Badge } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { FileTextOutlined, SaveOutlined, SendOutlined, DollarOutlined, FormOutlined, CheckCircleFilled, ClockCircleFilled } from '@ant-design/icons';

// Import components
import DocumentUploader from '../../shared/components/DocumentUploader';
import BursaryApplicationStatus, { BursaryApplication } from '../components/BursaryApplicationStatus';

// Import context
// import { useParentDashboardContext } from '../context/ParentDashboardContext';

const { Option } = Select;
const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;
const { TabPane } = Tabs;
const { useToken } = theme;

// Types
interface BursaryFormData {
  // Personal Information
  childId: string;
  parentName: string;
  parentIdNumber: string;
  parentPhone: string;
  parentEmail: string;
  parentOccupation: string;
  
  // Financial Information
  monthlyIncome: number;
  familySize: number;
  dependents: number;
  otherSupportSources: string;
  previousBursarySupport: boolean;
  previousBursaryDetails?: string;
  
  // School Information
  schoolId: string;
  schoolName: string;
  schoolAddress: string;
  schoolPhone: string;
  schoolEmail: string;
  classLevel: string;
  term: string;
  year: string;
  feesStructure: number;
  amountPaid: number;
  amountRequested: number;
  
  // Documents
  documents: UploadFile[];
  
  // Additional Information
  reasonForApplication: string;
  specialCircumstances: string;
}

enum FormStep {
  PERSONAL_INFO = 0,
  FINANCIAL_INFO = 1,
  SCHOOL_INFO = 2,
  DOCUMENTS = 3,
  REVIEW = 4
}

// Mock data for existing bursary applications
const mockBursaryApplications: BursaryApplication[] = [
  {
    id: 'app1',
    applicationNumber: 'BUR-2023-001',
    status: 'approved',
    submissionDate: '2023-01-15',
    lastUpdated: '2023-02-01',
    applicantName: 'John Doe',
    childName: 'Jane Doe',
    schoolName: 'Example Primary School',
    term: 'Term 1',
    year: '2023',
    amountRequested: 10000,
    amountApproved: 8000,
    documents: [
      { name: 'ID.pdf', type: 'pdf', uploadDate: '2023-01-10', status: 'verified' },
      { name: 'BirthCertificate.pdf', type: 'pdf', uploadDate: '2023-01-10', status: 'verified' },
      { name: 'FeeStructure.pdf', type: 'pdf', uploadDate: '2023-01-10', status: 'verified' }
    ],
    timeline: [
      { date: '2023-01-15', status: 'submitted', description: 'Application submitted' },
      { date: '2023-01-20', status: 'under_review', description: 'Application under review' },
      { date: '2023-02-01', status: 'approved', description: 'Application approved' }
    ]
  },
  {
    id: 'app2',
    applicationNumber: 'BUR-2023-002',
    status: 'submitted',
    submissionDate: '2023-03-10',
    lastUpdated: '2023-03-10',
    applicantName: 'John Doe',
    childName: 'Jack Doe',
    schoolName: 'Example Secondary School',
    term: 'Term 2',
    year: '2023',
    amountRequested: 15000,
    documents: [
      { name: 'ID.jpg', type: 'image', uploadDate: '2023-03-09', status: 'uploaded' },
      { name: 'BirthCertificate.pdf', type: 'pdf', uploadDate: '2023-03-09', status: 'uploaded' },
      { name: 'FeeStructure.pdf', type: 'pdf', uploadDate: '2023-03-09', status: 'uploaded' }
    ],
    timeline: [
      { date: '2023-03-10', status: 'submitted', description: 'Application submitted' }
    ]
  },
  {
    id: 'app3',
    applicationNumber: 'BUR-2023-003',
    status: 'rejected',
    submissionDate: '2023-04-05',
    lastUpdated: '2023-04-20',
    applicantName: 'John Doe',
    childName: 'Jane Doe',
    schoolName: 'Example Primary School',
    term: 'Term 2',
    year: '2023',
    amountRequested: 12000,
    amountApproved: 0,
    documents: [
      { name: 'ID.pdf', type: 'pdf', uploadDate: '2023-04-04', status: 'rejected' },
      { name: 'BirthCertificate.pdf', type: 'pdf', uploadDate: '2023-04-04', status: 'verified' },
      { name: 'FeeStructure.pdf', type: 'pdf', uploadDate: '2023-04-04', status: 'verified' }
    ],
    timeline: [
      { date: '2023-04-05', status: 'submitted', description: 'Application submitted' },
      { date: '2023-04-15', status: 'under_review', description: 'Application under review' },
      { date: '2023-04-20', status: 'rejected', description: 'Incomplete documentation' }
    ]
  },
  {
    id: 'app4',
    applicationNumber: 'BUR-2025-003',
    status: 'draft',
    lastUpdated: '2025-06-10',
    applicantName: 'John Doe',
    childName: 'Jessica Doe',
    schoolName: 'Starlight Academy',
    term: 'Term 2',
    year: '2025',
    amountRequested: 18000,
    documents: [
      { name: 'Fee Structure.pdf', type: 'pdf', uploadDate: '2025-06-10', status: 'uploaded' }
    ],
    timeline: [
      { date: '2025-06-10', status: 'Draft Created', description: 'Application draft created', actor: 'John Doe' }
    ]
  }
];

// Mock data for schools
const mockSchools = [
  { id: '1', name: 'Sunshine Primary School' },
  { id: '2', name: 'Moonlight Secondary School' },
  { id: '3', name: 'Starlight Academy' },
  { id: '4', name: 'Green Valley School' },
  { id: '5', name: 'Blue Mountain High School' }
];

// Mock data for class levels
const mockClassLevels = [
  { id: '1', name: 'Grade 1' },
  { id: '2', name: 'Grade 2' },
  { id: '3', name: 'Grade 3' },
  { id: '4', name: 'Grade 4' },
  { id: '5', name: 'Grade 5' },
  { id: '6', name: 'Grade 6' },
  { id: '7', name: 'Form 1' },
  { id: '8', name: 'Form 2' },
  { id: '9', name: 'Form 3' },
  { id: '10', name: 'Form 4' }
];

const BursaryApplicationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('application');
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.PERSONAL_INFO);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [applications, setApplications] = useState<BursaryApplication[]>([]);
  const [form] = Form.useForm<BursaryFormData>();
  const [documents, setDocuments] = useState<UploadFile[]>([]);
  const [confirmVisible, setConfirmVisible] = useState<boolean>(false);
  const [savingDraft, setSavingDraft] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { token } = useToken();
  // Temporarily comment out context usage until export issue is fixed
  // const parentContext = useContext(ParentDashboardContext);
  
  // Load existing applications
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setApplications(mockBursaryApplications);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Handle document upload changes
  const handleDocumentsChange = (fileList: UploadFile[]) => {
    setDocuments(fileList);
    form.setFieldsValue({ documents: fileList });
  };
  
  // Handle form submission
  const handleSubmit = () => {
    form.validateFields().then(() => {
      setConfirmVisible(true);
    }).catch(() => {
      message.error('Please fill all required fields');
    });
  };
  
  // Handle saving draft
  const handleSaveDraft = () => {
    setSavingDraft(true);
    // Simulate API call
    setTimeout(() => {
      message.success('Draft saved successfully');
      setSavingDraft(false);
    }, 1000);
  };
  
  // Handle final submission after confirmation
  const handleConfirmSubmit = () => {
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      message.success('Application submitted successfully');
      setSubmitting(false);
      setConfirmVisible(false);
      setActiveTab('status');
      // Reset form
      form.resetFields();
      setCurrentStep(FormStep.PERSONAL_INFO);
    }, 2000);
  };
  
  // Render personal information form
  const renderPersonalInfoForm = () => {
    return (
      <div>
        <Form.Item
          name="childId"
          label="Child"
          rules={[{ required: true, message: 'Please select a child' }]}
        >
          <Select placeholder="Select child">
            {/* Temporarily use mock data for children */}
            <Option value="child1">John Doe</Option>
            <Option value="child2">Jane Doe</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="parentName"
          label="Parent/Guardian Name"
          rules={[{ required: true, message: 'Please enter parent name' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="parentIdNumber"
          label="ID Number"
          rules={[{ required: true, message: 'Please enter ID number' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="parentPhone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="parentEmail"
          label="Email Address"
          rules={[{ type: 'email', message: 'Please enter a valid email' }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          name="parentOccupation"
          label="Occupation"
          rules={[{ required: true, message: 'Please enter occupation' }]}
        >
          <Input />
        </Form.Item>
      </div>
    );
  };
  
  // Render financial information form
  const renderFinancialInfoForm = () => {
    return (
      <div>
        <Form.Item
          name="monthlyIncome"
          label="Monthly Income (KES)"
          rules={[{ required: true, message: 'Please enter monthly income' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        
        <Form.Item
          name="familySize"
          label="Family Size"
          rules={[{ required: true, message: 'Please enter family size' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        
        <Form.Item
          name="dependents"
          label="Number of Dependents"
          rules={[{ required: true, message: 'Please enter number of dependents' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        
        <Form.Item
          name="otherSupportSources"
          label="Other Sources of Support"
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        
        <Form.Item
          name="previousBursarySupport"
          label="Have you received bursary support before?"
          rules={[{ required: true, message: 'Please select an option' }]}
        >
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
        
        <Form.Item
          name="previousBursaryDetails"
          label="Details of previous bursary support"
          dependencies={['previousBursarySupport']}
          rules={[
            ({ getFieldValue }) => ({
              required: getFieldValue('previousBursarySupport') === true,
              message: 'Please provide details of previous bursary support',
            }),
          ]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </div>
    );
  };
  
  // Render school information form
  const renderSchoolInfoForm = () => {
    return (
      <div>
        <Form.Item
          name="schoolId"
          label="School"
          rules={[{ required: true, message: 'Please select a school' }]}
        >
          <Select placeholder="Select school">
            {mockSchools.map(school => (
              <Option key={school.id} value={school.id}>{school.name}</Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item
          name="classLevel"
          label="Class Level"
          rules={[{ required: true, message: 'Please select class level' }]}
        >
          <Select placeholder="Select class level">
            {mockClassLevels.map(level => (
              <Option key={level.id} value={level.id}>{level.name}</Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item
          name="term"
          label="Term"
          rules={[{ required: true, message: 'Please select term' }]}
        >
          <Select placeholder="Select term">
            <Option value="Term 1">Term 1</Option>
            <Option value="Term 2">Term 2</Option>
            <Option value="Term 3">Term 3</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="year"
          label="Year"
          rules={[{ required: true, message: 'Please select year' }]}
        >
          <Select placeholder="Select year">
            <Option value="2023">2023</Option>
            <Option value="2024">2024</Option>
            <Option value="2025">2025</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          name="feesStructure"
          label="Total Fees (KES)"
          rules={[{ required: true, message: 'Please enter total fees' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        
        <Form.Item
          name="amountPaid"
          label="Amount Already Paid (KES)"
          rules={[{ required: true, message: 'Please enter amount paid' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        
        <Form.Item
          name="amountRequested"
          label="Amount Requested (KES)"
          rules={[{ required: true, message: 'Please enter amount requested' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
      </div>
    );
  };
  
  // Render documents upload form
  const renderDocumentsForm = () => {
    return (
      <div>
        <Paragraph>
          Please upload the following required documents to support your application:
        </Paragraph>
        <ul>
          <li>ID/Passport copy</li>
          <li>Child's birth certificate</li>
          <li>School fee structure</li>
          <li>Proof of income (if applicable)</li>
          <li>Any other supporting documents</li>
        </ul>
        
        <Form.Item
          name="documents"
          rules={[{ required: true, message: 'Please upload at least one document' }]}
        >
          <DocumentUploader
            initialFileList={documents}
            onChange={handleDocumentsChange}
            maxSize={5}
            acceptedFileTypes={['.pdf', '.jpg', '.jpeg', '.png']}
          />
        </Form.Item>
      </div>
    );
  };
  
  // Render review form
  const renderReviewForm = () => {
    const formValues = form.getFieldsValue();
    return (
      <div>
        <Alert
          message="Please review your application before submission"
          description="Ensure all information provided is accurate and complete. Once submitted, you will not be able to edit your application."
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        
        <Card title="Personal Information" style={{ marginBottom: 16 }}>
          <p><strong>Child:</strong> {formValues.childId === 'child1' ? 'John Doe' : 'Jane Doe'}</p>
          <p><strong>Parent/Guardian Name:</strong> {formValues.parentName}</p>
          <p><strong>ID Number:</strong> {formValues.parentIdNumber}</p>
          <p><strong>Phone Number:</strong> {formValues.parentPhone}</p>
          <p><strong>Email Address:</strong> {formValues.parentEmail}</p>
          <p><strong>Occupation:</strong> {formValues.parentOccupation}</p>
        </Card>
        
        <Card title="Financial Information" style={{ marginBottom: 16 }}>
          <p><strong>Monthly Income:</strong> KES {formValues.monthlyIncome}</p>
          <p><strong>Family Size:</strong> {formValues.familySize}</p>
          <p><strong>Number of Dependents:</strong> {formValues.dependents}</p>
          <p><strong>Other Sources of Support:</strong> {formValues.otherSupportSources || 'None'}</p>
          <p><strong>Previous Bursary Support:</strong> {formValues.previousBursarySupport ? 'Yes' : 'No'}</p>
          {formValues.previousBursarySupport && (
            <p><strong>Details:</strong> {formValues.previousBursaryDetails}</p>
          )}
        </Card>
        
        <Card title="School Information" style={{ marginBottom: 16 }}>
          <p><strong>School:</strong> {
            mockSchools.find(s => s.id === formValues.schoolId)?.name || ''
          }</p>
          <p><strong>Class Level:</strong> {
            mockClassLevels.find(c => c.id === formValues.classLevel)?.name || ''
          }</p>
          <p><strong>Term:</strong> {formValues.term}</p>
          <p><strong>Year:</strong> {formValues.year}</p>
          <p><strong>Total Fees:</strong> KES {formValues.feesStructure}</p>
          <p><strong>Amount Already Paid:</strong> KES {formValues.amountPaid}</p>
          <p><strong>Amount Requested:</strong> KES {formValues.amountRequested}</p>
        </Card>
        
        <Card title="Uploaded Documents" style={{ marginBottom: 16 }}>
          <ul>
            {documents.map((doc, index) => (
              <li key={index}>{doc.name}</li>
            ))}
          </ul>
        </Card>
        
        <Form.Item
          name="reasonForApplication"
          label="Reason for Application"
          rules={[{ required: true, message: 'Please provide reason for application' }]}
        >
          <Input.TextArea rows={4} placeholder="Please explain why you are applying for this bursary" />
        </Form.Item>
        
        <Form.Item
          name="specialCircumstances"
          label="Special Circumstances (if any)"
        >
          <Input.TextArea rows={4} placeholder="Please describe any special circumstances that should be considered" />
        </Form.Item>
      </div>
    );
  };
  
  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case FormStep.PERSONAL_INFO:
        return renderPersonalInfoForm();
      case FormStep.FINANCIAL_INFO:
        return renderFinancialInfoForm();
      case FormStep.SCHOOL_INFO:
        return renderSchoolInfoForm();
      case FormStep.DOCUMENTS:
        return renderDocumentsForm();
      case FormStep.REVIEW:
        return renderReviewForm();
      default:
        return null;
    }
  };



  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24
      }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>Bursary Application</Title>
          <Paragraph type="secondary">Apply for financial assistance for your child's education</Paragraph>
        </div>
        <Space>
          <Badge count={applications.filter(app => app.status === 'approved').length} color="green">
            <Button type="text" icon={<CheckCircleFilled style={{ color: token.colorSuccess }} />}>Approved</Button>
          </Badge>
          <Badge count={applications.filter(app => app.status === 'submitted' || app.status === 'under_review').length} color="blue">
            <Button type="text" icon={<ClockCircleFilled style={{ color: token.colorWarning }} />}>Pending</Button>
          </Badge>
        </Space>
      </div>
      
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        type="card"
        style={{ 
          marginBottom: 24,
          background: token.colorBgContainer,
          borderRadius: token.borderRadiusLG,
          padding: '16px 16px 0',
          boxShadow: token.boxShadowTertiary
        }}
      >
        <TabPane tab={<Space><FormOutlined />Apply for Bursary</Space>} key="application">
          <Card
            bordered={false}
            style={{ 
              borderRadius: token.borderRadiusLG,
              boxShadow: token.boxShadowTertiary
            }}
          >
            <Steps 
              current={currentStep} 
              style={{ marginBottom: 32 }}
              progressDot
            >
              <Step title="Personal Information" description="Your details" />
              <Step title="Financial Information" description="Income & expenses" />
              <Step title="School Information" description="School & fees" />
              <Step title="Documents" description="Upload files" />
              <Step title="Review & Submit" description="Final check" />
            </Steps>
            
            <Form
              form={form}
              layout="vertical"
              requiredMark="optional"
              initialValues={{
                previousBursarySupport: false,
              }}
            >
              {renderStepContent()}
            </Form>
            
            <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between' }}>
              {currentStep > FormStep.PERSONAL_INFO && (
                <Button 
                  size="large"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                >
                  Previous
                </Button>
              )}
              <div style={{ marginLeft: 'auto' }}>
                {currentStep < FormStep.REVIEW && (
                  <Button 
                    type="primary" 
                    size="large"
                    onClick={() => setCurrentStep(prev => prev + 1)} 
                    style={{ marginLeft: 8 }}
                  >
                    Next
                  </Button>
                )}
                {currentStep === FormStep.REVIEW && (
                  <Space>
                    <Button 
                      icon={<SaveOutlined />} 
                      size="large"
                      onClick={handleSaveDraft} 
                      loading={savingDraft}
                    >
                      Save as Draft
                    </Button>
                    <Button 
                      type="primary" 
                      icon={<SendOutlined />} 
                      size="large"
                      onClick={handleSubmit}
                    >
                      Submit Application
                    </Button>
                  </Space>
                )}
              </div>
            </div>
          </Card>
        </TabPane>
        
        <TabPane tab={<Space><FileTextOutlined />Application Status</Space>} key="status">
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
              <Spin size="large" tip="Loading applications..." />
            </div>
          ) : applications.length > 0 ? (
            <div>
              <Card
                bordered={false}
                style={{ 
                  borderRadius: token.borderRadiusLG,
                  boxShadow: token.boxShadowTertiary
                }}
              >
                <Title level={4} style={{ marginBottom: 24 }}>Your Applications</Title>
                <div style={{ marginBottom: 24 }}>
                  <Space wrap>
                    {['all', 'submitted', 'under_review', 'approved', 'rejected', 'draft'].map(status => {
                      // Get icon based on status
                      let icon;
                      if (status !== 'all') {
                        switch(status) {
                          case 'approved':
                            icon = <CheckCircleFilled style={{ color: token.colorSuccess, fontSize: 16 }} />;
                            break;
                          case 'submitted':
                          case 'under_review':
                            icon = <ClockCircleFilled style={{ color: token.colorWarning, fontSize: 16 }} />;
                            break;
                          default:
                            icon = <FormOutlined style={{ color: token.colorPrimary, fontSize: 16 }} />;
                        }
                      } else {
                        icon = <FormOutlined style={{ color: token.colorPrimary, fontSize: 16 }} />;
                      }
                      
                      return (
                        <Button 
                          key={status}
                          type={status === 'all' ? 'primary' : 'default'}
                          icon={icon}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                        </Button>
                      );
                    })}
                  </Space>
                </div>
                {applications.map(application => (
                  <BursaryApplicationStatus 
                    key={application.id}
                    application={application}
                  />
                ))}
              </Card>
            </div>
          ) : (
            <Card
              bordered={false}
              style={{ 
                borderRadius: token.borderRadiusLG,
                boxShadow: token.boxShadowTertiary
              }}
            >
              <Empty
                description={
                  <div>
                    <Text strong style={{ fontSize: 16, display: 'block', marginBottom: 8 }}>No applications found</Text>
                    <Text type="secondary">Start a new application by clicking on the "Apply for Bursary" tab</Text>
                  </div>
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </Card>
          )}
        </TabPane>
      </Tabs>
      
      <Modal
        title={<div style={{ display: 'flex', alignItems: 'center' }}>
          <DollarOutlined style={{ fontSize: 24, color: token.colorPrimary, marginRight: 12 }} />
          <span>Confirm Submission</span>
        </div>}
        open={confirmVisible}
        onOk={handleConfirmSubmit}
        confirmLoading={submitting}
        onCancel={() => setConfirmVisible(false)}
        okText="Submit Application"
        cancelText="Review Again"
        okButtonProps={{ icon: <SendOutlined /> }}
      >
        <Alert
          message="Final Confirmation"
          description="Are you sure you want to submit this bursary application? Once submitted, you cannot edit it."
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />
        <Paragraph>
          Please ensure all information is accurate and all required documents have been uploaded.
        </Paragraph>
      </Modal>
    </div>
  );
};

export default BursaryApplicationPage;
