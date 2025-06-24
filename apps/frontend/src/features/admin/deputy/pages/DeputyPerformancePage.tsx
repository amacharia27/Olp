import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const DeputyPerformancePage: React.FC = () => {
  return (
    <div>
      <Title level={2}>Performance Overview</Title>
      <p>View and analyze teacher and student performance metrics here.</p>
    </div>
  );
};

export default DeputyPerformancePage;