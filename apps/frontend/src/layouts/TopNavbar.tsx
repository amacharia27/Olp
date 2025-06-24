// apps/frontend/src/layouts/TopNavbar.tsx
import { Badge, Space, Tooltip, Avatar, Input, Button, Typography } from 'antd';
import { BellOutlined, MessageOutlined, SearchOutlined, MenuOutlined } from '@ant-design/icons';
import UserProfileDropdown from './UserProfileDropdown';
import { useNavigate } from 'react-router-dom';
import { CSSProperties, useState, useEffect } from 'react';

const { Text } = Typography;

// We'll handle positioning in AppLayout.tsx instead
const navbarStyles: CSSProperties = {
  width: '100%',
  padding: '10px 24px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '64px',
  transition: 'all 0.3s ease',
};

const logoStyles: CSSProperties = {
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#1890ff',
  marginRight: '24px',
  display: 'flex',
  alignItems: 'center',
};

const iconStyles: CSSProperties = {
  fontSize: '20px',
  cursor: 'pointer',
  color: '#595959',
  transition: 'color 0.3s ease',
  padding: '8px',
  borderRadius: '50%',
};

const TopNavbar = () => {
  const navigate = useNavigate();
  const [searchVisible, setSearchVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if window is mobile size on mount and when resized
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Mock unread counts. In a real app, this would come from an API or WebSocket.
  const unreadMessages = 1;
  const unreadNotifications = 3;

  return (
    <div style={navbarStyles}>
      {/* Left side - Logo and optional menu button for mobile */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button 
          type="text" 
          icon={<MenuOutlined />} 
          style={{ marginRight: '16px', display: isMobile ? 'block' : 'none' }}
        />
        <div style={logoStyles}>
          <Avatar 
            size="small" 
            style={{ marginRight: '8px', backgroundColor: '#1890ff' }}
          >OLP</Avatar>
          <Text strong>OLP Monitor</Text>
        </div>
        
        {/* Search input - visible on larger screens or when search is active */}
        {(!isMobile || searchVisible) && (
          <Input 
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            placeholder="Search..." 
            style={{ 
              width: searchVisible ? '240px' : '180px',
              transition: 'width 0.3s ease',
              marginRight: '16px',
            }} 
            bordered={false}
            onBlur={() => isMobile && setSearchVisible(false)}
          />
        )}
      </div>
      
      {/* Right side - Icons and user profile */}
      <div>
        <Space size="large" align="center">
          {/* Search icon for mobile */}
          {isMobile && !searchVisible && (
            <SearchOutlined 
              style={iconStyles} 
              onClick={() => setSearchVisible(true)}
            />
          )}
          
          <Tooltip title="Messages" placement="bottom">
            <Badge count={unreadMessages} size="small" offset={[-2, 2]}>
              <MessageOutlined
                style={iconStyles}
                onClick={() => navigate('/messages')}
              />
            </Badge>
          </Tooltip>
          
          <Tooltip title="Notifications" placement="bottom">
            <Badge count={unreadNotifications} size="small" offset={[-2, 2]}>
              <BellOutlined
                style={iconStyles}
                onClick={() => navigate('/notifications')}
              />
            </Badge>
          </Tooltip>

          <UserProfileDropdown />
        </Space>
      </div>
    </div>
  );
};

export default TopNavbar;