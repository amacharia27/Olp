import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Typography, 
  Button, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  TimePicker, 
  Row, 
  Col, 
  Table, 
  Tag, 
  Popconfirm, 
  Tabs, 
  Divider,
  Space,
  message
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SaveOutlined, 
  CalendarOutlined, 
  BookOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { TabPane } = Tabs;

// Mock data for subjects
const subjects = [
  { value: 'math', label: 'Mathematics' },
  { value: 'science', label: 'Science' },
  { value: 'english', label: 'English' },
  { value: 'social_studies', label: 'Social Studies' },
  { value: 'kiswahili', label: 'Kiswahili' },
];

// Mock data for classes
const classes = [
  { value: 'grade1', label: 'Grade 1' },
  { value: 'grade2', label: 'Grade 2' },
  { value: 'grade3', label: 'Grade 3' },
  { value: 'grade4', label: 'Grade 4' },
  { value: 'grade5', label: 'Grade 5' },
  { value: 'grade6', label: 'Grade 6' },
];

// Mock data for lesson plans
const initialLessonPlans = [
  {
    id: '1',
    title: 'Introduction to Fractions',
    subject: 'math',
    class: 'grade4',
    date: '2025-06-25',
    startTime: '09:00',
    endTime: '10:00',
    objectives: 'Students will be able to identify and represent fractions',
    materials: 'Fraction charts, worksheets, manipulatives',
    activities: '1. Introduction (10 min)\n2. Demonstration (15 min)\n3. Group activity (20 min)\n4. Assessment (15 min)',
    assessment: 'Exit ticket: Draw and label 3 different fractions',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Plant Life Cycles',
    subject: 'science',
    class: 'grade3',
    date: '2025-06-24',
    startTime: '11:00',
    endTime: '12:00',
    objectives: 'Students will understand the stages of plant growth',
    materials: 'Seeds, soil, cups, water, plant life cycle diagrams',
    activities: '1. Review prior knowledge (5 min)\n2. Introduce plant life cycle (15 min)\n3. Planting activity (25 min)\n4. Reflection (15 min)',
    assessment: 'Students will draw and label the stages of plant growth',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Reading Comprehension: Main Idea',
    subject: 'english',
    class: 'grade5',
    date: '2025-06-20',
    startTime: '13:00',
    endTime: '14:00',
    objectives: 'Students will identify the main idea and supporting details in a text',
    materials: 'Reading passages, worksheets, highlighters',
    activities: '1. Mini-lesson on main idea (10 min)\n2. Guided practice (15 min)\n3. Independent practice (20 min)\n4. Share out (15 min)',
    assessment: 'Students will complete a main idea worksheet with 80% accuracy',
    status: 'completed',
  },
];

