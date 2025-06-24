// apps/frontend/src/layouts/ParentLayoutWrapper.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ParentDashboardProvider } from '../features/parent/context/ParentDashboardContext';
import GlobalChildSelector from '../features/parent/components/GlobalChildSelector';
import { Card, Typography, theme } from 'antd';

const { Title } = Typography;
const { useToken } = theme;

const ParentLayoutWrapper: React.FC = () => {
  const { token } = useToken();
  
  return (
    <ParentDashboardProvider>
      <div style={{ 
        padding: '0 0 24px 0',
        background: `linear-gradient(180deg, ${token.colorPrimaryBg} 0%, rgba(255,255,255,0) 100%)`,
        borderRadius: token.borderRadiusLG,
        marginBottom: 24
      }}>
        <Card 
          bordered={false}
          style={{ 
            boxShadow: token.boxShadowTertiary,
            marginBottom: 16,
            borderRadius: token.borderRadiusLG,
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Title level={4} style={{ margin: '0 0 16px 0', color: token.colorPrimary }}>Parent Dashboard</Title>
          <GlobalChildSelector />
        </Card>
      </div>
      <Outlet />
    </ParentDashboardProvider>
  );
};

export default ParentLayoutWrapper;
