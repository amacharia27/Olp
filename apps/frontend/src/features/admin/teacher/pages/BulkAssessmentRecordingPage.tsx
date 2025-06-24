// apps/frontend/src/features/admin/teacher/pages/BulkAssessmentRecordingPage.tsx
import React, { useState, useEffect } from 'react';
import {
  Form, Select, Button, Card, Typography, Steps, 
  Table, Input, Space, message, Row, Col, Divider,
  Tooltip
} from 'antd';
import { 
  BookOutlined, CheckCircleOutlined, 
  LeftOutlined, RightOutlined, SaveOutlined, 
  CopyOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Step } = Steps;
const { Option } = Select;

// Mock data for classes
const classes = [
  { value: 'class_6A', label: 'Grade 6 - Eagles' },
  { value: 'class_6B', label: 'Grade 6 - Falcons' },
  { value: 'class_7A', label: 'Grade 7 - Hawks' },
  { value: 'class_7B', label: 'Grade 7 - Owls' },
];

// Mock data for learning areas
const learningAreas = [
  { value: 'mathematics', label: 'Mathematics' },
  { value: 'english', label: 'English' },
  { value: 'kiswahili', label: 'Kiswahili' },
  { value: 'science', label: 'Science' },
  { value: 'social_studies', label: 'Social Studies' },
  { value: 'creative_arts', label: 'Creative Arts' },
  { value: 'physical_education', label: 'Physical Education' },
  { value: 'religious_education', label: 'Religious Education' },
];

// Mock data for strands by learning area
const strandsByLearningArea = {
  mathematics: [
    { value: 'numbers', label: 'Numbers' },
    { value: 'algebra', label: 'Algebra' },
    { value: 'geometry', label: 'Geometry' },
    { value: 'data_handling', label: 'Data Handling' },
  ],
  english: [
    { value: 'listening_speaking', label: 'Listening and Speaking' },
    { value: 'reading', label: 'Reading' },
    { value: 'writing', label: 'Writing' },
    { value: 'grammar', label: 'Grammar' },
  ],
  // Add more for other learning areas as needed
};

// Mock data for sub-strands by strand
const subStrandsByStrand = {
  numbers: [
    { value: 'whole_numbers', label: 'Whole Numbers' },
    { value: 'fractions', label: 'Fractions' },
    { value: 'decimals', label: 'Decimals' },
    { value: 'percentages', label: 'Percentages' },
  ],
  algebra: [
    { value: 'patterns', label: 'Patterns' },
    { value: 'expressions', label: 'Expressions' },
    { value: 'equations', label: 'Equations' },
  ],
  // Add more for other strands as needed
};

