// apps/frontend/src/pages/NotificationsPage.tsx
import { useState } from 'react';
import { 
  List, Avatar, Typography, Card, Button, Tabs, Badge, 
  Empty, Dropdown, Space, Tag, message, Tooltip, Checkbox 
} from 'antd';
import { 
  BellOutlined, CheckCircleOutlined, ClockCircleOutlined, 
  DeleteOutlined, WarningOutlined, 
  MoreOutlined, CheckOutlined, 
  CalendarOutlined, BookOutlined, 
  BulbOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

// Mock notification data with different types and read status
const notificationsData = [
  { 
    id: 1,
    title: 'New Grade Posted', 
    description: 'Your Math CAT 1 has been graded. You scored 85%.', 
    date: '2 hours ago',
    type: 'academic',
    read: false,
    priority: 'high'
  },
  { 
    id: 2,
    title: 'Library Book Overdue', 
    description: 'Your copy of "A Doll\'s House" is overdue by 2 days. Please return it to avoid penalties.', 
    date: '1 day ago',
    type: 'alert',
    read: false,
    priority: 'medium'
  },
  { 
    id: 3,
    title: 'School Event', 
    description: 'The annual sports day is scheduled for next Friday. Register by Wednesday to participate.', 
    date: '3 days ago',
    type: 'event',
    read: true,
    priority: 'low'
  },
  { 
    id: 4,
    title: 'Assignment Deadline Extended', 
    description: 'The deadline for your Physics assignment has been extended to next Monday.', 
    date: '4 days ago',
    type: 'academic',
    read: true,
    priority: 'medium'
  },
  { 
    id: 5,
    title: 'New Announcement from Principal', 
    description: 'There will be a special assembly tomorrow morning at 8:00 AM.', 
    date: '5 days ago',
    type: 'announcement',
    read: true,
    priority: 'high'
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  
  // Count unread notifications
  const unreadCount = notifications.filter(item => !item.read).length;
  
  // Filter notifications based on active tab
  const getFilteredNotifications = () => {
    if (activeTab === 'all') return notifications;
    if (activeTab === 'unread') return notifications.filter(item => !item.read);
    return notifications.filter(item => item.type === activeTab);
  };
  
  // Mark notification as read
  const markAsRead = (id: number) => {
    const updatedNotifications = notifications.map(item => 
      item.id === id ? { ...item, read: true } : item
    );
    setNotifications(updatedNotifications);
    message.success('Notification marked as read');
  };
  
  // Mark all as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(item => ({ ...item, read: true }));
    setNotifications(updatedNotifications);
    message.success('All notifications marked as read');
  };
  
  // Delete notification
  const deleteNotification = (id: number) => {
    const updatedNotifications = notifications.filter(item => item.id !== id);
    setNotifications(updatedNotifications);
    message.success('Notification deleted');
  };
  
  // Delete selected notifications
  const deleteSelected = () => {
    if (selectedItems.length === 0) {
      message.info('No notifications selected');
      return;
    }
    const updatedNotifications = notifications.filter(item => !selectedItems.includes(item.id));
    setNotifications(updatedNotifications);
    setSelectedItems([]);
    message.success(`${selectedItems.length} notification(s) deleted`);
  };
  
  // Toggle selection of an item
  const toggleSelection = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  
  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'academic':
        return <BookOutlined />;
      case 'alert':
        return <WarningOutlined />;
      case 'event':
        return <CalendarOutlined />;
      case 'announcement':
        return <BulbOutlined />;
      default:
        return <BellOutlined />;
    }
  };
  
  // Get color based on notification priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'blue';
    }
  };
  
  // Get dropdown menu for each notification
  const getNotificationMenu = (item: any) => [
    {
      key: '1',
      label: (
        <Button 
          type="text" 
          icon={<CheckOutlined />} 
          onClick={() => markAsRead(item.id)}
          disabled={item.read}
        >
          Mark as read
        </Button>
      ),
    },
    {
      key: '2',
      label: (
        <Button 
          type="text" 
          icon={<DeleteOutlined />} 
          danger 
          onClick={() => deleteNotification(item.id)}
        >
          Delete
        </Button>
      ),
    },
  ];
  
  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2}>
          Notifications
          {unreadCount > 0 && (
            <Badge count={unreadCount} style={{ marginLeft: 8 }} />
          )}
        </Title>
        
        <Space>
          {selectedItems.length > 0 && (
            <Button 
              icon={<DeleteOutlined />} 
              onClick={deleteSelected}
              danger
            >
              Delete Selected ({selectedItems.length})
            </Button>
          )}
          <Button 
            icon={<CheckCircleOutlined />} 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            Mark All as Read
          </Button>
        </Space>
      </div>
      
      <Card bordered={false}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'all',
              label: (
                <span>
                  <BellOutlined /> All
                </span>
              ),
            },
            {
              key: 'unread',
              label: (
                <span>
                  <Badge count={unreadCount} size="small" offset={[5, 0]}>
                    <ClockCircleOutlined /> Unread
                  </Badge>
                </span>
              ),
            },
            {
              key: 'academic',
              label: (
                <span>
                  <BookOutlined /> Academic
                </span>
              ),
            },
            {
              key: 'event',
              label: (
                <span>
                  <CalendarOutlined /> Events
                </span>
              ),
            },
            {
              key: 'alert',
              label: (
                <span>
                  <WarningOutlined /> Alerts
                </span>
              ),
            },
          ]}
        />
        
        <List
          itemLayout="horizontal"
          dataSource={getFilteredNotifications()}
          locale={{ emptyText: <Empty description="No notifications" /> }}
          renderItem={item => (
            <List.Item
              style={{ 
                backgroundColor: item.read ? 'transparent' : '#f0f7ff',
                padding: '12px 16px',
                borderRadius: 8,
                marginBottom: 8
              }}
              actions={[
                <Dropdown menu={{ items: getNotificationMenu(item) }} placement="bottomRight">
                  <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
              ]}
            >
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  width: '100%',
                  cursor: 'pointer'
                }}
                onClick={() => toggleSelection(item.id)}
              >
                <div style={{ marginRight: 8, marginTop: 4 }}>
                  <Checkbox 
                    checked={selectedItems.includes(item.id)} 
                    onChange={() => toggleSelection(item.id)}
                  />
                </div>
                
                <List.Item.Meta
                  avatar={
                    <Avatar 
                      icon={getNotificationIcon(item.type)} 
                      style={{ 
                        backgroundColor: item.read ? '#d9d9d9' : getPriorityColor(item.priority) 
                      }} 
                    />
                  }
                  title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Text strong={!item.read}>{item.title}</Text>
                      <Tag 
                        color={getPriorityColor(item.priority)} 
                        style={{ marginLeft: 8, fontSize: '0.8em' }}
                      >
                        {item.priority}
                      </Tag>
                    </div>
                  }
                  description={
                    <>
                      <Paragraph style={{ marginBottom: 4 }}>{item.description}</Paragraph>
                      <Text type="secondary" style={{ fontSize: '0.8em' }}>
                        <Tooltip title={new Date().toLocaleString()}>
                          {item.date}
                        </Tooltip>
                      </Text>
                    </>
                  }
                />
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default NotificationsPage;