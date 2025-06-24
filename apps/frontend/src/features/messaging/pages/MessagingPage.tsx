// apps/frontend/src/features/messaging/pages/MessagingPage.tsx
import React from 'react';
import { Card, Typography } from 'antd';
import MessagingLayout from '@/features/messaging/components/MessagingLayout';

const { Title } = Typography;

const MessagingPage: React.FC = () => {
  return (
    <div style={{ padding: '24px', height: 'calc(100vh - 64px - 48px)' }}>
      <Title level={2}>Messages</Title>
      <Card style={{ height: 'calc(100% - 40px)', padding: 0, overflow: 'hidden' }}>
        <MessagingLayout />
      </Card>
    </div>
  );
};

export default MessagingPage;