// Mock data for rubrics by sub-strand
const rubricsBySubStrand = {
  // Mathematics - Numbers - Fractions
  fractions: [
    { 
      value: 'fraction_operations', 
      label: 'Fraction Operations',
      criteria: [
        { level: 'exceeding', description: 'Can perform complex operations with fractions including mixed numbers and explain the mathematical reasoning behind each step' },
        { level: 'meeting', description: 'Can accurately add, subtract, multiply and divide fractions with different denominators' },
        { level: 'approaching', description: 'Can perform basic operations with fractions that have the same denominator' },
        { level: 'below', description: 'Has difficulty performing operations with fractions even with support' }
      ]
    },
    { 
      value: 'fraction_comparison', 
      label: 'Fraction Comparison',
      criteria: [
        { level: 'exceeding', description: 'Can compare and order multiple fractions with different denominators and explain the relationship between them' },
        { level: 'meeting', description: 'Can accurately compare fractions with different denominators by finding common denominators' },
        { level: 'approaching', description: 'Can compare fractions with the same denominator' },
        { level: 'below', description: 'Has difficulty comparing fractions even with visual aids' }
      ]
    },
    { 
      value: 'fraction_word_problems', 
      label: 'Fraction Word Problems',
      criteria: [
        { level: 'exceeding', description: 'Can solve multi-step word problems involving fractions and create their own word problems' },
        { level: 'meeting', description: 'Can solve word problems involving operations with fractions' },
        { level: 'approaching', description: 'Can solve simple word problems involving fractions with guidance' },
        { level: 'below', description: 'Has difficulty translating word problems into fraction operations' }
      ]
    },
  ],
  
  // Mathematics - Numbers - Decimals
  decimals: [
    { 
      value: 'decimal_operations', 
      label: 'Decimal Operations',
      criteria: [
        { level: 'exceeding', description: 'Can perform complex operations with decimals including multi-digit multiplication and division' },
        { level: 'meeting', description: 'Can accurately add, subtract, multiply and divide decimals' },
        { level: 'approaching', description: 'Can add and subtract decimals but has difficulty with multiplication and division' },
        { level: 'below', description: 'Has difficulty performing basic operations with decimals' }
      ]
    },
    { 
      value: 'decimal_conversion', 
      label: 'Decimal Conversion',
      criteria: [
        { level: 'exceeding', description: 'Can fluently convert between fractions, decimals, and percentages and explain the relationships' },
        { level: 'meeting', description: 'Can convert between fractions and decimals accurately' },
        { level: 'approaching', description: 'Can convert between simple fractions and decimals with some support' },
        { level: 'below', description: 'Has difficulty understanding the relationship between fractions and decimals' }
      ]
    },
    { 
      value: 'decimal_word_problems', 
      label: 'Decimal Word Problems',
      criteria: [
        { level: 'exceeding', description: 'Can solve complex multi-step word problems involving decimals in real-world contexts' },
        { level: 'meeting', description: 'Can solve word problems involving operations with decimals' },
        { level: 'approaching', description: 'Can solve simple word problems involving decimals with guidance' },
        { level: 'below', description: 'Has difficulty applying decimal operations to solve word problems' }
      ]
    },
  ],
  
  // Mathematics - Numbers - Whole Numbers
  whole_numbers: [
    { 
      value: 'place_value', 
      label: 'Place Value Understanding',
      criteria: [
        { level: 'exceeding', description: 'Can work with place value in numbers beyond millions and explain the patterns in our number system' },
        { level: 'meeting', description: 'Can identify place value in multi-digit numbers and use it for rounding and comparing' },
        { level: 'approaching', description: 'Can identify place value in numbers up to thousands' },
        { level: 'below', description: 'Has difficulty identifying place value beyond hundreds' }
      ]
    },
    { 
      value: 'mental_math', 
      label: 'Mental Math Strategies',
      criteria: [
        { level: 'exceeding', description: 'Can use advanced mental math strategies for all operations and explain their efficiency' },
        { level: 'meeting', description: 'Can use mental math strategies for addition, subtraction, and simple multiplication' },
        { level: 'approaching', description: 'Can use some mental math strategies for addition and subtraction' },
        { level: 'below', description: 'Relies heavily on counting or written algorithms for basic operations' }
      ]
    },
  ],
  
  // Mathematics - Algebra - Patterns
  patterns: [
    { 
      value: 'pattern_recognition', 
      label: 'Pattern Recognition',
      criteria: [
        { level: 'exceeding', description: 'Can identify, extend, and create complex patterns including those with multiple variables' },
        { level: 'meeting', description: 'Can identify and extend number patterns and describe the rule' },
        { level: 'approaching', description: 'Can identify and extend simple patterns with support' },
        { level: 'below', description: 'Has difficulty recognizing patterns even with visual aids' }
      ]
    },
    { 
      value: 'pattern_application', 
      label: 'Pattern Application',
      criteria: [
        { level: 'exceeding', description: 'Can apply pattern recognition to solve complex problems and make predictions' },
        { level: 'meeting', description: 'Can use patterns to solve problems and make predictions' },
        { level: 'approaching', description: 'Can use simple patterns to solve basic problems with guidance' },
        { level: 'below', description: 'Has difficulty applying patterns to problem-solving situations' }
      ]
    },
  ],
  
  // English - Reading
  reading: [
    { 
      value: 'reading_comprehension', 
      label: 'Reading Comprehension',
      criteria: [
        { level: 'exceeding', description: 'Can analyze texts critically, make inferences, and connect themes across different texts' },
        { level: 'meeting', description: 'Can understand main ideas, supporting details, and make basic inferences' },
        { level: 'approaching', description: 'Can identify main ideas but struggles with deeper comprehension' },
        { level: 'below', description: 'Has difficulty understanding main ideas even in simple texts' }
      ]
    },
    { 
      value: 'reading_fluency', 
      label: 'Reading Fluency',
      criteria: [
        { level: 'exceeding', description: 'Reads with excellent expression, appropriate pacing, and can adjust reading style to different texts' },
        { level: 'meeting', description: 'Reads fluently with appropriate rate, accuracy, and expression' },
        { level: 'approaching', description: 'Reads with some fluency but may be slow or lack expression' },
        { level: 'below', description: 'Reading is labored and lacks fluency' }
      ]
    },
  ],
  
  // English - Writing
  writing: [
    { 
      value: 'writing_organization', 
      label: 'Writing Organization',
      criteria: [
        { level: 'exceeding', description: 'Writes well-structured texts with clear organization, smooth transitions, and a strong sense of purpose' },
        { level: 'meeting', description: 'Organizes writing with clear beginning, middle, and end with logical sequence' },
        { level: 'approaching', description: 'Shows basic organization but may lack clear transitions or structure' },
        { level: 'below', description: 'Writing lacks organization and logical sequence' }
      ]
    },
    { 
      value: 'grammar_usage', 
      label: 'Grammar and Usage',
      criteria: [
        { level: 'exceeding', description: 'Demonstrates mastery of grade-level grammar and can use complex sentence structures effectively' },
        { level: 'meeting', description: 'Uses correct grammar, punctuation, and sentence structure most of the time' },
        { level: 'approaching', description: 'Shows basic understanding of grammar but makes frequent errors' },
        { level: 'below', description: 'Makes significant grammar and usage errors that interfere with meaning' }
      ]
    },
  ],
  
  // Science - Data Handling
  data_handling: [
    { 
      value: 'data_collection', 
      label: 'Data Collection and Recording',
      criteria: [
        { level: 'exceeding', description: 'Can design and implement sophisticated data collection methods and record with precision' },
        { level: 'meeting', description: 'Can collect and record data accurately using appropriate methods' },
        { level: 'approaching', description: 'Can collect basic data but may have inconsistencies in recording' },
        { level: 'below', description: 'Has difficulty collecting and recording data even with guidance' }
      ]
    },
    { 
      value: 'data_analysis', 
      label: 'Data Analysis and Interpretation',
      criteria: [
        { level: 'exceeding', description: 'Can analyze complex data sets, identify patterns, and draw insightful conclusions' },
        { level: 'meeting', description: 'Can analyze data, create appropriate graphs, and draw reasonable conclusions' },
        { level: 'approaching', description: 'Can create simple graphs and make basic observations about data' },
        { level: 'below', description: 'Has difficulty interpreting data even when presented in simple formats' }
      ]
    },
  ],
};

