// apps/frontend/src/features/messaging/components/ConversationList.tsx
import React from 'react';
import { List, Avatar, Badge, Input, Typography, Divider, Tag, Tooltip } from 'antd';
import { SearchOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import { Conversation, User } from '@/features/messaging/types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { Text } = Typography;

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
  getOtherUser: (conversation: Conversation) => User | undefined;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
  onSearch,
  searchQuery,
  getOtherUser,
}) => {
  // Format the timestamp to a relative time (e.g., "2 hours ago")
  const formatTimestamp = (timestamp: string) => {
    return dayjs(timestamp).fromNow();
  };

  // Truncate long messages for preview
  const truncateMessage = (message: string, maxLength: number = 40) => {
    return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
  };

  // Get the appropriate avatar for a conversation
  const getConversationAvatar = (conversation: Conversation) => {
    if (conversation.isGroup && conversation.groupAvatar) {
      return conversation.groupAvatar;
    }
    
    const otherUser = getOtherUser(conversation);
    return otherUser?.avatar;
  };

  // Get the display name for a conversation
  const getConversationName = (conversation: Conversation) => {
    if (conversation.isGroup && conversation.groupName) {
      return conversation.groupName;
    }
    
    const otherUser = getOtherUser(conversation);
    return otherUser?.name || 'Unknown User';
  };

  // Get the status indicator for a user
  const getUserStatusIndicator = (user?: User) => {
    if (!user) return null;
    
    let color;
    let title;
    
    switch (user.status) {
      case 'online':
        color = '#52c41a';
        title = 'Online';
        break;
      case 'away':
        color = '#faad14';
        title = 'Away';
        break;
      case 'offline':
      default:
        color = '#d9d9d9';
        title = user.lastActive ? `Last seen ${dayjs(user.lastActive).fromNow()}` : 'Offline';
    }
    
    return (
      <Tooltip title={title}>
        <Badge color={color} style={{ marginLeft: 4 }} />
      </Tooltip>
    );
  };

  // Get the role tag for a user
  const getUserRoleTag = (user?: User) => {
    if (!user) return null;
    
    let color;
    let text = user.role.charAt(0).toUpperCase() + user.role.slice(1);
    
    switch (user.role) {
      case 'teacher':
        color = 'blue';
        break;
      case 'student':
        color = 'green';
        break;
      case 'parent':
        color = 'purple';
        break;
      case 'headteacher':
        color = 'red';
        break;
      case 'deputy':
        color = 'orange';
        break;
      case 'admin':
        color = 'geekblue';
        break;
      default:
        color = 'default';
    }
    
    return <Tag color={color} style={{ marginLeft: 8, fontSize: '0.7rem' }}>{text}</Tag>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '16px 16px 8px' }}>
        <Input
          placeholder="Search conversations..."
          prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          allowClear
        />
      </div>
      
      <Divider style={{ margin: '0 0 8px 0' }} />
      
      <div style={{ flex: 1, overflow: 'auto' }}>
        {conversations.length === 0 ? (
          <div style={{ padding: 16, textAlign: 'center' }}>
            <Text type="secondary">No conversations found</Text>
          </div>
        ) : (
          <List
            dataSource={conversations}
            renderItem={(conversation) => {
              const otherUser = getOtherUser(conversation);
              
              return (
                <List.Item
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                  style={{
                    padding: '12px 16px',
                    cursor: 'pointer',
                    backgroundColor: selectedConversationId === conversation.id ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
                    borderLeft: selectedConversationId === conversation.id ? '3px solid #1890ff' : '3px solid transparent',
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge count={conversation.unreadCount} size="small">
                        <Avatar 
                          src={getConversationAvatar(conversation)} 
                          icon={conversation.isGroup ? <TeamOutlined /> : <UserOutlined />}
                          size="large"
                        />
                      </Badge>
                    }
                    title={
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Text strong={conversation.unreadCount > 0}>
                          {getConversationName(conversation)}
                        </Text>
                        {!conversation.isGroup && getUserStatusIndicator(otherUser)}
                        {!conversation.isGroup && getUserRoleTag(otherUser)}
                      </div>
                    }
                    description={
                      <div>
                        <Text
                          type="secondary"
                          style={{ 
                            fontSize: '0.9rem', 
                            fontWeight: conversation.unreadCount > 0 ? 'bold' : 'normal' 
                          }}
                        >
                          {truncateMessage(conversation.lastMessage)}
                        </Text>
                      </div>
                    }
                  />
                  <div style={{ fontSize: '0.8rem', color: 'rgba(0, 0, 0, 0.45)' }}>
                    {formatTimestamp(conversation.lastMessageTimestamp)}
                  </div>
                </List.Item>
              );
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ConversationList;
