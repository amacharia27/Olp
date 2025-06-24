// apps/frontend/src/layouts/UserProfileDropdown.tsx
import { Avatar, Dropdown, MenuProps, Space, Typography, } from 'antd';
import { LogoutOutlined, ProfileOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';

const UserProfileDropdown = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'My Profile',
      icon: <ProfileOutlined />,
      onClick: () => navigate('/profile'),
    },
    {
      key: '2',
      label: 'Settings',
      icon: <SettingOutlined />,
      onClick: () => navigate('/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: 'Logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  if (!user) return null;

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Typography.Text style={{ color: '#333' }}>
            {user.firstName} {user.lastName}
          </Typography.Text>
        </Space>
      </a>
    </Dropdown>
  );
};

export default UserProfileDropdown;