// Performance levels
const performanceLevels = [
  { value: 'exceeding', label: 'Exceeding Expectations' },
  { value: 'meeting', label: 'Meeting Expectations' },
  { value: 'approaching', label: 'Approaching Expectations' },
  { value: 'below', label: 'Below Expectations' },
  { value: 'absent', label: 'Absent' },
];

// Mock student data
const mockStudents = [
  { id: 'G6-E-001', name: 'John Doe', registrationNumber: 'G6-E-001' },
  { id: 'G6-E-002', name: 'Jane Smith', registrationNumber: 'G6-E-002' },
  { id: 'G6-E-003', name: 'Michael Johnson', registrationNumber: 'G6-E-003' },
  { id: 'G6-E-004', name: 'Sarah Williams', registrationNumber: 'G6-E-004' },
  { id: 'G6-E-005', name: 'Robert Brown', registrationNumber: 'G6-E-005' },
  { id: 'G6-E-006', name: 'Emily Davis', registrationNumber: 'G6-E-006' },
  { id: 'G6-E-007', name: 'David Miller', registrationNumber: 'G6-E-007' },
  { id: 'G6-E-008', name: 'Lisa Wilson', registrationNumber: 'G6-E-008' },
  { id: 'G6-E-009', name: 'James Taylor', registrationNumber: 'G6-E-009' },
  { id: 'G6-E-010', name: 'Jennifer Anderson', registrationNumber: 'G6-E-010' },
];

