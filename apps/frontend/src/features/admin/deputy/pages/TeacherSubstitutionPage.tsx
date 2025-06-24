import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

const TeacherSubstitutionPage: React.FC = () => {
  return (
    <div>
      <Title level={2}>Teacher Substitution</Title>
      <p>Manage teacher substitutions and replacements here.</p>
    </div>
  );
};

export default TeacherSubstitutionPage;