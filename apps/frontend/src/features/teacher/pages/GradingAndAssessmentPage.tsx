// apps/frontend/src/features/teacher/pages/GradingAndAssessmentPage.tsx
import { useState } from 'react';
import {
  Table, Typography, Button, Space, Select, Card, Tabs,
  Form, Input, Row, Col, message, Tag, Cascader
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
// Removed unused PlusOutlined import
import { mathematicsCurriculum, performanceLevels } from '../data/curriculum.data';

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
  { key: '1', title: 'Term 1 CAT 1', class: 'Grade 6 - Eagles', subject: 'Mathematics', date: '2023-02-15', totalMarks: 30, type: 'CAT' },
  { key: '2', title: 'Term 1 Exam', class: 'Grade 6 - Eagles', subject: 'English', date: '2023-03-20', totalMarks: 100, type: 'Exam' },
  { key: '3', title: 'Homework 2', class: 'Grade 6 - Falcons', subject: 'Science', date: '2023-02-22', totalMarks: 20, type: 'Homework' },
  { key: '4', title: 'Group Assignment 1', class: 'Grade 6 - Eagles', subject: 'Social Studies', date: '2023-02-28', totalMarks: 50, type: 'Assignment' },
];

const studentMarks = [
  { key: '1', assessmentId: '1', studentId: 'ST-00123', studentName: 'Asha Kimani', marks: 25, grade: 'A', comment: 'Excellent work!' },
  { key: '2', assessmentId: '1', studentId: 'ST-00124', studentName: 'Brian Omondi', marks: 22, grade: 'B+', comment: 'Good effort' },
  { key: '3', assessmentId: '2', studentId: 'ST-00123', studentName: 'Asha Kimani', marks: 85, grade: 'A', comment: 'Outstanding performance' },
  { key: '4', assessmentId: '2', studentId: 'ST-00124', studentName: 'Brian Omondi', marks: 72, grade: 'B', comment: 'Room for improvement' },
];

const studentFormativeHistory = [
    { key: 'fa1', date: '2023-10-20', subject: 'Mathematics', rubric: 'Solves 2-digit addition problems', level: 'Meets Expectation', comment: 'Good understanding.' },
    { key: 'fa2', date: '2023-10-18', subject: 'Mathematics', rubric: 'Identifies 2D shapes (circle, square, triangle)', level: 'Exceeds Expectation', comment: 'Very confident.' },
];

