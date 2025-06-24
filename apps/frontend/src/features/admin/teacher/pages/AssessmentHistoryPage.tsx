// apps/frontend/src/features/admin/teacher/pages/AssessmentHistoryPage.tsx
import React, { useState, useEffect } from 'react';
import {
  Card, Table, Typography, Select, DatePicker, Button, 
  Row, Col, Input, Space, Tabs, Tag, Tooltip, Statistic
} from 'antd';
import {
  HistoryOutlined, SearchOutlined, FilterOutlined, 
  DownloadOutlined, BarChartOutlined,
  UserOutlined, FileTextOutlined,
  CheckCircleOutlined, EditOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

// Mock data for assessments
const mockAssessments: Assessment[] = [
  {
    id: 'a001',
    date: '2025-06-15',
    class: 'Grade 6 - Eagles',
    learningArea: 'Mathematics',
    strand: 'Numbers',
    subStrand: 'Fractions',
    rubric: 'Fraction Operations',
    studentsAssessed: 28,
    studentsAbsent: 2,
    averagePerformance: 'meeting',
    status: 'completed',
  },
  {
    id: 'a002',
    date: '2025-06-10',
    class: 'Grade 6 - Eagles',
    learningArea: 'English',
    strand: 'Reading',
    subStrand: 'Reading',
    rubric: 'Reading Comprehension',
    studentsAssessed: 27,
    studentsAbsent: 3,
    averagePerformance: 'approaching',
    status: 'completed',
  },
  {
    id: 'a003',
    date: '2025-06-05',
    class: 'Grade 7 - Hawks',
    learningArea: 'Mathematics',
    strand: 'Algebra',
    subStrand: 'Patterns',
    rubric: 'Pattern Recognition',
    studentsAssessed: 30,
    studentsAbsent: 0,
    averagePerformance: 'exceeding',
    status: 'completed',
  },
  {
    id: 'a004',
    date: '2025-06-01',
    class: 'Grade 7 - Owls',
    learningArea: 'Science',
    strand: 'Data Handling',
    subStrand: 'Data Handling',
    rubric: 'Data Collection and Recording',
    studentsAssessed: 25,
    studentsAbsent: 5,
    averagePerformance: 'meeting',
    status: 'completed',
  },
  {
    id: 'a005',
    date: '2025-05-28',
    class: 'Grade 6 - Falcons',
    learningArea: 'Mathematics',
    strand: 'Numbers',
    subStrand: 'Decimals',
    rubric: 'Decimal Operations',
    studentsAssessed: 29,
    studentsAbsent: 1,
    averagePerformance: 'approaching',
    status: 'completed',
  },
  {
    id: 'a006',
    date: '2025-05-20',
    class: 'Grade 6 - Eagles',
    learningArea: 'English',
    strand: 'Writing',
    subStrand: 'Writing',
    rubric: 'Writing Organization',
    studentsAssessed: 30,
    studentsAbsent: 0,
    averagePerformance: 'meeting',
    status: 'completed',
  },
  {
    id: 'a007',
    date: '2025-06-22',
    class: 'Grade 7 - Hawks',
    learningArea: 'Mathematics',
    strand: 'Numbers',
    subStrand: 'Fractions',
    rubric: 'Fraction Word Problems',
    studentsAssessed: 0,
    studentsAbsent: 0,
    averagePerformance: '',
    status: 'draft',
  },
];

// Mock data for classes, learning areas, etc.
const classes = [
  { value: 'class_6A', label: 'Grade 6 - Eagles' },
  { value: 'class_6B', label: 'Grade 6 - Falcons' },
  { value: 'class_7A', label: 'Grade 7 - Hawks' },
  { value: 'class_7B', label: 'Grade 7 - Owls' },
];

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

// Performance level colors for tags
const performanceLevelColors = {
  exceeding: 'green',
  meeting: 'blue',
  approaching: 'orange',
  below: 'red',
  '': 'default',
};

// Interface for assessment data
interface Assessment {
  id: string;
  date: string;
  class: string;
  learningArea: string;
  strand: string;
  subStrand: string;
  rubric: string;
  studentsAssessed: number;
  studentsAbsent: number;
  averagePerformance: string;
  status: 'completed' | 'draft';
}

// Interface for filter state
interface FilterState {
  searchText: string;
  dateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null;
  class: string | null;
  learningArea: string | null;
  status: string | null;
}

const AssessmentHistoryPage: React.FC = () => {
  const [assessments] = useState<Assessment[]>(mockAssessments);
  const [filteredAssessments, setFilteredAssessments] = useState<Assessment[]>(mockAssessments);
  const [filters, setFilters] = useState<FilterState>({
    searchText: '',
    dateRange: null,
    class: null,
    learningArea: null,
    status: null,
  });
  const [activeTab, setActiveTab] = useState<string>('all');

  // Apply filters when filter state changes
  useEffect(() => {
    let result = [...assessments];

    // Filter by search text
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      result = result.filter(
        assessment =>
          assessment.class.toLowerCase().includes(searchLower) ||
          assessment.learningArea.toLowerCase().includes(searchLower) ||
          assessment.strand.toLowerCase().includes(searchLower) ||
          assessment.subStrand.toLowerCase().includes(searchLower) ||
          assessment.rubric.toLowerCase().includes(searchLower)
      );
    }

    // Filter by date range
    if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
      const startDate = filters.dateRange[0].format('YYYY-MM-DD');
      const endDate = filters.dateRange[1].format('YYYY-MM-DD');
      result = result.filter(
        assessment => assessment.date >= startDate && assessment.date <= endDate
      );
    }

    // Filter by class
    if (filters.class) {
      result = result.filter(assessment => assessment.class === filters.class);
    }

    // Filter by learning area
    if (filters.learningArea) {
      result = result.filter(assessment => assessment.learningArea === filters.learningArea);
    }

    // Filter by status
    if (filters.status) {
      result = result.filter(assessment => assessment.status === filters.status);
    }

    // Filter by active tab
    if (activeTab === 'completed') {
      result = result.filter(assessment => assessment.status === 'completed');
    } else if (activeTab === 'draft') {
      result = result.filter(assessment => assessment.status === 'draft');
    }

    setFilteredAssessments(result);
  }, [filters, assessments, activeTab]);

  // Handle filter changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchText: e.target.value });
  };

  const handleDateRangeChange = (dates: any) => {
    setFilters({ ...filters, dateRange: dates });
  };

  const handleClassChange = (value: string | null) => {
    setFilters({ ...filters, class: value });
  };

  const handleLearningAreaChange = (value: string | null) => {
    setFilters({ ...filters, learningArea: value });
  };

  // Status filter is handled by tabs instead
  // const handleStatusChange = (value: string | null) => {
  //   setFilters({ ...filters, status: value });
  // };

  const handleResetFilters = () => {
    setFilters({
      searchText: '',
      dateRange: null,
      class: null,
      learningArea: null,
      status: null,
    });
  };

  // Calculate statistics
  const totalAssessments = filteredAssessments.length;
  const completedAssessments = filteredAssessments.filter(a => a.status === 'completed').length;
  const draftAssessments = filteredAssessments.filter(a => a.status === 'draft').length;
  
  // Performance statistics could be used for charts in the future
  // const performanceCounts = filteredAssessments.reduce((acc, assessment) => {
  //   if (assessment.averagePerformance && assessment.status === 'completed') {
  //     acc[assessment.averagePerformance] = (acc[assessment.averagePerformance] || 0) + 1;
  //   }
  //   return acc;
  // }, {} as Record<string, number>);

  // Define table columns
  const columns: ColumnsType<Assessment> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => a.date.localeCompare(b.date),
      render: (date) => dayjs(date).format('MMM D, YYYY'),
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
      sorter: (a, b) => a.class.localeCompare(b.class),
    },
    {
      title: 'Learning Area',
      dataIndex: 'learningArea',
      key: 'learningArea',
      sorter: (a, b) => a.learningArea.localeCompare(b.learningArea),
    },
    {
      title: 'Strand / Sub-strand',
      key: 'strand',
      render: (_, record) => `${record.strand} / ${record.subStrand}`,
    },
    {
      title: 'Rubric',
      dataIndex: 'rubric',
      key: 'rubric',
    },
    {
      title: 'Students',
      key: 'students',
      render: (_, record) => (
        <Tooltip title={`${record.studentsAbsent} student(s) absent`}>
          <span>{record.studentsAssessed} / {record.studentsAssessed + record.studentsAbsent}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Avg. Performance',
      dataIndex: 'averagePerformance',
      key: 'averagePerformance',
      render: (performance) => {
        if (!performance) return <Tag>N/A</Tag>;
        
        const performanceLabels: Record<string, string> = {
          exceeding: 'Exceeding',
          meeting: 'Meeting',
          approaching: 'Approaching',
          below: 'Below',
        };
        
        return (
          <Tag color={performanceLevelColors[performance as keyof typeof performanceLevelColors]}>
            {performanceLabels[performance] || 'N/A'}
          </Tag>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'completed' ? 'green' : 'orange'}>
          {status === 'completed' ? 'Completed' : 'Draft'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button type="text" icon={<FileTextOutlined />} />
          </Tooltip>
          {record.status === 'completed' && (
            <Tooltip title="View Analytics">
              <Button type="text" icon={<BarChartOutlined />} />
            </Tooltip>
          )}
          {record.status === 'draft' && (
            <Tooltip title="Continue Editing">
              <Button type="text" icon={<EditOutlined />} />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>
        <HistoryOutlined /> Assessment History
      </Title>
      <Text>View and analyze past assessments.</Text>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginTop: 24, marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Assessments"
              value={totalAssessments}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Completed"
              value={completedAssessments}
              valueStyle={{ color: '#3f8600' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Drafts"
              value={draftAssessments}
              valueStyle={{ color: '#faad14' }}
              prefix={<EditOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Students Assessed"
              value={filteredAssessments.reduce((sum, a) => sum + a.studentsAssessed, 0)}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filter Section */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={16} align="middle">
          <Col span={6}>
            <Input
              placeholder="Search assessments"
              prefix={<SearchOutlined />}
              value={filters.searchText}
              onChange={handleSearchChange}
              allowClear
            />
          </Col>
          <Col span={6}>
            <RangePicker
              style={{ width: '100%' }}
              value={filters.dateRange}
              onChange={handleDateRangeChange}
            />
          </Col>
          <Col span={4}>
            <Select
              placeholder="Select class"
              style={{ width: '100%' }}
              value={filters.class}
              onChange={handleClassChange}
              allowClear
            >
              {classes.map(cls => (
                <Option key={cls.value} value={cls.label}>{cls.label}</Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <Select
              placeholder="Select learning area"
              style={{ width: '100%' }}
              value={filters.learningArea}
              onChange={handleLearningAreaChange}
              allowClear
            >
              {learningAreas.map(area => (
                <Option key={area.value} value={area.label}>{area.label}</Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <Space>
              <Button icon={<FilterOutlined />} onClick={handleResetFilters}>
                Reset
              </Button>
              <Button type="primary" icon={<DownloadOutlined />}>
                Export
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Tabs and Table */}
      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="All Assessments" key="all" />
          <TabPane tab="Completed" key="completed" />
          <TabPane tab="Drafts" key="draft" />
        </Tabs>
        
        <Table
          columns={columns}
          dataSource={filteredAssessments}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};

export default AssessmentHistoryPage;
