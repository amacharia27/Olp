import React from 'react';
import { Card, Typography, Row, Col, Table, Tabs, Divider } from 'antd';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

interface ComparisonData {
  key: string;
  county: string;
  enrollment: number;
  completion: number;
  teacherRatio: number;
  funding: number;
}

const ComparativeAnalysisPage: React.FC = () => {
  // Sample data for demonstration
  const comparisonData: ComparisonData[] = [
    {
      key: '1',
      county: 'Nairobi',
      enrollment: 95.2,
      completion: 92.5,
      teacherRatio: 1.28,
      funding: 12500,
    },
    {
      key: '2',
      county: 'Mombasa',
      enrollment: 88.7,
      completion: 85.1,
      teacherRatio: 1.15,
      funding: 10200,
    },
    {
      key: '3',
      county: 'Kisumu',
      enrollment: 87.3,
      completion: 83.6,
      teacherRatio: 1.05,
      funding: 9800,
    },
    {
      key: '4',
      county: 'Nakuru',
      enrollment: 90.1,
      completion: 86.2,
      teacherRatio: 1.12,
      funding: 10500,
    },
  ];

  const columns = [
    {
      title: 'County',
      dataIndex: 'county',
      key: 'county',
    },
    {
      title: 'Enrollment Rate (%)',
      dataIndex: 'enrollment',
      key: 'enrollment',
      sorter: (a: ComparisonData, b: ComparisonData) => a.enrollment - b.enrollment,
    },
    {
      title: 'Completion Rate (%)',
      dataIndex: 'completion',
      key: 'completion',
      sorter: (a: ComparisonData, b: ComparisonData) => a.completion - b.completion,
    },
    {
      title: 'Teacher-Student Ratio',
      dataIndex: 'teacherRatio',
      key: 'teacherRatio',
      sorter: (a: ComparisonData, b: ComparisonData) => a.teacherRatio - b.teacherRatio,
    },
    {
      title: 'Funding per Student (KES)',
      dataIndex: 'funding',
      key: 'funding',
      sorter: (a: ComparisonData, b: ComparisonData) => a.funding - b.funding,
    },
  ];

  return (
    <div className="comparative-analysis-page">
      <Title level={2}>Comparative Analysis</Title>
      <Paragraph>
        Compare educational metrics across different counties and regions.
      </Paragraph>
      
      <Tabs defaultActiveKey="1">
        <TabPane tab="County Comparison" key="1">
          <Card>
            <Table 
              dataSource={comparisonData} 
              columns={columns} 
              pagination={false} 
              bordered 
            />
          </Card>
        </TabPane>
        <TabPane tab="Regional Trends" key="2">
          <Card>
            <Paragraph>
              Regional trend analysis will be displayed here with charts and graphs.
            </Paragraph>
          </Card>
        </TabPane>
        <TabPane tab="Year-over-Year" key="3">
          <Card>
            <Paragraph>
              Year-over-year comparison data will be displayed here.
            </Paragraph>
          </Card>
        </TabPane>
      </Tabs>
      
      <Divider />
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Analysis Insights">
            <Paragraph>
              This section will provide insights based on the comparative analysis of educational metrics across counties.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ComparativeAnalysisPage;