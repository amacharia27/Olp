import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Upload, Space, Typography, Card, Divider, message } from 'antd';
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { DisciplineReportFormData, IncidentSeverity } from '../types';
import { mockStudents } from '../mockData';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface DisciplineReportFormProps {
  onSubmit: (formData: DisciplineReportFormData) => void;
  loading?: boolean;
}

const DisciplineReportForm: React.FC<DisciplineReportFormProps> = ({ onSubmit, loading = false }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  const handleSubmit = (values: any) => {
    const formData: DisciplineReportFormData = {
      ...values,
      date: values.date.format('YYYY-MM-DDTHH:mm:00'),
      attachments: fileList.map(file => file.originFileObj)
    };
    
    onSubmit(formData);
    message.success('Incident report submitted successfully');
    form.resetFields();
    setFileList([]);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const handleFileChange = ({ fileList }: any) => {
    setFileList(fileList);
  };

  return (
    <Card>
      <Title level={4}>Report Discipline Incident</Title>
      <Text type="secondary">
        Use this form to report student discipline incidents. Provide as much detail as possible.
      </Text>
      <Divider />
      
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          date: dayjs(),
          severity: IncidentSeverity.MINOR,
          witnesses: ['']
        }}
      >
        <Form.Item
          name="title"
          label="Incident Title"
          rules={[{ required: true, message: 'Please enter a title for the incident' }]}
        >
          <Input placeholder="Brief title describing the incident" />
        </Form.Item>

        <Form.Item
          name="studentId"
          label="Student Involved"
          rules={[{ required: true, message: 'Please select a student' }]}
        >
          <Select
            placeholder="Select student"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            }
          >
            {mockStudents.map(student => (
              <Option key={student.id} value={student.id}>
                {student.name} ({student.admissionNumber}) - {student.grade}, {student.class}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Space style={{ width: '100%' }} direction="horizontal">
          <Form.Item
            name="date"
            label="Incident Date & Time"
            rules={[{ required: true, message: 'Please select the date and time' }]}
            style={{ width: '50%' }}
          >
            <DatePicker 
              showTime={{ format: 'HH:mm' }} 
              format="YYYY-MM-DD HH:mm" 
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter the location' }]}
            style={{ width: '50%' }}
          >
            <Input placeholder="Where the incident occurred" />
          </Form.Item>
        </Space>

        <Form.Item
          name="severity"
          label="Severity Level"
          rules={[{ required: true, message: 'Please select the severity level' }]}
        >
          <Select>
            <Option value={IncidentSeverity.MINOR}>Minor - Low level disruption</Option>
            <Option value={IncidentSeverity.MODERATE}>Moderate - Repeated disruption</Option>
            <Option value={IncidentSeverity.MAJOR}>Major - Serious misconduct</Option>
            <Option value={IncidentSeverity.SEVERE}>Severe - Dangerous behavior</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Incident Description"
          rules={[{ required: true, message: 'Please provide a detailed description' }]}
        >
          <TextArea 
            rows={4} 
            placeholder="Provide a detailed description of what happened, including any relevant context" 
          />
        </Form.Item>

        <Form.List name="witnesses">
          {(fields, { add, remove }) => (
            <>
              <Form.Item label="Witnesses (if any)">
                <Button 
                  type="dashed" 
                  onClick={() => add('')} 
                  icon={<PlusOutlined />}
                  style={{ marginBottom: '10px' }}
                >
                  Add Witness
                </Button>
              </Form.Item>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <Form.Item
                    {...restField}
                    name={name}
                    rules={[{ required: true, message: 'Please enter witness name or ID' }]}
                  >
                    <Input placeholder="Witness name or ID" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
            </>
          )}
        </Form.List>

        <Form.Item
          name="attachments"
          label="Attachments (if any)"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload 
            beforeUpload={() => false} 
            fileList={fileList}
            onChange={handleFileChange}
            multiple
          >
            <Button icon={<UploadOutlined />}>Upload Evidence</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit Report
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default DisciplineReportForm;