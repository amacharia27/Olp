// apps/frontend/src/features/teacher/pages/GradingAndAssessmentPage.tsx
import { useState } from 'react';
import {
  Table, Typography, Button, Space, Select, Card, Tabs,
  Form, Input, Row, Col, message, Tag, Cascader
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
// Removed unused PlusOutlined import
import { mathematicsCurriculum, performanceLevels } from '@/features/teacher/data/curriculum.data';

interface Student {
  key: string;
  studentId: string;
  name: string;
}

interface StudentsByClass {
  [key: string]: Student[];
}

const { Title, Text } = Typography;

// --- MOCK DATA ---
const teacherClasses = [
  { value: 'class_6A', label: 'Grade 6 - Eagles' },
  { value: 'class_6B', label: 'Grade 6 - Falcons' },
];

const studentsData: StudentsByClass = {
  class_6A: [ 
    { key: '1', studentId: 'ST-00123', name: 'Asha Kimani' }, 
    { key: '2', studentId: 'ST-00124', name: 'Brian Omondi' }
  ],
  class_6B: [ 
    { key: '3', studentId: 'ST-00130', name: 'Grace Wanjiru' }, 
    { key: '4', studentId: 'ST-00131', name: 'Samuel Leteipa' }
  ],
};



const assessments = [
  { key: '1', title: 'Term 1 CAT 1', class: 'Grade 6 - Eagles', subject: 'Mathematics', date: '2023-02-15', totalMarks: 30 },
  // ... other summative assessments
];

const studentFormativeHistory = [
    { key: 'fa1', date: '2023-10-20', rubric: 'Solves 2-digit addition problems', level: 'Meets Expectation', comment: 'Good understanding.' },
    { key: 'fa2', date: '2023-10-18', rubric: 'Identifies 2D shapes (circle, square, triangle)', level: 'Exceeds Expectation', comment: 'Very confident.' },
];

const DeputyGradingAndAssessmentPage = () => {
  const [createForm] = Form.useForm<{ title: string; classId: string }>();
  const [formativeForm] = Form.useForm();
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  // Convert curriculum data into a format for the Cascader component
  const cascaderOptions = mathematicsCurriculum.strands.map(strand => ({
    value: strand.id,
    label: strand.name,
    children: strand.subStrands.map(subStrand => ({
      value: subStrand.id,
      label: subStrand.name,
      children: subStrand.rubrics.map(rubric => ({
        value: rubric.id,
        label: rubric.name,
      })),
    })),
  }));

  const handleFormativeSubmit = (values: any) => {
    console.log("Formative Assessment Submitted:", {
        studentId: selectedStudent,
        rubricId: values.rubric[2], // The last item is the rubric ID
        level: values.level,
        comment: values.comment
    });
    message.success("Formative assessment recorded successfully!");
    formativeForm.resetFields(['rubric', 'level', 'comment']);
    // TODO: API call to save formative score and refresh history
  };

  // --- Summative Tab Code ---
  const handleCreateAssessment = () => { 
    message.success('Assessment created successfully!'); 
    createForm.resetFields(); 
  };
  
  const assessmentsColumns: ColumnsType<any> = [
    { title: 'Title', dataIndex: 'title' }, 
    { title: 'Class', dataIndex: 'class' }, 
    { 
      title: 'Actions', 
      render: () => (
        <Space>
          <Button size="small">Edit</Button>
          <Button size="small" danger>Delete</Button>
        </Space>
      ) 
    }
  ];
  
  // --- Formative Tab History Table ---
  const formativeHistoryColumns: ColumnsType<any> = [
    { title: 'Date', dataIndex: 'date' },
    { title: 'Indicator/Rubric Assessed', dataIndex: 'rubric' },
    { title: 'Performance Level', dataIndex: 'level', render: (level) => {
        const pLevel = performanceLevels.find(p => p.label === level);
        return <Tag color={pLevel?.color || 'default'}>{level}</Tag>
    }},
    { title: 'Teacher Comment', dataIndex: 'comment'},
  ];


  return (
    <div>
      <Title level={2}>Grading & Assessments</Title>
      <Tabs defaultActiveKey="1">
        {/* TAB 1: SUMMATIVE ASSESSMENTS */}
        <Tabs.TabPane tab="Summative (Exams & CATs)" key="1">
           {/* All the previous summative assessment code remains here */}
           <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}><Card title="Existing Assessments"><Table columns={assessmentsColumns} dataSource={assessments} /></Card></Col>
            <Col xs={24} lg={8}><Card title="Create New Assessment"><Form form={createForm} layout="vertical" onFinish={handleCreateAssessment}><Form.Item name="title" label="Title"><Input /></Form.Item><Form.Item name="classId" label="Class"><Select options={teacherClasses}/></Form.Item><Form.Item><Button type="primary" htmlType="submit">Create</Button></Form.Item></Form></Card></Col>
           </Row>
        </Tabs.TabPane>
        
        {/* TAB 2: FORMATIVE ASSESSMENT (NEW) */}
        <Tabs.TabPane tab="Formative Assessment (Rubrics)" key="2">
            <Card>
                <Row gutter={[16, 24]}>
                    <Col span={24}>
                        <Text>Select a student to record or view their formative assessment history.</Text>
                        <br/>
                        <Select 
                            showSearch
                            style={{ width: 300, marginTop: 8 }} 
                            placeholder="Select a student from any class"
                            onChange={(value) => setSelectedStudent(value)}
                            options={Object.values(studentsData).flat().map(s => ({ value: s.studentId, label: `${s.name} (${s.studentId})` }))}
                        />
                    </Col>
                    
                    {selectedStudent && (
                        <>
                            <Col xs={24} md={12}>
                                <Title level={4}>Record New Assessment</Title>
                                <Form form={formativeForm} layout="vertical" onFinish={handleFormativeSubmit}>
                                    <Form.Item name="rubric" label="Select Curriculum Indicator" rules={[{ required: true }]}>
                                        <Cascader options={cascaderOptions} placeholder="Select Strand / Sub-Strand / Rubric" />
                                    </Form.Item>
                                    <Form.Item name="level" label="Performance Level" rules={[{ required: true }]}>
                                        <Select placeholder="Select level achieved">
                                            {performanceLevels.map(p => <Select.Option key={p.value} value={p.label}>{p.label}</Select.Option>)}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="comment" label="Teacher Comment (Optional)">
                                        <Input.TextArea rows={3} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">Record Assessment</Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                            <Col xs={24} md={12}>
                                <Title level={4}>
                                  {`Assessment History for ${
                                    Object.values(studentsData)
                                      .flat()
                                      .find((s: Student) => s.studentId === selectedStudent)?.name || 'Student'
                                  }`}
                                </Title>
                                <Table columns={formativeHistoryColumns} dataSource={studentFormativeHistory} pagination={{pageSize: 5}}/>
                            </Col>
                        </>
                    )}
                </Row>
            </Card>
        </Tabs.TabPane>
        
        {/* Keep the Enter Grades Tab */}
        <Tabs.TabPane tab="Enter Grades" key="3">{/*...*/}</Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default DeputyGradingAndAssessmentPage;