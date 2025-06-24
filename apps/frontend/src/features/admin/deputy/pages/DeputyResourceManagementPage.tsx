import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const DeputyResourceManagementPage: React.FC = () => {
  return (
    <div>
      <Title level={2}>Resource Management</Title>
      <p>Manage and allocate school resources here.</p>
    </div>
  );
};

export default DeputyResourceManagementPage;