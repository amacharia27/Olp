// apps/frontend/src/pages/LoginPage.tsx
import { LockOutlined, UserOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, App as AntdApp, Checkbox, Divider, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { useAuthStore } from '@/store/auth.store';
import { IApiResponse, ILoginResponse } from '@olp-monitor/shared-types';
import { superAdminCredentials, superAdminUser } from '@/data/super-admin';

const { Title, Text, Link } = Typography;

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { message } = AntdApp.useApp();

  // In apps/frontend/src/pages/LoginPage.tsx

  const onFinish = async (values: any) => {
    try {
      // Check if the login is for the super admin (development mode)
      if (values.identifier === superAdminCredentials.identifier && 
          values.password === superAdminCredentials.password) {
        // Create a mock token for the super admin
        const mockToken = 'super-admin-dev-token';
        
        // Use the predefined super admin user
        login(superAdminUser, mockToken);
        message.success('Super Admin Login Successful!');
        navigate('/system-dashboard');
        return;
      }
      
      // Regular login flow for other users
      const response = await api.post<IApiResponse<ILoginResponse>>('/auth/login', {
        identifier: values.identifier,
        password: values.password,
      });

      if (response.data.success) {
        const { token, user } = response.data.data;
        login(user, token);
        message.success('Login Successful!');
        
        // Direct role-based redirection instead of going through the root path
        switch (user.role) {
          case 'Student':
            navigate('/student-dashboard');
            break;
          case 'Teacher':
            navigate('/teacher-dashboard');
            break;
          case 'Parent':
            navigate('/children-overview');
            break;
          case 'Headteacher':
            navigate('/headteacher-dashboard');
            break;
          case 'DeputyHeadteacher':
            navigate('/deputy-dashboard');
            break;
          case 'FinanceAdmin':
            navigate('/finance-dashboard');
            break;
          case 'SubCountyOfficial':
            navigate('/sub-county-dashboard');
            break;
          case 'CountyOfficial':
            navigate('/county-dashboard');
            break;
          case 'NationalOfficial':
            navigate('/national-dashboard');
            break;
          case 'SuperAdmin':
            navigate('/system-dashboard');
            break;
          default:
            // Fallback to the root path which should trigger DashboardIndexPage
            navigate('/');
        }
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      message.error(errorMessage);
    }
  };
  


  return (
    <div>
      <Title level={2} style={{ marginBottom: 0 }}>Welcome to OLP Monitor</Title>
      <Text type="secondary">Log in to your account to continue.</Text>

      <a href="/api/v1/auth/google">
        <Button icon={<GoogleOutlined />} size="large" style={{ width: '100%', marginTop: '24px' }}>
          Log in with Google
        </Button>
      </a>

      <Divider>or</Divider>
      


      <Form
        name="normal_login"
        layout="vertical"
        onFinish={onFinish} // onFinish handler needs to be updated
        size="large"
      >
        <Form.Item
          name="identifier" // CHANGED from 'email'
          label="Student ID / Username / Email" // CHANGED
          rules={[{ required: true, message: 'Please enter your login identifier!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter your ID, username, or email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Enter password"
          />
        </Form.Item>
        
        { /* The rest of the form (checkbox, buttons, etc.) remains the same */ }
        <Row justify="space-between" align="middle"><Col><Form.Item name="remember" valuePropName="checked" noStyle><Checkbox>Remember me</Checkbox></Form.Item></Col><Col><Link onClick={() => navigate('/forgot-password')}>Forgot password?</Link></Col></Row>
        <Form.Item style={{ marginTop: '24px' }}><Button type="primary" htmlType="submit" style={{ width: '100%' }} size="large">Log in</Button></Form.Item>
        <Text type="secondary" style={{ textAlign: 'center', display: 'block' }}>Don't have an account?{' '}<Link onClick={() => navigate('/register')}>Sign up</Link></Text>
      </Form>
    </div>
  );
};

export default LoginPage;