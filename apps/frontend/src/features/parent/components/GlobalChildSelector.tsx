// apps/frontend/src/features/parent/components/GlobalChildSelector.tsx
import React from 'react';
import { Select, Typography, Spin, Space, Avatar, Badge, Empty, theme } from 'antd';
import { TeamOutlined, LoadingOutlined } from '@ant-design/icons';
import { useParentDashboard } from '../context/ParentDashboardContext';

const { Text } = Typography;
const { useToken } = theme;

const GlobalChildSelector: React.FC = () => {
  const { children, selectedChildId, setSelectedChildId, isLoading } = useParentDashboard();
  const { token } = useToken();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0' }}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: token.colorPrimary }} spin />} />
        <Text style={{ marginLeft: 12, color: token.colorTextSecondary }}>Loading children data...</Text>
      </div>
    );
  }

  if (children.length === 0) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <Text type="secondary">No children registered</Text>
        }
      />
    );
  }

  // Generate a color based on the child's name for the avatar
  const getAvatarColor = (name: string) => {
    const colors = [
      '#1677ff', // Blue
      '#52c41a', // Green
      '#faad14', // Gold
      '#722ed1', // Purple
      '#eb2f96', // Magenta
      '#fa541c', // Volcano
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space align="center">
          <Badge count={children.length} color={token.colorPrimary} size="small">
            <TeamOutlined style={{ fontSize: 18, color: token.colorPrimary }} />
          </Badge>
          <Text strong style={{ fontSize: 16 }}>Select Child:</Text>
        </Space>
        
        <Select
          value={selectedChildId}
          onChange={setSelectedChildId}
          style={{ width: '100%' }}
          size="large"
          placeholder="Select a child"
          optionLabelProp="label"
          options={children.map(child => {
            const avatarColor = getAvatarColor(child.name);
            const initials = getInitials(child.name);
            
            return {
              value: child.id,
              label: child.name,
              option: (
                <Space align="center" style={{ padding: '8px 0' }}>
                  <Avatar 
                    style={{ backgroundColor: avatarColor, color: '#fff' }}
                    size="large"
                  >
                    {initials}
                  </Avatar>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text strong style={{ fontSize: '16px', marginBottom: 0 }}>{child.name}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{child.className} • {child.schoolName}</Text>
                  </div>
                </Space>
              )
            };
          })}
          optionRender={(option: any) => option.option}
        />
      </Space>
    </div>
  );
};

export default GlobalChildSelector;
