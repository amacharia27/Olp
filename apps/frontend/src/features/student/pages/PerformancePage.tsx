// apps/frontend/src/features/student/pages/PerformancePage.tsx
import { Tabs, Table, Tag, Typography, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import PerformanceChart from '../components/PerformanceChart';
import { generateResultSlip } from '@/utils/pdfGenerator';

const { Title, Paragraph } = Typography;

// --- MOCK DATA ---
// Summative Data
const summativeData = [
  { key: '1', term: 'Term 1, 2023', subject: 'Mathematics', type: 'CAT 1', score: 85, outOf: 100, grade: 'A-' },
  { key: '2', term: 'Term 1, 2023', subject: 'English', type: 'CAT 1', score: 78, outOf: 100, grade: 'B+' },
  { key: '3', term: 'Term 1, 2023', subject: 'Science', type: 'Mid-Term Exam', score: 92, outOf: 100, grade: 'A' },
  { key: '4', term: 'Term 1, 2023', subject: 'Mathematics', type: 'Mid-Term Exam', score: 88, outOf: 100, grade: 'A-' },
];

// Formative Data
const formativeData = [
    { key: '1', subject: 'Science', strand: 'Living Things', subStrand: 'Plant Parts', indicator: 'Correctly identifies 5 parts of a plant', level: 'Exceeds Expectation', date: '2023-09-15' },
    { key: '2', subject: 'English', strand: 'Reading', subStrand: 'Fluency', indicator: 'Reads a grade-level paragraph smoothly', level: 'Meets Expectation', date: '2023-09-12' },
    { key: '3', subject: 'Mathematics', strand: 'Numbers', subStrand: 'Addition', indicator: 'Solves 2-digit addition problems', level: 'Approaches Expectation', date: '2023-09-10' },
];

// Chart Data
const chartData = [
  { name: 'CAT 1', Math: 85, English: 78, Science: 81, Kiswahili: 75, 'Social Studies': 80 },
  { name: 'Mid-Term', Math: 88, English: 82, Science: 92, Kiswahili: 79, 'Social Studies': 85 },
  { name: 'End-Term', Math: 91, English: 85, Science: 89, Kiswahili: 88, 'Social Studies': 90 },
];
const subjectsForChart = ['Math', 'English', 'Science', 'Kiswahili', 'Social Studies'];

// --- TABLE COLUMNS ---
const summativeColumns: ColumnsType<any> = [
  { title: 'Term', dataIndex: 'term', key: 'term' },
  { title: 'Subject', dataIndex: 'subject', key: 'subject' },
  { title: 'Assessment Type', dataIndex: 'type', key: 'type' },
  { title: 'Score', dataIndex: 'score', key: 'score', render: (text, record) => `${text} / ${record.outOf}` },
  { title: 'Grade', dataIndex: 'grade', key: 'grade', render: grade => <Tag color="blue">{grade}</Tag> },
];

const formativeColumns: ColumnsType<any> = [
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Subject', dataIndex: 'subject', key: 'subject' },
  { title: 'Strand / Sub-Strand', key: 'strand', render: (_, record) => `${record.strand} / ${record.subStrand}` },
  { title: 'Indicator', dataIndex: 'indicator', key: 'indicator' },
  { title: 'Level Achieved', dataIndex: 'level', key: 'level', render: level => {
      let color = 'geekblue';
      if (level === 'Exceeds Expectation') color = 'green';
      if (level === 'Approaches Expectation') color = 'gold';
      if (level === 'Below Expectation') color = 'volcano';
      return <Tag color={color}>{level}</Tag>;
  }},
];


const PerformancePage = () => {
  // TODO: Add useEffect to fetch performance data from API

  return (
    <div>
      <Space direction="vertical" size="large" style={{width: '100%'}}>
        <Title level={2}>My Performance</Title>
        <PerformanceChart title="Performance Trends - Term 1, 2023" data={chartData} subjects={subjectsForChart} />
        
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Summative Results (Exams & CATs)" key="1">
            <Space direction='vertical' style={{width: '100%'}}>
              <Button type="primary" onClick={() => generateResultSlip(summativeData, formativeData)}>Download Term 1 Report Slip (PDF)</Button>
              <Table columns={summativeColumns} dataSource={summativeData} pagination={{ pageSize: 10 }} />
            </Space>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Formative Results (Rubrics)" key="2">
             <Paragraph type="secondary">
                This section shows your progress on specific skills based on the curriculum.
             </Paragraph>
             <Table columns={formativeColumns} dataSource={formativeData} pagination={{ pageSize: 10 }} />
          </Tabs.TabPane>
        </Tabs>
      </Space>
    </div>
  );
};

export default PerformancePage;