const LessonPlannerPage: React.FC = () => {
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [lessonPlans, setLessonPlans] = useState(initialLessonPlans);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Filter lesson plans based on active tab
  const filteredLessonPlans = lessonPlans.filter(plan => plan.status === activeTab);

  const handleAddLessonPlan = (values: any) => {
    const newLessonPlan = {
      id: Date.now().toString(),
      ...values,
      date: values.date.format('YYYY-MM-DD'),
      startTime: values.timeRange[0].format('HH:mm'),
      endTime: values.timeRange[1].format('HH:mm'),
      status: 'upcoming',
    };
    
    setLessonPlans([...lessonPlans, newLessonPlan]);
    form.resetFields();
    message.success('Lesson plan created successfully!');
  };

  const handleEditLessonPlan = (record: any) => {
    setEditingId(record.id);
    editForm.setFieldsValue({
      ...record,
      date: dayjs(record.date),
      timeRange: [dayjs(record.startTime, 'HH:mm'), dayjs(record.endTime, 'HH:mm')],
    });
  };

  const handleSaveEdit = (values: any) => {
    const updatedLessonPlans = lessonPlans.map(plan => {
      if (plan.id === editingId) {
        return {
          ...plan,
          ...values,
          date: values.date.format('YYYY-MM-DD'),
          startTime: values.timeRange[0].format('HH:mm'),
          endTime: values.timeRange[1].format('HH:mm'),
        };
      }
      return plan;
    });
    
    setLessonPlans(updatedLessonPlans);
    setEditingId(null);
    message.success('Lesson plan updated successfully!');
  };

  const handleDeleteLessonPlan = (id: string) => {
    setLessonPlans(lessonPlans.filter(plan => plan.id !== id));
    message.success('Lesson plan deleted successfully!');
  };

  const handleMarkAsCompleted = (id: string) => {
    const updatedLessonPlans = lessonPlans.map(plan => {
      if (plan.id === id) {
        return { ...plan, status: 'completed' };
      }
      return plan;
    });
    
    setLessonPlans(updatedLessonPlans);
    message.success('Lesson plan marked as completed!');
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <span>
          <BookOutlined style={{ marginRight: 8 }} />
          {text}
        </span>
      ),
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (subject: string) => {
        const subjectObj = subjects.find(s => s.value === subject);
        return subjectObj ? subjectObj.label : subject;
      },
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
      render: (classValue: string) => {
        const classObj = classes.find(c => c.value === classValue);
        return classObj ? classObj.label : classValue;
      },
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      key: 'time',
      render: (record: any) => `${record.startTime} - ${record.endTime}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Button 
            icon={<EditOutlined />} 
            onClick={() => handleEditLessonPlan(record)}
            type="text"
          />
          <Popconfirm
            title="Are you sure you want to delete this lesson plan?"
            onConfirm={() => handleDeleteLessonPlan(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger type="text" />
          </Popconfirm>
          {activeTab === 'upcoming' && (
            <Button 
              icon={<SaveOutlined />} 
              onClick={() => handleMarkAsCompleted(record.id)}
              type="text"
              title="Mark as completed"
            />
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="lesson-planner-page">
      <Title level={2}>Lesson Planner</Title>
      <Text type="secondary">Create, manage, and track your lesson plans</Text>
      
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={8}>
          <Card title="Create New Lesson Plan" bordered={false}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleAddLessonPlan}
            >
              <Form.Item
                name="title"
                label="Lesson Title"
                rules={[{ required: true, message: 'Please enter a title' }]}
              >
                <Input placeholder="e.g., Introduction to Fractions" />
              </Form.Item>
              
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="subject"
                    label="Subject"
                    rules={[{ required: true, message: 'Please select a subject' }]}
                  >
                    <Select options={subjects} placeholder="Select subject" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="class"
                    label="Class"
                    rules={[{ required: true, message: 'Please select a class' }]}
                  >
                    <Select options={classes} placeholder="Select class" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="date"
                label="Date"
                rules={[{ required: true, message: 'Please select a date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              
              <Form.Item
                name="timeRange"
                label="Time Range"
                rules={[{ required: true, message: 'Please select a time range' }]}
              >
                <TimePicker.RangePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
              
              <Form.Item
                name="objectives"
                label="Learning Objectives"
                rules={[{ required: true, message: 'Please enter learning objectives' }]}
              >
                <TextArea rows={3} placeholder="What students will learn..." />
              </Form.Item>
              
              <Form.Item
                name="materials"
                label="Materials Needed"
              >
                <TextArea rows={2} placeholder="List materials needed for the lesson" />
              </Form.Item>
              
              <Form.Item
                name="activities"
                label="Lesson Activities"
                rules={[{ required: true, message: 'Please outline lesson activities' }]}
              >
                <TextArea rows={4} placeholder="Outline the lesson activities and timing" />
              </Form.Item>
              
              <Form.Item
                name="assessment"
                label="Assessment"
              >
                <TextArea rows={2} placeholder="How will you assess student learning?" />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                  Create Lesson Plan
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        
        <Col xs={24} lg={16}>
          <Card bordered={false}>
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              items={[
                {
                  key: 'upcoming',
                  label: (
                    <span>
                      <CalendarOutlined />
                      Upcoming Lessons
                    </span>
                  ),
                  children: (
                    <Table 
                      dataSource={filteredLessonPlans} 
                      columns={columns} 
                      rowKey="id"
                      pagination={{ pageSize: 5 }}
                    />
                  ),
                },
                {
                  key: 'completed',
                  label: (
                    <span>
                      <FileTextOutlined />
                      Completed Lessons
                    </span>
                  ),
                  children: (
                    <Table 
                      dataSource={filteredLessonPlans} 
                      columns={columns} 
                      rowKey="id"
                      pagination={{ pageSize: 5 }}
                    />
                  ),
                }
              ]}
            />
          </Card>
          
          {editingId && (
            <Card title="Edit Lesson Plan" style={{ marginTop: 24 }} bordered={false}>
              <Form
                form={editForm}
                layout="vertical"
                onFinish={handleSaveEdit}
              >
                <Form.Item
                  name="title"
                  label="Lesson Title"
                  rules={[{ required: true, message: 'Please enter a title' }]}
                >
                  <Input />
                </Form.Item>
                
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="subject"
                      label="Subject"
                      rules={[{ required: true, message: 'Please select a subject' }]}
                    >
                      <Select options={subjects} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="class"
                      label="Class"
                      rules={[{ required: true, message: 'Please select a class' }]}
                    >
                      <Select options={classes} />
                    </Form.Item>
                  </Col>
                </Row>
                
                <Form.Item
                  name="date"
                  label="Date"
                  rules={[{ required: true, message: 'Please select a date' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                
                <Form.Item
                  name="timeRange"
                  label="Time Range"
                  rules={[{ required: true, message: 'Please select a time range' }]}
                >
                  <TimePicker.RangePicker format="HH:mm" style={{ width: '100%' }} />
                </Form.Item>
                
                <Form.Item
                  name="objectives"
                  label="Learning Objectives"
                  rules={[{ required: true, message: 'Please enter learning objectives' }]}
                >
                  <TextArea rows={3} />
                </Form.Item>
                
                <Form.Item
                  name="materials"
                  label="Materials Needed"
                >
                  <TextArea rows={2} />
                </Form.Item>
                
                <Form.Item
                  name="activities"
                  label="Lesson Activities"
                  rules={[{ required: true, message: 'Please outline lesson activities' }]}
                >
                  <TextArea rows={4} />
                </Form.Item>
                
                <Form.Item
                  name="assessment"
                  label="Assessment"
                >
                  <TextArea rows={2} />
                </Form.Item>
                
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" block>
                        Save Changes
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item>
                      <Button onClick={() => setEditingId(null)} block>
                        Cancel
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default LessonPlannerPage;