import React from 'react';
import { Card, Table, Tag, Progress, Typography, Tooltip } from 'antd';
import { StarFilled, InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface Teacher {
  id: string;
  name: string;
  subject: string;
  rating: number;
  attendance: number;
  performance: number;
  trend: 'up' | 'down' | 'neutral';
}

const mockTeachers: Teacher[] = [
  {
    id: '1',
    name: 'John Mwangi',
    subject: 'Mathematics',
    rating: 4.8,
    attendance: 96,
    performance: 92,
    trend: 'up'
  },
  {
    id: '2',
    name: 'Sarah Wanjiku',
    subject: 'English',
    rating: 4.5,
    attendance: 89,
    performance: 85,
    trend: 'up'
  },
  {
    id: '3',
    name: 'David Ochieng',
    subject: 'Sciences',
    rating: 4.2,
    attendance: 92,
    performance: 78,
    trend: 'down'
  },
  {
    id: '4',
    name: 'Grace Akinyi',
    subject: 'Humanities',
    rating: 4.6,
    attendance: 95,
    performance: 88,
    trend: 'up'
  },
  {
    id: '5',
    name: 'Peter Kamau',
    subject: 'Languages',
    rating: 3.9,
    attendance: 82,
    performance: 75,
    trend: 'neutral'
  }
];

const TeacherPerformance: React.FC = () => {
  const columns = [
    {
      title: 'Teacher',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Teacher) => (
        <div>
          <div>{text}</div>
          <Text type="secondary" style={{ fontSize: 12 }}>{record.subject}</Text>
        </div>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <StarFilled style={{ color: '#ffc53d', marginRight: 4 }} />
          {rating.toFixed(1)}
        </div>
      ),
      sorter: (a: Teacher, b: Teacher) => a.rating - b.rating,
    },
    {
      title: 'Attendance %',
      dataIndex: 'attendance',
      key: 'attendance',
      render: (attendance: number) => (
        <Progress 
          percent={attendance} 
          size="small" 
          showInfo={false} 
          strokeColor={attendance > 90 ? '#52c41a' : attendance > 80 ? '#faad14' : '#f5222d'}
        />
      ),
      sorter: (a: Teacher, b: Teacher) => a.attendance - b.attendance,
    },
    {
      title: 'Performance',
      dataIndex: 'performance',
      key: 'performance',
      render: (performance: number, record: Teacher) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text style={{ width: 40 }}>{performance}%</Text>
          <Tooltip title={`${record.trend === 'up' ? 'Improved' : record.trend === 'down' ? 'Declined' : 'No change'} from last period`}>
            <InfoCircleOutlined style={{ color: '#8c8c8c' }} />
          </Tooltip>
        </div>
      ),
      sorter: (a: Teacher, b: Teacher) => a.performance - b.performance,
    },
  ];

  return (
    <Card 
      title={
        <span>
          <span style={{ marginRight: 8 }}>👨‍🏫</span>
          Teacher Performance
        </span>
      }
      className="teacher-performance"
    >
      <Table 
        columns={columns} 
        dataSource={mockTeachers} 
        rowKey="id"
        pagination={false}
        size="small"
      />
    </Card>
  );
};

export default TeacherPerformance;
