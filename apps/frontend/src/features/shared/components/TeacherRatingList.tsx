// apps/frontend/src/features/shared/components/TeacherRatingList.tsx
import React from 'react';
import { List, Rate, Card, Typography, Tag, Space, Empty, Spin } from 'antd';
import { UserOutlined, CalendarOutlined, TagOutlined } from '@ant-design/icons';
import { Teacher } from './RatingForm';

const { Text, Paragraph, Title } = Typography;

export interface Rating {
  id: string;
  teacherId: string;
  rating: number;
  feedback?: string;
  category: string;
  date: string;
}

interface TeacherRatingListProps {
  ratings: Rating[];
  teachers: Teacher[];
  loading?: boolean;
  emptyText?: string;
  title?: string;
}

// Map for category display names
const categoryDisplayNames: Record<string, string> = {
  teaching_quality: 'Teaching Quality',
  communication: 'Communication',
  responsiveness: 'Responsiveness',
  knowledge: 'Subject Knowledge',
  engagement: 'Student Engagement',
};

// Tag colors for different categories
const categoryColors: Record<string, string> = {
  teaching_quality: 'blue',
  communication: 'green',
  responsiveness: 'purple',
  knowledge: 'orange',
  engagement: 'cyan',
};

const TeacherRatingList: React.FC<TeacherRatingListProps> = ({
  ratings,
  teachers,
  loading = false,
  emptyText = 'No ratings submitted yet',
  title = 'Your Rating History'
}) => {
  // Get teacher name by ID
  const getTeacherName = (teacherId: string): string => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : 'Unknown Teacher';
  };

  // Get teacher subject by ID
  const getTeacherSubject = (teacherId: string): string => {
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.subject : 'Unknown Subject';
  };

  // Format date string
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <Spin size="large" />
        <div style={{ marginTop: 16 }}>Loading ratings...</div>
      </div>
    );
  }

  return (
    <div>
      <Title level={3}>{title}</Title>
      
      {ratings.length === 0 ? (
        <Empty
          description={emptyText}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3 }}
          dataSource={ratings}
          renderItem={rating => (
            <List.Item>
              <Card hoverable>
                <div style={{ marginBottom: 12 }}>
                  <Space>
                    <UserOutlined />
                    <Text strong>{getTeacherName(rating.teacherId)}</Text>
                    <Text type="secondary">({getTeacherSubject(rating.teacherId)})</Text>
                  </Space>
                </div>
                
                <div style={{ marginBottom: 12 }}>
                  <Rate disabled defaultValue={rating.rating} allowHalf />
                </div>
                
                <div style={{ marginBottom: 12 }}>
                  <Tag color={categoryColors[rating.category] || 'default'} icon={<TagOutlined />}>
                    {categoryDisplayNames[rating.category] || rating.category}
                  </Tag>
                </div>
                
                {rating.feedback && (
                  <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}>
                    "{rating.feedback}"
                  </Paragraph>
                )}
                
                <div>
                  <Space>
                    <CalendarOutlined />
                    <Text type="secondary">{formatDate(rating.date)}</Text>
                  </Space>
                </div>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default TeacherRatingList;
