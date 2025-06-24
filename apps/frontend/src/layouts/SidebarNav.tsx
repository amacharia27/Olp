// apps/frontend/src/layouts/SidebarNav.tsx
import { Menu, Typography, Divider, Badge, Avatar } from 'antd';
import type { MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { navigationConfig, NavItem } from '@/routes/navigation.config';
import { UserRole } from '@olp-monitor/shared-types';
import { useEffect, useState, CSSProperties } from 'react';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

// Custom styles for a more modern look
const menuStyles: CSSProperties = {
  background: 'transparent',
  border: 'none',
};

// Use Ant Design's MenuItem type with children support
type MenuItem = Required<MenuProps>['items'][number] & {
  path?: string;
  children?: MenuItem[];
  icon?: React.ReactNode;
};

const SidebarNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();

  const [current, setCurrent] = useState(location.pathname);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  
  // Get the navigation items for the current user's role
  const userRole = user?.role as UserRole;
  const menuItems = userRole ? navigationConfig[userRole] : [];

  useEffect(() => {
    // This ensures the menu highlights the correct item even on page refresh
    if (!menuItems || menuItems.length === 0) return;
    
    const currentPath = location.pathname;
    
    // Try to find an exact match first
    let foundItem = menuItems.find(item => item.path === currentPath);
    
    // If no exact match, look for items with children
    if (!foundItem) {
      for (const item of menuItems) {
        if (item.children) {
          const childMatch = item.children.find(child => child.path === currentPath);
          if (childMatch) {
            foundItem = childMatch;
            // Open the parent menu
            setOpenKeys([item.key]);
            break;
          }
        }
      }
    }
    
    // If still no match, check if we're on the root path and set appropriate dashboard
    if (!foundItem && currentPath === '/') {
      // Find the dashboard item for the current user role
      foundItem = menuItems.find(item => item.path.includes('dashboard'));
    }
    
    if (foundItem) {
      setCurrent(foundItem.key);
    } else {
      // Fallback to first item
      setCurrent(menuItems[0]?.key || '');
    }
  }, [location, menuItems]);
  
  if (!user || !user.role) {
    return null; // Don't render a menu if we don't know the user's role
  }

  // Group menu items by category for better organization
  const mainNavItems = menuItems?.length ? menuItems.filter(item => 
    !item.key.includes('messages') && 
    !item.key.includes('settings') && 
    !item.key.includes('profile') &&
    !item.key.includes('notifications')
  ) : [];
  
  const utilityNavItems = menuItems?.length ? menuItems.filter(item => 
    item.key.includes('messages') || 
    item.key.includes('settings') || 
    item.key.includes('profile') ||
    item.key.includes('notifications')
  ) : [];

  const onClick = (e: { key: string }) => {
    if (!e?.key) return;
    
    // Find the nav item that was clicked
    const allItems = [...mainNavItems, ...utilityNavItems];
    const findItem = (items: NavItem[]): NavItem | null => {
      if (!items?.length) return null;
      
      for (const item of items) {
        if (item.key === e.key) return item;
        if (item.children?.length) {
          const found = findItem(item.children);
          if (found) return found;
        }
      }
      return null;
    };
    
    const clickedItem = findItem(allItems);
    if (clickedItem?.path) {
      // Ensure we're using the path exactly as defined in the navigation config
      navigate(clickedItem.path);
      setCurrent(e.key);
    }
  };

  // Handle submenu open/close
  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  // Transform NavItem[] to MenuItem[] with enhanced UI elements
  const transformMenuItems = (items: NavItem[]): MenuItem[] => {
    if (!items?.length) return [];
    
    return items.map(item => {
      if (!item) return null;
      
      // Enhanced menu item with modern styling
      const menuItem: MenuItem = {
        key: item.key || '',
        icon: <item.icon />,
        path: item.path,
        label: (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '4px 0',
          }}>
            <span style={{ 
              fontWeight: current === item.key ? 500 : 'normal',
              transition: 'all 0.2s'
            }}>
              {item.label || ''}
            </span>
            
            {/* Add badges for specific items */}
            {item.key?.includes('messages') && (
              <Badge count={3} size="small" />
            )}
            {item.key?.includes('notifications') && (
              <Badge count={5} size="small" />
            )}
          </div>
        )
      };
      
      // Process children recursively
      if (item.children && item.children.length > 0) {
        menuItem.children = transformMenuItems(item.children);
      }
      
      return menuItem;
    }).filter(Boolean) as MenuItem[];
  };

  const enhancedMainNavItems = transformMenuItems(mainNavItems);
  const enhancedUtilityNavItems = transformMenuItems(utilityNavItems);

  return (
    <div className="sidebar-menu-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Main Navigation */}
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: '8px' }}>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[current]}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={onClick}
          items={enhancedMainNavItems}
          style={menuStyles}
          className="modern-sidebar-menu"
        />
      </div>
      
      {/* Divider between main and utility navigation */}
      {utilityNavItems.length > 0 && (
        <div style={{ marginTop: 'auto' }}>
          <Divider style={{ margin: '8px 16px', borderColor: 'rgba(255,255,255,0.1)' }} />
          <div style={{ padding: '0 16px 8px' }}>
            <Text type="secondary" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Account
            </Text>
          </div>
          
          {/* Utility Navigation */}
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[current]}
            onClick={onClick}
            items={enhancedUtilityNavItems}
            style={menuStyles}
            className="modern-sidebar-menu"
          />
          
          {/* User Profile Section */}
          <div style={{ 
            margin: '16px', 
            padding: '12px', 
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}>
            <Avatar size="small" icon={<UserOutlined />} style={{ marginRight: '8px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>
                {user?.email ? user.email.split('@')[0] : 'User'}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px' }}>
                {user?.role || 'Guest'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarNav;