import React from 'react';
import { Form, Input, Select, DatePicker, Button, Switch, Typography, Card, Divider, Space, message } from 'antd';
import { DisciplineActionFormData, ActionType, DisciplineIncident } from '../types';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface DisciplineActionFormProps {
  incident: DisciplineIncident;
  onSubmit: (formData: DisciplineActionFormData) => void;
  loading?: boolean;
}

const DisciplineActionForm: React.FC<DisciplineActionFormProps> = ({ 
  incident, 
  onSubmit, 
  loading = false 
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    const formData: DisciplineActionFormData = {
      ...values,
      startDate: values.dateRange ? values.dateRange[0].format('YYYY-MM-DD') : '',
      endDate: values.dateRange && values.dateRange[1] ? values.dateRange[1].format('YYYY-MM-DD') : undefined
    };
    
    // Remove the dateRange field as we've extracted what we need
    delete formData.dateRange;
    
    onSubmit(formData);
    message.success('Discipline action recorded successfully');
    form.resetFields();
  };

  // Determine if the action type requires a date range
  const handleActionTypeChange = (value: ActionType) => {
    const needsDateRange = [
      ActionType.DETENTION,
      ActionType.SUSPENSION,
      ActionType.COUNSELING
    ].includes(value);
    
    form.setFieldsValue({
      needsDateRange
    });
  };

  return (
    <Card>
      <Title level={4}>Record Discipline Action</Title>
      <Text type="secondary">
        Record an action taken in response to the reported incident.
      </Text>
      
      <Divider />
      
      <Space direction="vertical" style={{ width: '100%', marginBottom: 16 }}>
        <Card size="small" type="inner" title="Incident Details">
          <p><strong>Student:</strong> {incident.student?.name}</p>
          <p><strong>Incident:</strong> {incident.title}</p>
          <p><strong>Date:</strong> {dayjs(incident.date).format('MMMM D, YYYY h:mm A')}</p>
          <p><strong>Severity:</strong> {incident.severity.toUpperCase()}</p>
        </Card>
      </Space>
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          actionType: ActionType.WARNING,
          parentNotified: false,
          needsDateRange: false
        }}
      >
        <Form.Item
          name="actionType"
          label="Action Type"
          rules={[{ required: true, message: 'Please select an action type' }]}
        >
          <Select onChange={handleActionTypeChange}>
            <Option value={ActionType.WARNING}>Warning</Option>
            <Option value={ActionType.DETENTION}>Detention</Option>
            <Option value={ActionType.PARENT_MEETING}>Parent Meeting</Option>
            <Option value={ActionType.SUSPENSION}>Suspension</Option>
            <Option value={ActionType.EXPULSION}>Expulsion</Option>
            <Option value={ActionType.COUNSELING}>Counseling</Option>
            <Option value={ActionType.OTHER}>Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Action Description"
          rules={[{ required: true, message: 'Please provide a description of the action' }]}
        >
          <TextArea 
            rows={3} 
            placeholder="Describe the disciplinary action being taken" 
          />
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => 
            prevValues.actionType !== currentValues.actionType
          }
        >
          {({ getFieldValue }) => {
            const actionType = getFieldValue('actionType');
            const needsDateRange = [
              ActionType.DETENTION,
              ActionType.SUSPENSION,
              ActionType.COUNSELING
            ].includes(actionType);
            
            return needsDateRange ? (
              <Form.Item
                name="dateRange"
                label={actionType === ActionType.DETENTION ? "Detention Period" : 
                      actionType === ActionType.SUSPENSION ? "Suspension Period" : 
                      "Counseling Period"}
                rules={[{ required: true, message: 'Please select the date range' }]}
              >
                <RangePicker style={{ width: '100%' }} />
              </Form.Item>
            ) : (
              <Form.Item
                name="dateRange"
                label="Action Date"
                rules={[{ required: true, message: 'Please select the date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            );
          }}
        </Form.Item>

        <Form.Item
          name="notes"
          label="Additional Notes"
        >
          <TextArea 
            rows={3} 
            placeholder="Any additional notes or instructions" 
          />
        </Form.Item>

        <Form.Item
          name="parentNotified"
          label="Parent Notification"
          valuePropName="checked"
        >
          <Switch checkedChildren="Notified" unCheckedChildren="Not Notified" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Record Action
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default DisciplineActionForm;