interface StudentAssessment {
  studentId: string;
  studentName: string;
  registrationNumber: string;
  performanceLevel?: string;
  comments?: string;
}

interface AssessmentParameters {
  classId?: string;
  learningAreaId?: string;
  strandId?: string;
  subStrandId?: string;
  rubricId?: string;
}

const BulkAssessmentRecordingPage: React.FC = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [assessmentParams, setAssessmentParams] = useState<AssessmentParameters>({});
  const [studentAssessments, setStudentAssessments] = useState<StudentAssessment[]>([]);
  const [selectedClass, setSelectedClass] = useState<string | undefined>();
  const [selectedLearningArea, setSelectedLearningArea] = useState<string | undefined>();
  const [selectedStrand, setSelectedStrand] = useState<string | undefined>();
  const [selectedSubStrand, setSelectedSubStrand] = useState<string | undefined>();
  const [bulkPerformanceLevel, setBulkPerformanceLevel] = useState<string | undefined>();
  
  // Load students when class is selected
  useEffect(() => {
    if (selectedClass) {
      // In a real app, this would fetch students from an API based on the selected class
      const students = mockStudents.map(student => ({
        studentId: student.id,
        studentName: student.name,
        registrationNumber: student.registrationNumber,
        performanceLevel: undefined,
        comments: '',
      }));
      setStudentAssessments(students);
    }
  }, [selectedClass]);

  const handleNextStep = () => {
    form.validateFields().then(values => {
      setAssessmentParams({
        classId: values.classId,
        learningAreaId: values.learningAreaId,
        strandId: values.strandId,
        subStrandId: values.subStrandId,
        rubricId: values.rubricId,
      });
      setCurrentStep(1);
    }).catch(errorInfo => {
      console.log('Validation failed:', errorInfo);
    });
  };

  const handlePrevStep = () => {
    setCurrentStep(0);
  };

  const handleClassChange = (value: string) => {
    setSelectedClass(value);
    // Reset dependent fields
    form.setFieldsValue({
      learningAreaId: undefined,
      strandId: undefined,
      subStrandId: undefined,
      rubricId: undefined,
    });
    setSelectedLearningArea(undefined);
    setSelectedStrand(undefined);
    setSelectedSubStrand(undefined);
  };

  const handleLearningAreaChange = (value: string) => {
    setSelectedLearningArea(value);
    // Reset dependent fields
    form.setFieldsValue({
      strandId: undefined,
      subStrandId: undefined,
      rubricId: undefined,
    });
    setSelectedStrand(undefined);
    setSelectedSubStrand(undefined);
  };

  const handleStrandChange = (value: string) => {
    setSelectedStrand(value);
    // Reset dependent fields
    form.setFieldsValue({
      subStrandId: undefined,
      rubricId: undefined,
    });
    setSelectedSubStrand(undefined);
  };

  const handleSubStrandChange = (value: string) => {
    setSelectedSubStrand(value);
    // Reset dependent fields
    form.setFieldsValue({
      rubricId: undefined,
    });
  };

  const handlePerformanceLevelChange = (studentId: string, value: string) => {
    setStudentAssessments(prev => 
      prev.map(assessment => 
        assessment.studentId === studentId 
          ? { ...assessment, performanceLevel: value } 
          : assessment
      )
    );
  };

  const handleCommentChange = (studentId: string, value: string) => {
    setStudentAssessments(prev => 
      prev.map(assessment => 
        assessment.studentId === studentId 
          ? { ...assessment, comments: value } 
          : assessment
      )
    );
  };

  const applyBulkPerformanceLevel = () => {
    if (bulkPerformanceLevel) {
      setStudentAssessments(prev => 
        prev.map(assessment => ({ 
          ...assessment, 
          performanceLevel: bulkPerformanceLevel,
          // Clear comments if student is marked as absent
          comments: bulkPerformanceLevel === 'absent' ? '' : assessment.comments 
        }))
      );
      message.success('Performance level applied to all students');
    } else {
      message.warning('Please select a performance level first');
    }
  };
  
  const getClassLabel = (classId?: string) => {
    if (!classId) return '';
    const classObj = classes.find(c => c.value === classId);
    return classObj ? classObj.label : '';
  };

  const getRubricLabel = (rubricId?: string) => {
    if (!rubricId || !selectedSubStrand) return '';
    const rubrics = rubricsBySubStrand[selectedSubStrand as keyof typeof rubricsBySubStrand] || [];
    const rubric = rubrics.find(r => r.value === rubricId);
    return rubric ? rubric.label : '';
  };

  const renderStepOne = () => (
    <Card title="Step 1: Select Assessment Parameters">
      <Form
        form={form}
        layout="vertical"
        requiredMark={true}
      >
        <Form.Item
          name="classId"
          label="Class"
          rules={[{ required: true, message: 'Please select a class' }]}
        >
          <Select 
            placeholder="Select class"
            onChange={handleClassChange}
          >
            {classes.map(cls => (
              <Option key={cls.value} value={cls.value}>{cls.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="learningAreaId"
          label="Learning Area"
          rules={[{ required: true, message: 'Please select a learning area' }]}
        >
          <Select 
            placeholder="Select learning area"
            onChange={handleLearningAreaChange}
            disabled={!selectedClass}
          >
            {learningAreas.map(area => (
              <Option key={area.value} value={area.value}>{area.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="strandId"
          label="Strand"
          rules={[{ required: true, message: 'Please select a strand' }]}
        >
          <Select 
            placeholder="Select strand"
            onChange={handleStrandChange}
            disabled={!selectedLearningArea}
          >
            {selectedLearningArea && strandsByLearningArea[selectedLearningArea as keyof typeof strandsByLearningArea]?.map(strand => (
              <Option key={strand.value} value={strand.value}>{strand.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="subStrandId"
          label="Sub-strand"
          rules={[{ required: true, message: 'Please select a sub-strand' }]}
        >
          <Select 
            placeholder="Select sub-strand"
            onChange={handleSubStrandChange}
            disabled={!selectedStrand}
          >
            {selectedStrand && subStrandsByStrand[selectedStrand as keyof typeof subStrandsByStrand]?.map(subStrand => (
              <Option key={subStrand.value} value={subStrand.value}>{subStrand.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="rubricId"
          label="Rubric"
          rules={[{ required: true, message: 'Please select a rubric' }]}
        >
          <Select 
            placeholder="Select rubric"
            disabled={!selectedSubStrand}
          >
            {selectedSubStrand && rubricsBySubStrand[selectedSubStrand as keyof typeof rubricsBySubStrand]?.map(rubric => (
              <Option key={rubric.value} value={rubric.value}>{rubric.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            icon={<RightOutlined />}
            onClick={handleNextStep}
          >
            Next Step
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );

  // Define table columns
  const columns: ColumnsType<StudentAssessment> = [
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
      width: 200,
    },
    {
      title: 'Registration Number',
      dataIndex: 'registrationNumber',
      key: 'registrationNumber',
      width: 150,
    },
    {
      title: 'Performance Level',
      dataIndex: 'performanceLevel',
      key: 'performanceLevel',
      width: 200,
      render: (_, record) => (
        <Select
          placeholder="Select level"
          style={{ width: '100%' }}
          value={record.performanceLevel}
          onChange={(value) => handlePerformanceLevelChange(record.studentId, value)}
        >
          {performanceLevels.map(level => (
            <Option key={level.value} value={level.value}>
              {level.value === 'absent' ? (
                <span style={{ color: '#ff4d4f' }}>{level.label}</span>
              ) : (
                level.label
              )}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
      width: 300,
      render: (_, record) => (
        <Input
          placeholder="Add comments"
          value={record.comments}
          onChange={(e) => handleCommentChange(record.studentId, e.target.value)}
          disabled={record.performanceLevel === 'absent'}
        />
      ),
    },
  ];

  // Handle saving draft assessments
  const handleSaveDraft = () => {
    // In a real app, this would save to backend
    message.success('Assessment draft saved successfully');
  };

  // Handle submitting all assessments
  const handleSubmitAll = () => {
    const incompleteAssessments = studentAssessments.filter(
      assessment => !assessment.performanceLevel
    );
    
    if (incompleteAssessments.length > 0) {
      message.warning(`Please assign performance levels or mark as absent for ${incompleteAssessments.length} student(s) before submitting.`);
      return;
    }

    // In a real app, this would submit to backend
    message.success('All assessments submitted successfully');
    
    // Reset and go back to step 1
    setCurrentStep(0);
    form.resetFields();
    setAssessmentParams({});
    setStudentAssessments([]);
    setSelectedClass(undefined);
    setSelectedLearningArea(undefined);
    setSelectedStrand(undefined);
    setSelectedSubStrand(undefined);
    setBulkPerformanceLevel(undefined);
  };

  const renderStepTwo = () => (
    <Card 
      title={
        <div>
          <div>Step 2: Record Student Performance</div>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            Assessment: {getRubricLabel(assessmentParams.rubricId)} - {getClassLabel(assessmentParams.classId)}
          </Text>
        </div>
      }
      extra={
        <Space>
          <Select
            placeholder="Select performance level for all"
            style={{ width: 220 }}
            value={bulkPerformanceLevel}
            onChange={(value) => setBulkPerformanceLevel(value)}
          >
            {performanceLevels.map(level => (
              <Option key={level.value} value={level.value}>
                {level.value === 'absent' ? (
                  <span style={{ color: '#ff4d4f' }}>{level.label}</span>
                ) : (
                  level.label
                )}
              </Option>
            ))}
          </Select>
          <Tooltip title="Apply selected performance level to all students">
            <Button 
              icon={<CopyOutlined />} 
              onClick={applyBulkPerformanceLevel}
            >
              Apply to All
            </Button>
          </Tooltip>
        </Space>
      }
    >
      <Table 
        columns={columns} 
        dataSource={studentAssessments}
        rowKey="studentId"
        pagination={false}
        scroll={{ y: 400 }}
      />

      <Divider />

      <Row justify="space-between">
        <Col>
          <Button 
            icon={<LeftOutlined />}
            onClick={handlePrevStep}
          >
            Previous Step
          </Button>
        </Col>
        <Col>
          <Space>
            <Button 
              icon={<SaveOutlined />}
              onClick={handleSaveDraft}
            >
              Save as Draft
            </Button>
            <Button 
              type="primary" 
              icon={<CheckCircleOutlined />}
              onClick={handleSubmitAll}
            >
              Submit All Assessments
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>
        <BookOutlined /> Bulk Assessment Recording
      </Title>
      <Text>Record assessments for an entire class in one go.</Text>
      
      <Steps current={currentStep} style={{ marginBottom: 24, marginTop: 24 }}>
        <Step title="Select Parameters" description="Class, Learning Area, Strand, etc." />
        <Step title="Record Performance" description="Assign levels to students" />
      </Steps>
      
      {currentStep === 0 ? renderStepOne() : renderStepTwo()}
    </div>
  );
};

export default BulkAssessmentRecordingPage;