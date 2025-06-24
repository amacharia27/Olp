import { useState, useEffect } from 'react';
import { Card, Col, Row, Table, Typography, Select, Spin } from 'antd';
import { 
  BookOutlined, 
  StarOutlined, 
  TrophyOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { useParentDashboard } from '../context/ParentDashboardContext';

const { Title, Text } = Typography;


// Mock data - replace with API calls

const mockPerformanceData: Record<string, any> = {
  'child1': {
    overallAverage: 82.5,
    classRank: 5,
    totalStudents: 32,
    term: 'Term 2, 2025',
    subjects: [
      { name: 'Mathematics', score: 85, average: 78, rank: 3 },
      { name: 'English', score: 88, average: 82, rank: 2 },
      { name: 'Kiswahili', score: 79, average: 75, rank: 5 },
      { name: 'Science', score: 91, average: 85, rank: 1 },
      { name: 'Social Studies', score: 80, average: 77, rank: 4 },
    ],
    attendance: '95%',
    teacherComment: 'Asha is performing exceptionally well in Science. Keep up the good work!',
  },
  'child2': {
    overallAverage: 76.2,
    classRank: 12,
    totalStudents: 30,
    term: 'Term 2, 2025',
    subjects: [
      { name: 'Mathematics', score: 78, average: 75, rank: 8 },
      { name: 'English', score: 82, average: 80, rank: 5 },
      { name: 'Kiswahili', score: 70, average: 68, rank: 12 },
      { name: 'Science', score: 75, average: 72, rank: 10 },
    ],
    attendance: '92%',
    teacherComment: 'David is doing well but needs to focus more on Kiswahili.',
  },
};

const ChildPerformancePage = () => {
  const { selectedChildId, selectedChild, isLoading } = useParentDashboard();
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [selectedTerm, setSelectedTerm] = useState<string>('term2');

  useEffect(() => {
    // In a real app, fetch performance data for the selected child
    if (selectedChildId) {
      setPerformanceData(mockPerformanceData[selectedChildId]);
      // TODO: API call here: GET /api/v1/parent/performance?childId=${selectedChildId}&term=${selectedTerm}
    }
  }, [selectedChildId, selectedTerm]);

  // Child data is available in the component state

  const columns = [
    {
      title: 'Subject',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: (score: number) => `${score}%`,
    },
    {
      title: 'Class Average',
      dataIndex: 'average',
      key: 'average',
      render: (average: number) => `${average}%`,
    },
    {
      title: 'Rank in Class',
      dataIndex: 'rank',
      key: 'rank',
      render: (rank: number) => `#${rank}`,
    },
  ];

  // Show loading state if data is being fetched
  if (isLoading || !performanceData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <Spin size="large" tip="Loading performance data..." />
      </div>
    );
  }

  return (
    <div>
      <Title level={2}>Child Performance</Title>
      
      {/* Note: Child selection is now handled by GlobalChildSelector in the ParentLayoutWrapper */}
      <div style={{ marginBottom: 24 }}>
        <Text strong>Select Term:</Text>
        <Select
          value={selectedTerm}
          onChange={setSelectedTerm}
          style={{ width: 200, marginLeft: 16 }}
          options={[
            { value: 'term1', label: 'Term 1, 2025' },
            { value: 'term2', label: 'Term 2, 2025' },
            { value: 'term3', label: 'Term 3, 2025' },
          ]}
        />
      </div>

      {performanceData && (
        <>
          {/* Performance Summary Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: 16, fontSize: 24 }}>
                    <TrophyOutlined style={{ color: '#1890ff' }} />
                  </div>
                  <div>
                    <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Overall Average</div>
                    <div style={{ fontSize: 24, fontWeight: 'bold' }}>
                      {performanceData.overallAverage}%
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: 16, fontSize: 24 }}>
                    <TeamOutlined style={{ color: '#52c41a' }} />
                  </div>
                  <div>
                    <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Class Rank</div>
                    <div style={{ fontSize: 24, fontWeight: 'bold' }}>
                      #{performanceData.classRank} of {performanceData.totalStudents}
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: 16, fontSize: 24 }}>
                    <BookOutlined style={{ color: '#722ed1' }} />
                  </div>
                  <div>
                    <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Attendance</div>
                    <div style={{ fontSize: 24, fontWeight: 'bold' }}>
                      {performanceData.attendance}
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: 16, fontSize: 24 }}>
                    <StarOutlined style={{ color: '#faad14' }} />
                  </div>
                  <div>
                    <div style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Term</div>
                    <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                      {performanceData.term}
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          {/* Subject Performance */}
          <Card title="Subject Performance" style={{ marginBottom: 24 }}>
            <Table 
              columns={columns} 
              dataSource={performanceData.subjects} 
              rowKey="name"
              pagination={false}
            />
          </Card>

          {/* Teacher's Comment */}
          <Card title="Teacher's Comment">
            <div style={{ padding: '16px 0' }}>
              <Text>{performanceData.teacherComment}</Text>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default ChildPerformancePage;