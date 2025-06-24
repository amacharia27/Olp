// apps/frontend/src/pages/ResetPasswordPage.tsx
import { Form, Input, Button, Typography, App as AntdApp, Result } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import api from '@/services/api';

const { Title } = Typography;

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const { message } = AntdApp.useApp();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await api.put(`/auth/reset-password/${token}`, { password: values.password });
      setSuccess(true);
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Result
        status="success"
        title="Password Reset Successfully!"
        extra={
          <Button type="primary" onClick={() => navigate('/login')}>
            Proceed to Login
          </Button>
        }
      />
    );
  }

  return (
    <div>
      <Title level={3}>Set a New Password</Title>
      <Form onFinish={onFinish} layout="vertical" style={{ marginTop: 24 }}>
        <Form.Item name="password" label="New Password" rules={[{ required: true, min: 6 }]} hasFeedback>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm New Password"
          dependencies={['password']}
          hasFeedback
          rules={[{ required: true }, ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) return Promise.resolve();
              return Promise.reject(new Error('The two passwords do not match!'));
            },
          })]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPasswordPage;