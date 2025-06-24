// apps/frontend/src/features/admin/shared/pages/CreateAssessmentPage.tsx
import { useState } from 'react';
import {
  Form, Input, Select, DatePicker, Button, Card, Typography, 
  Row, Col, Table, Space, message, Radio, Upload,
  TimePicker, InputNumber, Switch, Tooltip
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EditOutlined, UploadOutlined, ClockCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

// Assessment types
const assessmentTypes = [
  { value: 'exam', label: 'Exam' },
  { value: 'cat', label: 'CAT (Continuous Assessment Test)' },
  { value: 'assignment', label: 'Assignment' },
  { value: 'homework', label: 'Homework' },
];

// Mock data for classes
const classes = [
  { value: 'class_6A', label: 'Grade 6 - Eagles' },
  { value: 'class_6B', label: 'Grade 6 - Falcons' },
  { value: 'class_7A', label: 'Grade 7 - Hawks' },
  { value: 'class_7B', label: 'Grade 7 - Owls' },
];

// Mock data for subjects
const subjects = [
  { value: 'mathematics', label: 'Mathematics' },
  { value: 'english', label: 'English' },
  { value: 'kiswahili', label: 'Kiswahili' },
  { value: 'science', label: 'Science' },
  { value: 'social_studies', label: 'Social Studies' },
  { value: 'creative_arts', label: 'Creative Arts' },
  { value: 'physical_education', label: 'Physical Education' },
  { value: 'religious_education', label: 'Religious Education' },
];

// Mock data for terms
const terms = [
  { value: 'term1_2023', label: 'Term 1 - 2023' },
  { value: 'term2_2023', label: 'Term 2 - 2023' },
  { value: 'term3_2023', label: 'Term 3 - 2023' },
];

interface Assessment {
  id: string;
  title: string;
  type: string;
  subject: string;
  class: string;
  term: string;
  date: string;
  startTime?: string;
  endTime?: string;
  duration?: number;
  hasTimer: boolean;
  totalMarks: number;
  status: 'draft' | 'published';
  attachments?: UploadFile[];
  instructions?: string;
}

const CreateAssessmentPage = () => {
  const [form] = Form.useForm();
  const [editingAssessment, setEditingAssessment] = useState<Assessment | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([
    {
      id: '1',
      title: 'End of Term 1 Exam',
      type: 'exam',
      subject: 'mathematics',
      class: 'class_6A',
      term: 'term1_2023',
      date: '2023-04-15',
      startTime: '09:00',
      endTime: '11:00',
      duration: 120,
      hasTimer: true,
      totalMarks: 100,
      status: 'published',
      instructions: 'Complete all sections. Show your work for mathematical problems.',
      attachments: []
    },
    {
      id: '2',
      title: 'Week 5 Homework',
      type: 'homework',
      subject: 'english',
      class: 'class_7B',
      term: 'term1_2023',
      date: '2023-02-10',
      hasTimer: false,
      totalMarks: 20,
      status: 'published',
      attachments: []
    },
    {
      id: '3',
      title: 'Mid-Term CAT',
      type: 'cat',
      subject: 'science',
      class: 'class_6B',
      term: 'term1_2023',
      date: '2023-03-01',
      startTime: '14:00',
      endTime: '15:00',
      duration: 60,
      hasTimer: true,
      totalMarks: 30,
      status: 'draft',
      attachments: []
    }
  ]);

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleSubmit = (values: any) => {
    const formattedValues = {
      ...values,
      date: values.date.format('YYYY-MM-DD'),
      startTime: values.startTime?.format('HH:mm'),
      endTime: values.endTime?.format('HH:mm'),
      attachments: fileList,
      hasTimer: values.hasTimer || false
    };

    if (editingAssessment) {
      // Update existing assessment
      const updatedAssessments = assessments.map(assessment => 
        assessment.id === editingAssessment.id 
          ? { 
              ...formattedValues, 
              id: editingAssessment.id, 
              status: editingAssessment.status,
              attachments: [...(editingAssessment.attachments || []), ...fileList]
            } 
          : assessment
      );
      setAssessments(updatedAssessments);
      message.success('Assessment updated successfully');
      setEditingAssessment(null);
    } else {
      // Create new assessment
      const newAssessment = {
        ...formattedValues,
        id: Date.now().toString(),
        status: values.publishNow ? ('published' as const) : ('draft' as const),
      };
      setAssessments([...assessments, newAssessment]);
      message.success('Assessment created successfully');
    }
    form.resetFields();
    setFileList([]);
  };

  const handleEdit = (assessment: Assessment) => {
    setEditingAssessment(assessment);
    setFileList(assessment.attachments || []);
    form.setFieldsValue({
      ...assessment,
      date: dayjs(assessment.date),
      startTime: assessment.startTime ? dayjs(assessment.startTime, 'HH:mm') : undefined,
      endTime: assessment.endTime ? dayjs(assessment.endTime, 'HH:mm') : undefined,
    });
  };

  const handleDelete = (id: string) => {
    setAssessments(assessments.filter(assessment => assessment.id !== id));
    message.success('Assessment deleted successfully');
    if (editingAssessment?.id === id) {
      setEditingAssessment(null);
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setEditingAssessment(null);
    form.resetFields();
  };

  const handlePublish = (id: string) => {
    const updatedAssessments = assessments.map(assessment => {
      if (assessment.id === id) {
        return {
          ...assessment,
          status: 'published' as const,
        };
      }
      return assessment;
    });
    setAssessments(updatedAssessments);
    message.success('Assessment published successfully');
  };

  const columns: ColumnsType<Assessment> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const assessmentType = assessmentTypes.find(t => t.value === type);
        return assessmentType?.label || type;
      },
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (subject) => {
        const subjectItem = subjects.find(s => s.value === subject);
        return subjectItem?.label || subject;
      },
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
      render: (cls) => {
        const classItem = classes.find(c => c.value === cls);
        return classItem?.label || cls;
      },
    },
    {
      title: 'Date & Time',
      key: 'datetime',
      render: (_, record) => (
        <>
          <div>{record.date}</div>
          {record.hasTimer && record.startTime && record.endTime && (
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {record.startTime} - {record.endTime}
              {record.duration && <span> ({record.duration} min)</span>}
            </Text>
          )}
        </>
      ),
    },
    {
      title: 'Timer',
      key: 'timer',
      render: (_, record) => (
        record.hasTimer ? <Text type="success"><ClockCircleOutlined /> Enabled</Text> : <Text type="secondary">-</Text>
      ),
    },
    {
      title: 'Attachments',
      key: 'attachments',
      render: (_, record) => (
        record.attachments && record.attachments.length > 0 ? 
        <Text>{record.attachments.length} file(s)</Text> : 
        <Text type="secondary">-</Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        if (status === 'published') {
          return <Text type="success">Published</Text>;
        }
        return <Text type="warning">Draft</Text>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button 
            icon={<EditOutlined />} 
            size="small" 
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button 
            icon={<DeleteOutlined />} 
            size="small" 
            danger 
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
          {record.status === 'draft' && (
            <Button 
              size="small" 
              type="primary" 
              onClick={() => handlePublish(record.id)}
            >
              Publish
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Create Assessment</Title>
      <Text type="secondary">
        Create and manage assessments for your classes. Assessments can be exams, CATs, assignments, or homework.
      </Text>
      
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={10}>
          <Card title={editingAssessment ? "Edit Assessment" : "Create New Assessment"}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
            >
              <Form.Item
                name="title"
                label="Assessment Title"
                rules={[{ required: true, message: 'Please enter assessment title' }]}
              >
                <Input placeholder="e.g., End of Term Exam, Week 3 CAT" />
              </Form.Item>
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="type"
                    label="Assessment Type"
                    rules={[{ required: true, message: 'Please select assessment type' }]}
                  >
                    <Select options={assessmentTypes} placeholder="Select type" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="totalMarks"
                    label="Total Marks"
                    rules={[{ required: true, message: 'Please enter total marks' }]}
                  >
                    <Input type="number" min={1} placeholder="e.g., 100" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="subject"
                label="Subject"
                rules={[{ required: true, message: 'Please select subject' }]}
              >
                <Select options={subjects} placeholder="Select subject" />
              </Form.Item>
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="class"
                    label="Class"
                    rules={[{ required: true, message: 'Please select class' }]}
                  >
                    <Select options={classes} placeholder="Select class" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="term"
                    label="Term"
                    rules={[{ required: true, message: 'Please select term' }]}
                  >
                    <Select options={terms} placeholder="Select term" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="date"
                label="Assessment Date"
                rules={[{ required: true, message: 'Please select date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="hasTimer"
                valuePropName="checked"
                label={
                  <span>
                    Enable Timer
                    <Tooltip title="Set a time limit for this assessment">
                      <InfoCircleOutlined style={{ marginLeft: 8 }} />
                    </Tooltip>
                  </span>
                }
              >
                <Switch />
              </Form.Item>

              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.hasTimer !== currentValues.hasTimer}
              >
                {({ getFieldValue }) => 
                  getFieldValue('hasTimer') ? (
                    <>
                      <Row gutter={16}>
                        <Col span={12}>
                          <Form.Item
                            name="startTime"
                            label="Start Time"
                            rules={[{ required: getFieldValue('hasTimer'), message: 'Please select start time' }]}
                          >
                            <TimePicker format="HH:mm" style={{ width: '100%' }} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            name="endTime"
                            label="End Time"
                            rules={[{ required: getFieldValue('hasTimer'), message: 'Please select end time' }]}
                          >
                            <TimePicker format="HH:mm" style={{ width: '100%' }} />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item
                        name="duration"
                        label="Duration (minutes)"
                        rules={[{ required: getFieldValue('hasTimer'), message: 'Please enter duration' }]}
                      >
                        <InputNumber min={1} style={{ width: '100%' }} />
                      </Form.Item>
                    </>
                  ) : null
                }
              </Form.Item>

              <Form.Item
                name="instructions"
                label="Assessment Instructions"
              >
                <Input.TextArea rows={4} placeholder="Enter instructions for students" />
              </Form.Item>

              <Form.Item
                label="Attach Documents"
                tooltip="Upload question papers, reference materials, or other documents"
              >
                <Upload
                  listType="text"
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList)}
                  beforeUpload={() => false} // Prevent auto upload
                >
                  <Button icon={<UploadOutlined />}>Upload File</Button>
                </Upload>
              </Form.Item>
              
              {!editingAssessment && (
                <Form.Item name="publishNow" label="Publication Status">
                  <Radio.Group>
                    <Radio value={true}>Publish immediately</Radio>
                    <Radio value={false}>Save as draft</Radio>
                  </Radio.Group>
                </Form.Item>
              )}
              
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    {editingAssessment ? 'Update Assessment' : 'Create Assessment'}
                  </Button>
                  {editingAssessment && (
                    <Button onClick={handleCancel}>Cancel</Button>
                  )}
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        
        <Col xs={24} lg={14}>
          <Card title="Assessment List">
            <Table 
              columns={columns} 
              dataSource={assessments} 
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateAssessmentPage;
