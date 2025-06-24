// apps/frontend/src/layouts/AppLayout.tsx
import { useState } from 'react';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import SidebarNav from './SidebarNav';
import TopNavbar from './TopNavbar';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import SidebarInfoPanel from './SidebarInfoPanel';

const { Content, Sider } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, colorBgElevated, borderRadiusLG },
  } = theme.useToken();

  // Calculate sidebar width for positioning
  const sidebarWidth = collapsed ? 80 : 200;

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Fixed Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: 'hidden', 
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1001, // Higher than TopNavbar to ensure it's above
          boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
        }}
        >
        {/* Top Part: Logo */}
        <div style={{
          height: '64px', // Match TopNavbar height
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          flexShrink: 0,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.2)',
            padding: collapsed ? '4px 8px' : '4px 16px',
            borderRadius: '6px',
            transition: 'all 0.2s',
          }}>
            {collapsed ? 'OLP' : 'OLP Monitor'}
          </div>
        </div>

        {/* Middle Part: Scrollable Menu */}
        <div style={{ flex: '1 1 auto', overflowY: 'auto', overflowX: 'hidden' }}>
          <SidebarNav />
        </div>

        {/* Bottom Part: Info Panel */}
        {!collapsed && (
          <div style={{ flexShrink: 0, paddingBottom: '16px' }}>
            <SidebarInfoPanel />
          </div>
        )}
      </Sider>

      {/* Main Layout */}
      <Layout style={{ 
        marginLeft: sidebarWidth, 
        transition: 'margin-left 0.2s',
      }}>
        {/* Fixed TopNavbar Container */}
        <div style={{ 
          position: 'fixed',
          top: 0,
          left: sidebarWidth,
          right: 0,
          zIndex: 1000,
          transition: 'left 0.2s',
          backgroundColor: colorBgElevated,
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          display: 'flex',
          height: '64px',
        }}>
          {/* Left side - Collapse Trigger */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '0 16px',
            borderRight: '1px solid rgba(0,0,0,0.03)',
          }}>
            {collapsed ? 
              <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} style={{ fontSize: '18px', cursor: 'pointer' }}/> : 
              <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} style={{ fontSize: '18px', cursor: 'pointer' }}/>
            }
          </div>
          
          {/* Right side - TopNavbar */}
          <div style={{ flex: 1 }}>
            <TopNavbar />
          </div>
        </div>

        {/* Page Content - with top padding to account for fixed navbar */}
        <Content style={{ 
          padding: '24px 16px', 
          marginTop: 64, // Add margin to account for fixed TopNavbar
          overflow: 'initial',
          minHeight: 'calc(100vh - 64px)', // viewport height - topbar
        }}>
          <div style={{ 
            padding: 24, 
            background: colorBgContainer, 
            borderRadius: borderRadiusLG,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;