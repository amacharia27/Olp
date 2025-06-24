// apps/frontend/src/pages/RegisterUserPage.tsx
import { useState, useEffect } from 'react';
import {
  Steps, Form, Input, Button, Typography, App as AntdApp, Select,
  Row, Col, Result, Spin, Descriptions, Divider
} from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { IApiResponse, UserRole, IUser } from '@olp-monitor/shared-types';

const { Title, Text, Link } = Typography;
const { Step } = Steps;

interface School { _id: string; name: string; }
const schoolBasedRoles = [
  UserRole.STUDENT, UserRole.PARENT, UserRole.TEACHER,
  UserRole.DEPUTY_HEADTEACHER, UserRole.HEADTEACHER, UserRole.FINANCE_ADMIN
];

const RegisterUserPage = () => {
  const navigate = useNavigate();
  const { message } = AntdApp.useApp();
  const [form] = Form.useForm();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (currentStep === 1 && schoolBasedRoles.includes(formData.role)) {
      setLoading(true);
      api.get<IApiResponse<School[]>>('/auth/schools')
        .then(res => setSchools(res.data.data))
        .catch(() => message.error('Failed to load schools list.'))
        .finally(() => setLoading(false));
    }
  }, [currentStep, formData.role]);

  const next = () => setCurrentStep(currentStep + 1);
  const prev = () => setCurrentStep(currentStep - 1);

  const handleStep0Finish = (values: { role: UserRole }) => {
    setFormData({ ...formData, ...values });
    if (!schoolBasedRoles.includes(values.role)) setCurrentStep(2); 
    else next();
  };

  const handleStep1Finish = (values: { schoolId: string }) => {
    setFormData({ ...formData, ...values });
    next();
  };

  const handleStep2Finish = (values: any) => {
    setFormData({ ...formData, ...values });
    next();
  };
  
  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await api.post<IApiResponse<IUser>>('/auth/register', formData);
      if (response.data.success) {
        setRegisteredUser(response.data.data);
        next();
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [{ title: 'Select Role' }, { title: 'Select School' }, { title: 'Your Details' }, { title: 'Confirmation' }];
  const filteredSteps = !schoolBasedRoles.includes(formData.role) && currentStep > 0 ? [steps[0], steps[2], steps[3]] : steps;
  const currentFilteredStep = !schoolBasedRoles.includes(formData.role) && currentStep > 1 ? currentStep - 1 : currentStep;

  return (
    <div>
      <Title level={2}>Create an Account</Title>
      <Steps current={currentFilteredStep} style={{ marginTop: 24, marginBottom: 24 }}>
        {filteredSteps.map(item => <Step key={item.title} title={item.title} />)}
      </Steps>

      <div className="steps-content">
        {/* --- STEP 0: ROLE --- */}
        {currentStep === 0 && ( /* ... form is unchanged ... */ <Form onFinish={handleStep0Finish} layout="vertical"><Form.Item name="role" label="I am a..." rules={[{ required: true }]}><Select placeholder="Select your role">{Object.values(UserRole).filter(role => role !== UserRole.SUPER_ADMIN).map(role => (<Select.Option key={role} value={role}>{role}</Select.Option>))}</Select></Form.Item><Form.Item><Button type="primary" htmlType="submit">Next</Button></Form.Item></Form>)}

        {/* --- STEP 1: SCHOOL --- */}
        {currentStep === 1 && schoolBasedRoles.includes(formData.role) && ( /* ... form is unchanged ... */ <Spin spinning={loading}><Form onFinish={handleStep1Finish} layout="vertical"><Form.Item name="schoolId" label="Select Your School" rules={[{ required: true }]}><Select showSearch placeholder="Type to search" filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())} options={schools.map(s => ({ value: s._id, label: s.name }))} /></Form.Item><Form.Item><Button onClick={prev} style={{ marginRight: 8 }}>Back</Button><Button type="primary" htmlType="submit">Next</Button></Form.Item></Form></Spin>)}

        {/* --- STEP 2: DETAILS (UPDATED) --- */}
        {currentStep === 2 && (
          <Form form={form} onFinish={handleStep2Finish} layout="vertical" initialValues={formData}>
            <Row gutter={16}>
              <Col span={12}><Form.Item name="firstName" label="First Name" rules={[{ required: true }]}><Input /></Form.Item></Col>
              <Col span={12}><Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}><Input /></Form.Item></Col>
            </Row>
            
            {formData.role === UserRole.STUDENT ? (
              <Form.Item name="username" label="Create a Username" rules={[{ required: true, message: 'Username is required for login.' }]}><Input /></Form.Item>
            ) : (
              <>
                <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email' }]}><Input /></Form.Item>
                <Form.Item name="phoneNumber" label="Phone Number"><Input /></Form.Item>
              </>
            )}
            
            {formData.role === UserRole.TEACHER && <Form.Item name="tscNumber" label="TSC Number" rules={[{ required: true }]}><Input /></Form.Item>}
            
            <Form.Item name="password" label="Password" rules={[{ required: true }]} hasFeedback><Input.Password /></Form.Item>
            <Form.Item name="confirm" label="Confirm Password" dependencies={['password']} hasFeedback rules={[{ required: true }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('password') === value) return Promise.resolve(); return Promise.reject(new Error('Passwords do not match!')); }})]}>
              <Input.Password />
            </Form.Item>
            
            <Form.Item>
              <Button onClick={prev}>Back</Button>
              <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>Next</Button>
            </Form.Item>
          </Form>
        )}
        
        {/* --- STEP 3: CONFIRMATION (UPDATED) --- */}
        {currentStep === 3 && (
            <Spin spinning={loading}>
                <Title level={4}>Confirm Your Details</Title>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Role">{formData.role}</Descriptions.Item>
                    {formData.schoolId && <Descriptions.Item label="School">{schools.find(s => s._id === formData.schoolId)?.name}</Descriptions.Item>}
                    <Descriptions.Item label="Name">{formData.firstName} {formData.lastName}</Descriptions.Item>
                    {formData.role === UserRole.STUDENT ? (
                        <Descriptions.Item label="Username">{formData.username}</Descriptions.Item>
                    ) : (
                        <Descriptions.Item label="Email">{formData.email}</Descriptions.Item>
                    )}
                </Descriptions>
                <div style={{ marginTop: 24 }}>
                    <Button onClick={prev}>Back</Button>
                    <Button type="primary" onClick={handleRegister} style={{ marginLeft: 8 }}>Submit Registration</Button>
                </div>
            </Spin>
        )}

        {/* --- STEP 4: SUCCESS (UPDATED) --- */}
        {currentStep === 4 && registeredUser && (
            <Result
                status="success"
                title="Registration Submitted Successfully!"
                subTitle="Your account is pending approval from school administration. You will be notified upon activation."
            >
                {registeredUser.role === UserRole.STUDENT && (
                    <Descriptions title="Your Login Credentials" bordered column={1} style={{ maxWidth: 400, margin: 'auto' }}>
                        <Descriptions.Item label="Student ID">{registeredUser.userNumber}</Descriptions.Item>
                        <Descriptions.Item label="Username">{registeredUser.username}</Descriptions.Item>
                    </Descriptions>
                )}
                <div style={{marginTop: '24px'}}>
                    <Button type="primary" key="console" onClick={() => navigate('/login')}>Go to Login</Button>
                </div>
            </Result>
        )}
      </div>
      <Divider />
      <Text type="secondary" style={{ textAlign: 'center', display: 'block' }}>Already have an account? <Link onClick={() => navigate('/login')}>Log in</Link></Text>
    </div>
  );
};

export default RegisterUserPage;