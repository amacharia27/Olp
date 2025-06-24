// apps/frontend/src/features/student/pages/ResultSlipPage.tsx
import React, { useState } from 'react';
import {
  Typography,
  Card,
  Select,
  Button,
  Space,
  Row,
  Col,
  Table,
  Tag,
  Tabs,
  Spin
} from 'antd';
import {
  FilePdfOutlined,
  DownloadOutlined,
  LineChartOutlined,
  BookOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { generateResultSlip } from '@/utils/pdfGenerator';

// Import the PathwayRecommendation component
import PathwayRecommendation from '@/features/student/components/PathwayRecommendation';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

// Mock data for academic terms
const academicTerms = [
  { value: 'term3_2024', label: 'Term 3, 2024' },
  { value: 'term2_2024', label: 'Term 2, 2024' },
  { value: 'term1_2024', label: 'Term 1, 2024' },
  { value: 'term3_2023', label: 'Term 3, 2023' },
];

// Mock data for student information
const studentInfo = {
  name: 'John Doe',
  admissionNumber: 'G6-E-001',
  class: 'Grade 6 - Eagles',
  stream: 'Eagles',
  termAverage: '85.6%',
  termRank: '5 out of 45',
  attendance: '95%',
};

// Mock data for summative assessments (exams & CATs)
const summativeData = [
  { key: '1', subject: 'Mathematics', cat1: 85, cat2: 82, midTerm: 88, endTerm: 91, average: 86.5, grade: 'A', remarks: 'Excellent' },
  { key: '2', subject: 'English', cat1: 78, cat2: 80, midTerm: 82, endTerm: 85, average: 81.3, grade: 'A-', remarks: 'Very Good' },
  { key: '3', subject: 'Science', cat1: 81, cat2: 84, midTerm: 92, endTerm: 89, average: 86.5, grade: 'A', remarks: 'Excellent' },
  { key: '4', subject: 'Kiswahili', cat1: 75, cat2: 78, midTerm: 79, endTerm: 88, average: 80.0, grade: 'A-', remarks: 'Very Good' },
  { key: '5', subject: 'Social Studies', cat1: 80, cat2: 83, midTerm: 85, endTerm: 90, average: 84.5, grade: 'A-', remarks: 'Very Good' },
  { key: '6', subject: 'Creative Arts', cat1: 90, cat2: 92, midTerm: 88, endTerm: 94, average: 91.0, grade: 'A', remarks: 'Outstanding' },
  { key: '7', subject: 'Physical Education', cat1: 88, cat2: 90, midTerm: 92, endTerm: 95, average: 91.3, grade: 'A', remarks: 'Outstanding' },
  { key: '8', subject: 'Religious Education', cat1: 85, cat2: 88, midTerm: 90, endTerm: 92, average: 88.8, grade: 'A', remarks: 'Excellent' },
];

// Mock data for formative assessments (rubrics)
const formativeData = [
  { 
    key: '1', 
    subject: 'Mathematics', 
    strand: 'Numbers', 
    subStrand: 'Fractions', 
    indicator: 'Can perform operations with fractions including mixed numbers', 
    level: 'Exceeding Expectation', 
    comments: 'Shows excellent understanding of fraction operations'
  },
  { 
    key: '2', 
    subject: 'English', 
    strand: 'Reading', 
    subStrand: 'Comprehension', 
    indicator: 'Can analyze texts critically and make inferences', 
    level: 'Meeting Expectation', 
    comments: 'Good analytical skills but needs to work on making deeper connections'
  },
  { 
    key: '3', 
    subject: 'Science', 
    strand: 'Living Things', 
    subStrand: 'Plant Parts', 
    indicator: 'Can identify and explain functions of plant parts', 
    level: 'Exceeding Expectation', 
    comments: 'Demonstrates thorough understanding of plant biology'
  },
  { 
    key: '4', 
    subject: 'Kiswahili', 
    strand: 'Kuandika', 
    subStrand: 'Insha', 
    indicator: 'Can write coherent paragraphs with proper grammar', 
    level: 'Meeting Expectation', 
    comments: 'Good writing skills but needs to expand vocabulary'
  },
];

// Mock data for teacher comments
const teacherComments = {
  classTeacher: 'John has shown remarkable progress this term. His analytical skills in Mathematics and Science are particularly impressive. He should continue to work on his Kiswahili vocabulary and English comprehension skills.',
  headTeacher: 'A commendable performance. John demonstrates good academic potential and a positive attitude towards learning. Keep up the good work!',
};

// Table columns for summative data
const summativeColumns: ColumnsType<any> = [
  { title: 'Subject', dataIndex: 'subject', key: 'subject', fixed: 'left' },
  { title: 'CAT 1', dataIndex: 'cat1', key: 'cat1' },
  { title: 'CAT 2', dataIndex: 'cat2', key: 'cat2' },
  { title: 'Mid-Term', dataIndex: 'midTerm', key: 'midTerm' },
  { title: 'End-Term', dataIndex: 'endTerm', key: 'endTerm' },
  { 
    title: 'Average', 
    dataIndex: 'average', 
    key: 'average',
    render: (text) => <strong>{text}</strong>,
    sorter: (a, b) => a.average - b.average,
  },
  { 
    title: 'Grade', 
    dataIndex: 'grade', 
    key: 'grade',
    render: (grade) => {
      let color = 'blue';
      if (grade === 'A') color = 'green';
      if (grade === 'B') color = 'geekblue';
      if (grade === 'C') color = 'orange';
      if (grade === 'D' || grade === 'E') color = 'red';
      return <Tag color={color}>{grade}</Tag>;
    }
  },
  { title: 'Remarks', dataIndex: 'remarks', key: 'remarks' },
];

// Table columns for formative data
const formativeColumns: ColumnsType<any> = [
  { title: 'Subject', dataIndex: 'subject', key: 'subject' },
  { title: 'Strand', dataIndex: 'strand', key: 'strand' },
  { title: 'Sub-Strand', dataIndex: 'subStrand', key: 'subStrand' },
  { title: 'Indicator', dataIndex: 'indicator', key: 'indicator' },
  { 
    title: 'Level Achieved', 
    dataIndex: 'level', 
    key: 'level',
    render: (level) => {
      let color = 'geekblue';
      if (level === 'Exceeding Expectation') color = 'green';
      if (level === 'Meeting Expectation') color = 'blue';
      if (level === 'Approaching Expectation') color = 'gold';
      if (level === 'Below Expectation') color = 'volcano';
      return <Tag color={color}>{level}</Tag>;
    }
  },
  { title: 'Comments', dataIndex: 'comments', key: 'comments' },
];

const ResultSlipPage: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<string>(academicTerms[0].value);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPathwayRecommendation, setShowPathwayRecommendation] = useState<boolean>(false);

  // Handle term change
  const handleTermChange = (value: string) => {
    setLoading(true);
    setSelectedTerm(value);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // For Grade 9 Term 3, show pathway recommendation
      setShowPathwayRecommendation(value === 'term3_2023');
    }, 1000);
  };

  // Handle PDF generation using the existing utility
  const handleGeneratePDF = () => {
    // Convert summative data to the format expected by the PDF generator
    const formattedSummativeData = summativeData.map(item => ({
      subject: item.subject,
      type: 'End-Term',
      score: item.endTerm,
      outOf: 100,
      grade: item.grade
    }));
    
    // Convert formative data to the format expected by the PDF generator
    const formattedFormativeData = formativeData.map(item => ({
      subject: item.subject,
      strand: item.strand,
      subStrand: item.subStrand,
      indicator: item.indicator,
      level: item.level,
      date: new Date().toISOString().split('T')[0]
    }));
    
    // Use the existing PDF generator utility
    generateResultSlip(formattedSummativeData, formattedFormativeData);
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>
        <FilePdfOutlined /> Result Slip
      </Title>
      
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row gutter={16} align="middle">
            <Col xs={24} sm={12}>
              <Space>
                <Text strong>Select Term:</Text>
                <Select 
                  value={selectedTerm} 
                  onChange={handleTermChange}
                  style={{ width: 150 }}
                >
                  {academicTerms.map(term => (
                    <Option key={term.value} value={term.value}>{term.label}</Option>
                  ))}
                </Select>
              </Space>
            </Col>
            <Col xs={24} sm={12} style={{ textAlign: 'right' }}>
              <Button 
                type="primary" 
                icon={<DownloadOutlined />} 
                onClick={handleGeneratePDF}
              >
                Download Result Slip (PDF)
              </Button>
            </Col>
          </Row>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Spin size="large" />
              <div style={{ marginTop: 16 }}>Loading result data...</div>
            </div>
          ) : (
            <>
              <Card 
                title={<Title level={4}>Student Information</Title>} 
                type="inner"
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={8}>
                    <Text strong>Name:</Text> {studentInfo.name}
                  </Col>
                  <Col xs={24} md={8}>
                    <Text strong>Admission No:</Text> {studentInfo.admissionNumber}
                  </Col>
                  <Col xs={24} md={8}>
                    <Text strong>Class:</Text> {studentInfo.class}
                  </Col>
                  <Col xs={24} md={8}>
                    <Text strong>Term Average:</Text> {studentInfo.termAverage}
                  </Col>
                  <Col xs={24} md={8}>
                    <Text strong>Term Rank:</Text> {studentInfo.termRank}
                  </Col>
                  <Col xs={24} md={8}>
                    <Text strong>Attendance:</Text> {studentInfo.attendance}
                  </Col>
                </Row>
              </Card>

              {showPathwayRecommendation && (
                <PathwayRecommendation />
              )}

              <Tabs defaultActiveKey="1">
                <TabPane 
                  tab={<span><LineChartOutlined /> Summative Results (Exams & CATs)</span>} 
                  key="1"
                >
                  <Table 
                    columns={summativeColumns} 
                    dataSource={summativeData} 
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                  />
                </TabPane>
                <TabPane 
                  tab={<span><BookOutlined /> Formative Results (Rubrics)</span>} 
                  key="2"
                >
                  <Paragraph type="secondary" style={{ marginBottom: 16 }}>
                    This section shows your progress on specific skills based on the curriculum.
                  </Paragraph>
                  <Table 
                    columns={formativeColumns} 
                    dataSource={formativeData} 
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                  />
                </TabPane>
              </Tabs>

              <Card title={<Title level={4}>Teacher Comments</Title>} type="inner">
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Text strong>Class Teacher:</Text>
                    <Paragraph>{teacherComments.classTeacher}</Paragraph>
                  </Col>
                  <Col span={24}>
                    <Text strong>Head Teacher:</Text>
                    <Paragraph>{teacherComments.headTeacher}</Paragraph>
                  </Col>
                </Row>
              </Card>
            </>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default ResultSlipPage;
