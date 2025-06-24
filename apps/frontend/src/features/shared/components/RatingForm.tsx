// apps/frontend/src/features/shared/components/RatingForm.tsx
import React, { useState } from 'react';
import { Form, Rate, Input, Button, Select, Space, Typography, Alert } from 'antd';
import { SmileOutlined, UserOutlined, BookOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Option } = Select;

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  imageUrl?: string;
}

export interface RatingFormValues {
  teacherId: string;
  rating: number;
  feedback: string;
  category: string;
}

interface RatingFormProps {
  teachers: Teacher[];
  onSubmit: (values: RatingFormValues) => void;
  loading?: boolean;
  selectedTeacherId?: string;
  title?: string;
}

const ratingCategories = [
  { value: 'teaching_quality', label: 'Teaching Quality' },
  { value: 'communication', label: 'Communication' },
  { value: 'responsiveness', label: 'Responsiveness' },
  { value: 'knowledge', label: 'Subject Knowledge' },
  { value: 'engagement', label: 'Student Engagement' },
];

const RatingForm: React.FC<RatingFormProps> = ({
  teachers,
  onSubmit,
  loading = false,
  selectedTeacherId,
  title = 'Rate Your Teacher'
}) => {
  const [form] = Form.useForm();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | undefined>(
    selectedTeacherId ? teachers.find(t => t.id === selectedTeacherId) : undefined
  );

  const handleTeacherChange = (teacherId: string) => {
    const teacher = teachers.find(t => t.id === teacherId);
    setSelectedTeacher(teacher);
    // Reset rating and feedback when teacher changes
    form.setFieldsValue({ rating: 0, feedback: '', category: undefined });
  };

  const handleSubmit = (values: RatingFormValues) => {
    onSubmit(values);
    form.resetFields();
    setSelectedTeacher(undefined);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <Title level={3}>{title}</Title>
      
      {teachers.length === 0 ? (
        <Alert
          message="No teachers available"
          description="There are no teachers available to rate at this time."
          type="info"
          showIcon
        />
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ 
            teacherId: selectedTeacherId,
            rating: 0
          }}
        >
          <Form.Item
            name="teacherId"
            label="Select Teacher"
            rules={[{ required: true, message: 'Please select a teacher' }]}
          >
            <Select 
              placeholder="Select a teacher to rate" 
              onChange={handleTeacherChange}
              disabled={!!selectedTeacherId}
              style={{ width: '100%' }}
            >
              {teachers.map(teacher => (
                <Option key={teacher.id} value={teacher.id}>
                  <Space>
                    <UserOutlined />
                    <span>{teacher.name}</span>
                    <Text type="secondary">({teacher.subject})</Text>
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>

          {selectedTeacher && (
            <>
              <Form.Item
                name="category"
                label="Rating Category"
                rules={[{ required: true, message: 'Please select a rating category' }]}
              >
                <Select placeholder="Select what aspect you're rating">
                  {ratingCategories.map(category => (
                    <Option key={category.value} value={category.value}>
                      {category.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="rating"
                label="Your Rating"
                rules={[{ required: true, message: 'Please provide a rating' }]}
              >
                <Rate 
                  character={<SmileOutlined />} 
                  allowHalf 
                  style={{ fontSize: '28px' }} 
                />
              </Form.Item>

              <Form.Item
                name="feedback"
                label="Feedback (Optional)"
                rules={[{ max: 500, message: 'Feedback cannot exceed 500 characters' }]}
              >
                <TextArea 
                  placeholder="Share your thoughts about the teacher's performance..." 
                  rows={4} 
                  showCount 
                  maxLength={500} 
                />
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  icon={<BookOutlined />}
                  size="large"
                  block
                >
                  Submit Rating
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      )}
    </div>
  );
};

export default RatingForm;
