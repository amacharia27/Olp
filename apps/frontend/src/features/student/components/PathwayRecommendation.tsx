// apps/frontend/src/features/student/components/PathwayRecommendation.tsx
import React from 'react';
import { Card, Typography, Row, Col, Tag, Progress, Space, Divider, Button } from 'antd';
import { RocketOutlined, BulbOutlined, CheckCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// Mock data for student strengths
const studentStrengths = [
  { subject: 'Mathematics', score: 91, category: 'STEM' },
  { subject: 'Science', score: 89, category: 'STEM' },
  { subject: 'English', score: 85, category: 'Social Sciences' },
  { subject: 'Creative Arts', score: 94, category: 'Arts & Sports' },
  { subject: 'Physical Education', score: 95, category: 'Arts & Sports' },
  { subject: 'Social Studies', score: 90, category: 'Social Sciences' },
];

// Mock data for pathway scores
const pathwayScores = [
  { pathway: 'STEM', score: 90, color: '#1890ff', description: 'Science, Technology, Engineering, Mathematics' },
  { pathway: 'Social Sciences', score: 87, color: '#52c41a', description: 'Humanities, Business, Law, Education' },
  { pathway: 'Arts & Sports', score: 94, color: '#722ed1', description: 'Creative Arts, Music, Physical Education, Sports' },
];

// Mock career interests data
const careerInterests = [
  'Software Engineering',
  'Data Science',
  'Robotics',
];

// Mock recommended schools
const recommendedSchools = [
  { name: 'Alliance High School', specialization: 'STEM', proximity: 'Medium', capacity: 'High' },
  { name: 'Kenya High School', specialization: 'STEM', proximity: 'Low', capacity: 'Medium' },
  { name: 'Starehe Boys Centre', specialization: 'STEM', proximity: 'High', capacity: 'High' },
];

interface PathwayRecommendationProps {
  // Props can be added later for dynamic data
}

const PathwayRecommendation: React.FC<PathwayRecommendationProps> = () => {
  // Find the recommended pathway (highest score)
  const recommendedPathway = [...pathwayScores].sort((a, b) => b.score - a.score)[0];

  return (
    <Card
      title={
        <Space>
          <RocketOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          <Title level={4} style={{ margin: 0 }}>AI-Powered Pathway Recommendation</Title>
        </Space>
      }
      style={{ marginBottom: 24 }}
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} md={16}>
          <Card type="inner" title="Your Recommended Pathway">
            <Row align="middle" gutter={16}>
              <Col>
                <Tag color={recommendedPathway.color} style={{ fontSize: '16px', padding: '8px 16px' }}>
                  {recommendedPathway.pathway}
                </Tag>
              </Col>
              <Col flex="auto">
                <Text strong>{recommendedPathway.description}</Text>
              </Col>
            </Row>
            
            <Paragraph style={{ marginTop: 16 }}>
              Based on your academic performance over the past three years, extracurricular activities, 
              and stated career interests, our AI system recommends the {recommendedPathway.pathway} pathway 
              as your best fit for senior school.
            </Paragraph>

            <Divider orientation="left">Pathway Match Scores</Divider>
            
            {pathwayScores.map((pathway) => (
              <div key={pathway.pathway} style={{ marginBottom: 16 }}>
                <Space style={{ marginBottom: 4 }}>
                  <Text strong>{pathway.pathway}</Text>
                  <Text type="secondary">({pathway.description})</Text>
                </Space>
                <Progress 
                  percent={pathway.score} 
                  strokeColor={pathway.color}
                  format={(percent) => `${percent}%`}
                />
              </div>
            ))}
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card 
            type="inner" 
            title={
              <Space>
                <BulbOutlined />
                <span>Your Strengths</span>
              </Space>
            }
            style={{ marginBottom: 16 }}
          >
            {studentStrengths.map((strength) => (
              <div key={strength.subject} style={{ marginBottom: 8 }}>
                <Row justify="space-between">
                  <Col>
                    <Text>{strength.subject}</Text>
                  </Col>
                  <Col>
                    <Tag color={
                      strength.category === 'STEM' ? '#1890ff' : 
                      strength.category === 'Social Sciences' ? '#52c41a' : '#722ed1'
                    }>
                      {strength.score}%
                    </Tag>
                  </Col>
                </Row>
              </div>
            ))}
            
            <Divider />
            
            <Text strong>Career Interests:</Text>
            <div style={{ marginTop: 8 }}>
              {careerInterests.map((interest) => (
                <Tag key={interest} style={{ marginBottom: 4 }}>
                  {interest}
                </Tag>
              ))}
            </div>
          </Card>
          
          <Card 
            type="inner" 
            title={
              <Space>
                <CheckCircleOutlined />
                <span>Recommended Schools</span>
              </Space>
            }
          >
            {recommendedSchools.map((school, index) => (
              <div key={index} style={{ marginBottom: index < recommendedSchools.length - 1 ? 12 : 0 }}>
                <Text strong>{school.name}</Text>
                <div style={{ marginTop: 4 }}>
                  <Space wrap>
                    <Tag color="blue">Specialization: {school.specialization}</Tag>
                    <Tag color="green">Proximity: {school.proximity}</Tag>
                    <Tag color="purple">Capacity: {school.capacity}</Tag>
                  </Space>
                </div>
                {index < recommendedSchools.length - 1 && <Divider style={{ margin: '12px 0' }} />}
              </div>
            ))}
          </Card>
        </Col>
        
        <Col span={24}>
          <Space style={{ float: 'right' }}>
            <Button type="primary">
              Explore Pathway Details <ArrowRightOutlined />
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default PathwayRecommendation;
