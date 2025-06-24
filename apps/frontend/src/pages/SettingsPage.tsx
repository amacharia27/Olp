// apps/frontend/src/pages/SettingsPage.tsx
import { useState } from 'react';
import { 
  Card, Typography, Form, Input, Button, message, Switch, 
  Tabs, Row, Col, Select, Radio, Alert, Popconfirm, notification
} from 'antd';
import { 
  LockOutlined, BellOutlined, UserOutlined, MailOutlined, 
  EyeOutlined, DeleteOutlined, SaveOutlined, QuestionCircleOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const SettingsPage = () => {
  const [form] = Form.useForm();
  const [notificationForm] = Form.useForm();
  const [profileForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('1');
  
  // Security settings
  const [loginAlerts, setLoginAlerts] = useState(true);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  
  // Privacy settings
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [showGrades, setShowGrades] = useState(true);
  const [showAttendance, setShowAttendance] = useState(false);
  
  // Profile settings
  const [profileData, setProfileData] = useState({
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    language: 'en',
    timezone: 'Africa/Nairobi',
  });

  const onFinishPasswordChange = (values: any) => {
    // TODO: API call to change password
    console.log('Change password values:', values);
    message.success('Password changed successfully!');
    form.resetFields();
  };
  
  const handleNotificationSave = () => {
    // In a real app, this would make an API call to save notification settings
    message.success('Notification settings updated successfully!');
  };
  
  const handlePrivacySave = () => {
    // In a real app, this would make an API call to save privacy settings
    message.success('Privacy settings updated successfully!');
  };
  
  const handleProfileSave = (values: any) => {
    // In a real app, this would make an API call to save profile settings
    setProfileData(values);
    message.success('Profile settings updated successfully!');
  };
  
  const handleDeleteAccount = () => {
    // In a real app, this would make an API call to delete the account
    notification.success({
      message: 'Account Deletion Requested',
      description: 'Your account deletion request has been submitted. An administrator will contact you shortly.',
    });
  };

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <Title level={2}>Settings</Title>
      
      <Card bordered={false} style={{ marginBottom: 24 }}>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          type="card"
          items={[
            {
              key: '1',
              label: (
                <span>
                  <UserOutlined /> Profile
                </span>
              ),
              children: (
                <div style={{ padding: '16px 0' }}>
                  <Title level={4}>Profile Settings</Title>
                  <Paragraph>Manage your personal information and preferences.</Paragraph>
                  
                  <Form
                    form={profileForm}
                    layout="vertical"
                    initialValues={profileData}
                    onFinish={handleProfileSave}
                    style={{ maxWidth: 600 }}
                  >
                    <Row gutter={16}>
                      <Col span={24}>
                        <Form.Item
                          name="displayName"
                          label="Display Name"
                          rules={[{ required: true, message: 'Please enter your display name' }]}
                        >
                          <Input prefix={<UserOutlined />} />
                        </Form.Item>
                      </Col>
                    </Row>
                    
                    <Form.Item
                      name="email"
                      label="Email Address"
                      rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                    >
                      <Input prefix={<MailOutlined />} />
                    </Form.Item>
                    
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="language"
                          label="Language"
                        >
                          <Select>
                            <Option value="en">English</Option>
                            <Option value="sw">Swahili</Option>
                            <Option value="fr">French</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="timezone"
                          label="Timezone"
                        >
                          <Select>
                            <Option value="Africa/Nairobi">East Africa Time (EAT)</Option>
                            <Option value="UTC">Coordinated Universal Time (UTC)</Option>
                            <Option value="Europe/London">Greenwich Mean Time (GMT)</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    
                    <Form.Item>
                      <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                        Save Profile Settings
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              ),
            },
            {
              key: '2',
              label: (
                <span>
                  <LockOutlined /> Security
                </span>
              ),
              children: (
                <div style={{ padding: '16px 0' }}>
                  <Title level={4}>Security Settings</Title>
                  <Paragraph>Manage your password and account security.</Paragraph>
                  
                  <Card 
                    title="Change Password" 
                    size="small" 
                    bordered={false}
                    style={{ marginBottom: 24, background: '#f9f9f9' }}
                  >
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={onFinishPasswordChange}
                    >
                      <Form.Item
                        name="currentPassword"
                        label="Current Password"
                        rules={[{ required: true, message: 'Please input your current password!' }]}
                      >
                        <Input.Password prefix={<LockOutlined />} />
                      </Form.Item>
                      <Form.Item
                        name="newPassword"
                        label="New Password"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                        hasFeedback
                      >
                        <Input.Password prefix={<LockOutlined />} />
                      </Form.Item>
                      <Form.Item
                        name="confirmNewPassword"
                        label="Confirm New Password"
                        dependencies={['newPassword']}
                        hasFeedback
                        rules={[
                          { required: true, message: 'Please confirm your new password!' },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                          }),
                        ]}
                      >
                        <Input.Password prefix={<LockOutlined />} />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                          Update Password
                        </Button>
                      </Form.Item>
                    </Form>
                  </Card>
                  
                  <Card 
                    title="Login Alerts" 
                    size="small" 
                    bordered={false}
                    style={{ marginBottom: 24, background: '#f9f9f9' }}
                  >
                    <Paragraph>
                      Receive alerts when your account is accessed from a new device or location.
                    </Paragraph>
                    <div>
                      <Switch 
                        checked={loginAlerts} 
                        onChange={setLoginAlerts} 
                      />
                      <Text style={{ marginLeft: 8 }}>
                        {loginAlerts ? 'Enabled' : 'Disabled'}
                      </Text>
                    </div>
                  </Card>
                </div>
              ),
            },
            {
              key: '3',
              label: (
                <span>
                  <BellOutlined /> Notifications
                </span>
              ),
              children: (
                <div style={{ padding: '16px 0' }}>
                  <Title level={4}>Notification Settings</Title>
                  <Paragraph>Manage how you receive notifications and alerts.</Paragraph>
                  
                  <Form
                    form={notificationForm}
                    onFinish={handleNotificationSave}
                  >
                    <Card 
                      size="small" 
                      bordered={false}
                      style={{ marginBottom: 16, background: '#f9f9f9' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>Email Notifications</Text>
                        <Switch 
                          checked={emailNotifications} 
                          onChange={setEmailNotifications} 
                        />
                      </div>
                    </Card>
                    
                    <Card 
                      size="small" 
                      bordered={false}
                      style={{ marginBottom: 16, background: '#f9f9f9' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>Push Notifications</Text>
                        <Switch 
                          checked={pushNotifications} 
                          onChange={setPushNotifications} 
                        />
                      </div>
                    </Card>
                    
                    <Card 
                      size="small" 
                      bordered={false}
                      style={{ marginBottom: 16, background: '#f9f9f9' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text>SMS Notifications</Text>
                        <Switch 
                          checked={smsNotifications} 
                          onChange={setSmsNotifications} 
                        />
                      </div>
                    </Card>
                    
                    <Form.Item>
                      <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                        Save Notification Settings
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              ),
            },
            {
              key: '4',
              label: (
                <span>
                  <EyeOutlined /> Privacy
                </span>
              ),
              children: (
                <div style={{ padding: '16px 0' }}>
                  <Title level={4}>Privacy Settings</Title>
                  <Paragraph>Control what information is visible to others.</Paragraph>
                  
                  <Card 
                    size="small" 
                    bordered={false}
                    style={{ marginBottom: 16, background: '#f9f9f9' }}
                  >
                    <div style={{ marginBottom: 16 }}>
                      <Text strong>Profile Visibility</Text>
                      <div style={{ marginTop: 8 }}>
                        <Radio.Group 
                          value={profileVisibility} 
                          onChange={(e) => setProfileVisibility(e.target.value)}
                        >
                          <Radio value="public">Public</Radio>
                          <Radio value="contacts">Contacts Only</Radio>
                          <Radio value="private">Private</Radio>
                        </Radio.Group>
                      </div>
                    </div>
                  </Card>
                  
                  <Card 
                    size="small" 
                    bordered={false}
                    style={{ marginBottom: 16, background: '#f9f9f9' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>Show Grades to Others</Text>
                      <Switch 
                        checked={showGrades} 
                        onChange={setShowGrades} 
                      />
                    </div>
                  </Card>
                  
                  <Card 
                    size="small" 
                    bordered={false}
                    style={{ marginBottom: 16, background: '#f9f9f9' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text>Show Attendance to Others</Text>
                      <Switch 
                        checked={showAttendance} 
                        onChange={setShowAttendance} 
                      />
                    </div>
                  </Card>
                  
                  <Form.Item>
                    <Button type="primary" onClick={handlePrivacySave} icon={<SaveOutlined />}>
                      Save Privacy Settings
                    </Button>
                  </Form.Item>
                </div>
              ),
            },
            {
              key: '5',
              label: (
                <span>
                  <DeleteOutlined /> Account
                </span>
              ),
              children: (
                <div style={{ padding: '16px 0' }}>
                  <Title level={4}>Account Management</Title>
                  
                  <Alert
                    message="Warning: Account Deletion"
                    description="Deleting your account is permanent. All your data will be permanently removed and cannot be recovered."
                    type="warning"
                    showIcon
                    style={{ marginBottom: 16 }}
                  />
                  
                  <Popconfirm
                    title="Delete your account"
                    description="Are you sure you want to delete your account? This action cannot be undone."
                    onConfirm={handleDeleteAccount}
                    okText="Yes, delete my account"
                    cancelText="No, keep my account"
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  >
                    <Button danger icon={<DeleteOutlined />}>
                      Delete My Account
                    </Button>
                  </Popconfirm>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default SettingsPage;