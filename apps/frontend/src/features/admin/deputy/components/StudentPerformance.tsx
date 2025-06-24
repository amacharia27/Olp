import React from 'react';
import { Card, Table, Progress, Typography, Tag } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ClassPerformance {
  id: string;
  className: string;
  teacher: string;
  avgScore: number;
  improvement: number;
  topPerformer: string;
  topScore: number;
  subjects: {
    name: string;
    avgScore: number;
  }[];
}

const mockClassPerformance: ClassPerformance[] = [
  {
    id: '1',
    className: 'Grade 6 - Eagles',
    teacher: 'John Mwangi',
    avgScore: 82,
    improvement: 5.2,
    topPerformer: 'Sarah Johnson',
    topScore: 96,
    subjects: [
      { name: 'Math', avgScore: 85 },
      { name: 'English', avgScore: 88 },
      { name: 'Science', avgScore: 80 },
      { name: 'Kiswahili', avgScore: 78 }
    ]
  },
  {
    id: '2',
    className: 'Grade 5 - Lions',
    teacher: 'Sarah Wanjiku',
    avgScore: 78,
    improvement: 2.1,
    topPerformer: 'David Kamau',
    topScore: 92,
    subjects: [
      { name: 'Math', avgScore: 82 },
      { name: 'English', avgScore: 85 },
      { name: 'Science', avgScore: 76 },
      { name: 'Kiswahili', avgScore: 70 }
    ]
  },
  {
    id: '3',
    className: 'Grade 4 - Cheetahs',
    teacher: 'David Ochieng',
    avgScore: 75,
    improvement: -1.3,
    topPerformer: 'Grace Wambui',
    topScore: 89,
    subjects: [
      { name: 'Math', avgScore: 78 },
      { name: 'English', avgScore: 80 },
      { name: 'Science', avgScore: 72 },
      { name: 'Kiswahili', avgScore: 68 }
    ]
  },
  {
    id: '4',
    className: 'Grade 7 - Rhinos',
    teacher: 'Grace Akinyi',
    avgScore: 85,
    improvement: 3.7,
    topPerformer: 'Michael Omondi',
    topScore: 98,
    subjects: [
      { name: 'Math', avgScore: 88 },
      { name: 'English', avgScore: 90 },
      { name: 'Science', avgScore: 85 },
      { name: 'Kiswahili', avgScore: 80 }
    ]
  }
];

const StudentPerformance: React.FC = () => {
  const getStatusColor = (score: number) => {
    if (score >= 80) return '#52c41a';
    if (score >= 60) return '#faad14';
    return '#f5222d';
  };

  const columns = [
    {
      title: 'Class',
      dataIndex: 'className',
      key: 'className',
      render: (text: string, record: ClassPerformance) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>Teacher: {record.teacher}</Text>
        </div>
      ),
    },
    {
      title: 'Avg. Score',
      dataIndex: 'avgScore',
      key: 'avgScore',
      render: (score: number) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Progress
            type="circle"
            percent={score}
            width={50}
            format={(percent) => `${percent}`}
            strokeColor={getStatusColor(score)}
          />
        </div>
      ),
      sorter: (a: ClassPerformance, b: ClassPerformance) => a.avgScore - b.avgScore,
    },
    {
      title: 'Improvement',
      dataIndex: 'improvement',
      key: 'improvement',
      render: (improvement: number) => (
        <Tag color={improvement >= 0 ? 'green' : 'red'} icon={improvement >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}>
          {Math.abs(improvement)}%
        </Tag>
      ),
      sorter: (a: ClassPerformance, b: ClassPerformance) => a.improvement - b.improvement,
    },
    {
      title: 'Top Performer',
      key: 'topPerformer',
      render: (_: any, record: ClassPerformance) => (
        <div>
          <div>{record.topPerformer}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>Score: {record.topScore}%</Text>
        </div>
      ),
    },
    {
      title: 'Subjects',
      key: 'subjects',
      render: (_: any, record: ClassPerformance) => (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {record.subjects.map(subject => (
            <Tag key={subject.name} color="blue">
              {subject.name}: {subject.avgScore}%
            </Tag>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Card 
      title={
        <span>
          <span style={{ marginRight: 8 }}>📊</span>
          Class Performance Overview
        </span>
      }
      className="student-performance"
    >
      <Table 
        columns={columns} 
        dataSource={mockClassPerformance} 
        rowKey="id"
        pagination={false}
        size="middle"
      />
    </Card>
  );
};

export default StudentPerformance;
