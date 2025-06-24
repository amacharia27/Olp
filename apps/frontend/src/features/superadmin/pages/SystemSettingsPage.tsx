// apps/frontend/src/features/superadmin/pages/SystemSettingsPage.tsx
import { Card, Typography, Form, Input, Button, message, InputNumber, Switch } from 'antd';

const { Title, Paragraph } = Typography;

const SystemSettingsPage = () => {

  const onFinish = (values: any) => {
    console.log("Saving system settings:", values);
    message.success("System settings updated successfully!");
  };

  const initialValues = {
    appName: "OLP Monitor",
    defaultCurrency: "KES",
    costPerStudent: 50,
    billingPeriodMonths: 4,
    newRegistrations: true,
  };

  return (
    <div>
      <Title level={2}>System Settings</Title>
      <Paragraph type="secondary">Manage platform-wide configurations. Changes here will affect all tenants.</Paragraph>

      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
        style={{ maxWidth: 600 }}
      >
        <Card title="General Settings">
          <Form.Item name="appName" label="Application Name">
            <Input />
          </Form.Item>
          <Form.Item name="newRegistrations" label="Allow New School Registrations" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Card>

        <Card title="Subscription & Billing Settings" style={{marginTop: 24}}>
            <Form.Item name="costPerStudent" label="Cost Per Student (KES)">
              <InputNumber style={{width: '100%'}}/>
            </Form.Item>
             <Form.Item name="billingPeriodMonths" label="Billing Period (Months)">
              <InputNumber style={{width: '100%'}} />
            </Form.Item>
        </Card>
        
        <Form.Item style={{marginTop: 24}}>
          <Button type="primary" htmlType="submit">
            Save All Settings
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SystemSettingsPage;