const GradingAndAssessmentPage = () => {
  const [createForm] = Form.useForm<{ title: string; classId: string; subject: string; totalMarks: number }>();
  const [formativeForm] = Form.useForm<{ subject: string; rubric: string[]; level: string; comment?: string }>();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
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
        classId: selectedClass,
        studentId: selectedStudent,
        subject: values.subject,
        rubricId: values.rubric[2], // The last item is the rubric ID
        level: values.level,
        comment: values.comment
    });
    message.success("Formative assessment recorded successfully!");
    formativeForm.resetFields(['subject', 'rubric', 'level', 'comment']);
    // TODO: API call to save formative score and refresh history
  };
  
  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    setSelectedStudent(null); // Reset student selection when class changes
  };

  // --- Summative Tab Code ---
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [marksForm] = Form.useForm();
  
  const handleRecordMarks = (values: any) => {
    console.log('Recording marks:', {
      ...values,
      assessmentId: selectedAssessment
    });
    message.success('Marks recorded successfully!');
    marksForm.resetFields();
    // TODO: API call to save the marks
  };
  
  const handleSelectAssessment = (assessmentId: string) => {
    setSelectedAssessment(assessmentId);
    // In a real app, you would fetch the list of students for this assessment
  };
  
  const assessmentsColumns: ColumnsType<any> = [
    { title: 'Title', dataIndex: 'title' }, 
    { title: 'Class', dataIndex: 'class' },
    { title: 'Subject', dataIndex: 'subject' },
    { title: 'Type', dataIndex: 'type' },
    { title: 'Date', dataIndex: 'date' },
    { title: 'Total Marks', dataIndex: 'totalMarks' },
    { 
      title: 'Actions', 
      render: (_, record) => (
        <Space>
          <Button size="small" type="primary" onClick={() => handleSelectAssessment(record.key)}>Record Marks</Button>
          <Button size="small">View Results</Button>
        </Space>
      ) 
    }
  ];
  
  // --- Formative Tab History Table ---
  const formativeHistoryColumns: ColumnsType<any> = [
    { title: 'Date', dataIndex: 'date' },
    { title: 'Subject', dataIndex: 'subject' },
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
        <Tabs.TabPane tab="Summative Assessment Results" key="1">
           <Row gutter={[16, 16]}>
            <Col xs={24} lg={selectedAssessment ? 12 : 24}>
              <Card title="Available Assessments">
                <Table 
                  columns={assessmentsColumns} 
                  dataSource={assessments} 
                  rowClassName={(record) => record.key === selectedAssessment ? 'ant-table-row-selected' : ''}
                />
              </Card>
            </Col>
            
            {selectedAssessment && (
              <Col xs={24} lg={12}>
                <Card 
                  title={`Record Marks: ${assessments.find(a => a.key === selectedAssessment)?.title || 'Assessment'}`}
                  extra={<Button size="small" onClick={() => setSelectedAssessment(null)}>Cancel</Button>}
                >
                  <Form form={marksForm} layout="vertical" onFinish={handleRecordMarks}>
                    <Form.Item name="studentId" label="Student" rules={[{ required: true }]}>
                      <Select
                        showSearch
                        placeholder="Select student"
                        optionFilterProp="children"
                        options={Object.values(studentsData).flat().map(s => ({ 
                          value: s.studentId, 
                          label: `${s.name} (${s.studentId})` 
                        }))}
                      />
                    </Form.Item>
                    <Form.Item name="marks" label="Marks Obtained" rules={[{ required: true }]}>
                      <Input 
                        type="number" 
                        min={0} 
                        max={assessments.find(a => a.key === selectedAssessment)?.totalMarks || 100}
                        placeholder="e.g., 25" 
                      />
                    </Form.Item>
                    <Form.Item name="grade" label="Grade" rules={[{ required: true }]}>
                      <Select placeholder="Select grade">
                        <Select.Option value="A">A (Excellent: 80-100%)</Select.Option>
                        <Select.Option value="B+">B+ (Very Good: 75-79%)</Select.Option>
                        <Select.Option value="B">B (Good: 70-74%)</Select.Option>
                        <Select.Option value="C+">C+ (Above Average: 65-69%)</Select.Option>
                        <Select.Option value="C">C (Average: 60-64%)</Select.Option>
                        <Select.Option value="D+">D+ (Below Average: 55-59%)</Select.Option>
                        <Select.Option value="D">D (Poor: 50-54%)</Select.Option>
                        <Select.Option value="E">E (Fail: 0-49%)</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="comment" label="Teacher Comment">
                      <Input.TextArea rows={3} placeholder="Optional comments on student performance" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" block>Save Marks</Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            )}
           </Row>
        </Tabs.TabPane>
        
        {/* TAB 2: FORMATIVE ASSESSMENT (NEW) */}
        <Tabs.TabPane tab="Formative Assessment (Rubrics)" key="2">
            <Card>
                <Row gutter={[16, 24]}>
                    <Col span={24}>
                        <Text>First select a class, then select a student to record or view their formative assessment history.</Text>
                        <br/>
                        <Space style={{ marginTop: 8 }} direction="horizontal" size="large">
                            <Select 
                                style={{ width: 200 }} 
                                placeholder="Select a class"
                                onChange={handleClassChange}
                                value={selectedClass}
                                options={teacherClasses}
                            />
                            
                            {selectedClass && (
                                <Select 
                                    showSearch
                                    style={{ width: 250 }} 
                                    placeholder="Select a student"
                                    onChange={(value) => setSelectedStudent(value)}
                                    value={selectedStudent}
                                    options={studentsData[selectedClass]?.map(s => ({ 
                                        value: s.studentId, 
                                        label: `${s.name} (${s.studentId})` 
                                    })) || []}
                                />
                            )}
                        </Space>
                    </Col>
                    
                    {selectedClass && selectedStudent && (
                        <>
                            <Col xs={24} md={12}>
                                <Title level={4}>Record New Assessment</Title>
                                <Form form={formativeForm} layout="vertical" onFinish={handleFormativeSubmit}>
                                    <Form.Item name="subject" label="Learning Area/Subject" rules={[{ required: true, message: 'Please select a subject' }]}>
                                        <Select options={subjects} placeholder="Select subject" />
                                    </Form.Item>
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

export default GradingAndAssessmentPage;