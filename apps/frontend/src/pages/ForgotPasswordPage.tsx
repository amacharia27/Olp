// apps/frontend/src/pages/ForgotPasswordPage.tsx
import { useState } from 'react';
import { Form, Input, Button, Typography, App as AntdApp } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '@/services/api';

const { Title, Text, Link } = Typography;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { message } = AntdApp.useApp();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email: values.email });
      setSubmitted(true);
    } catch (error: any) {
      message.error(error.response?.data?.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div>
        <Title level={3}>Check Your Email</Title>
        <Text>If an account with that email exists, we have sent a password reset link to it.</Text>
        <Button type="primary" onClick={() => navigate('/login')} style={{ marginTop: 24, width: '100%' }}>
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Title level={3}>Forgot Password?</Title>
      <Text type="secondary">Enter your email address and we'll send you a link to reset your password.</Text>
      <Form onFinish={onFinish} layout="vertical" style={{ marginTop: 24 }}>
        <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email' }]}>
          <Input placeholder="you@example.com" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Send Reset Link
          </Button>
        </Form.Item>
        <Text style={{ textAlign: 'center', display: 'block' }}>
          <Link onClick={() => navigate('/login')}>Back to Login</Link>
        </Text>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage;