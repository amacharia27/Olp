import React from 'react';
import { Card, Typography, Row, Col, Statistic, Divider } from 'antd';

const { Title, Paragraph } = Typography;

const NationalAnalyticsPage: React.FC = () => {
  return (
    <div className="national-analytics-page">
      <Title level={2}>National Analytics</Title>
      <Paragraph>
        Comprehensive analytics and insights for national education data.
      </Paragraph>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic title="Schools" value={24563} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic title="Students" value={8452000} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic title="Teachers" value={342800} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic title="Counties" value={47} />
          </Card>
        </Col>
      </Row>
      
      <Divider />
      
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="Analytics Dashboard">
            <Paragraph>
              This dashboard will display comprehensive analytics for national education metrics.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NationalAnalyticsPage;