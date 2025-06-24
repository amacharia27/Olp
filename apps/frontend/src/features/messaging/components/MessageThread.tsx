// apps/frontend/src/features/messaging/components/MessageThread.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Typography, Divider, theme, Input, Button } from 'antd';
import { UserOutlined, SendOutlined } from '@ant-design/icons';
import { Conversation, Message, User } from '@/features/messaging/types';
import dayjs from 'dayjs';

const { Text, Title } = Typography;

interface MessageThreadProps {
  conversation: Conversation;
  currentUserId: string;
  onSendMessage: (content: string) => void;
  otherUser?: User;
}

const MessageThread: React.FC<MessageThreadProps> = ({
  conversation,
  currentUserId,
  onSendMessage,
  otherUser,
}) => {
  const { token } = theme.useToken();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Format the timestamp to a readable time
  const formatMessageTime = (timestamp: string) => {
    return dayjs(timestamp).format('h:mm A');
  };

  // Format the date for date separators
  const formatMessageDate = (timestamp: string) => {
    const date = dayjs(timestamp);
    const today = dayjs().startOf('day');
    const yesterday = dayjs().subtract(1, 'day').startOf('day');

    if (date.isSame(today, 'day')) {
      return 'Today';
    } else if (date.isSame(yesterday, 'day')) {
      return 'Yesterday';
    } else {
      return date.format('MMMM D, YYYY');
    }
  };

  // Group messages by date
  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { date: string; messages: Message[] }[] = [];
    
    messages.forEach(message => {
      const messageDate = dayjs(message.timestamp).startOf('day').format('YYYY-MM-DD');
      const existingGroup = groups.find(group => group.date === messageDate);
      
      if (existingGroup) {
        existingGroup.messages.push(message);
      } else {
        groups.push({
          date: messageDate,
          messages: [message],
        });
      }
    });
    
    return groups;
  };

  // Get the conversation title
  const getConversationTitle = () => {
    if (conversation.isGroup && conversation.groupName) {
      return conversation.groupName;
    }
    return otherUser?.name || 'Unknown User';
  };

  // Get the conversation subtitle
  const getConversationSubtitle = () => {
    if (conversation.isGroup) {
      return `${conversation.participantIds.length} participants`;
    }
    
    if (otherUser?.status === 'online') {
      return 'Online';
    } else if (otherUser?.lastActive) {
      return `Last seen ${dayjs(otherUser.lastActive).fromNow()}`;
    }
    
    return '';
  };

  // Simulate typing indicator (in a real app, this would come from a WebSocket)
  useEffect(() => {
    if (conversation.messages.length > 0 && 
        conversation.messages[conversation.messages.length - 1].senderId === currentUserId) {
      const timeout = setTimeout(() => {
        setIsTyping(Math.random() > 0.7); // Randomly show typing indicator
        
        if (isTyping) {
          setTimeout(() => setIsTyping(false), 3000);
        }
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
    
    return () => {};
  }, [conversation.messages, currentUserId]);

  const messageGroups = groupMessagesByDate(conversation.messages);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Conversation header */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: `1px solid ${token.colorBorderSecondary}`,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar
          src={conversation.isGroup ? conversation.groupAvatar : otherUser?.avatar}
          icon={<UserOutlined />}
          size="large"
        />
        <div style={{ marginLeft: 12, flex: 1 }}>
          <Title level={5} style={{ margin: 0 }}>
            {getConversationTitle()}
          </Title>
          <Text type="secondary" style={{ fontSize: '0.8rem' }}>
            {getConversationSubtitle()}
          </Text>
        </div>
      </div>

      {/* Messages container */}
      <div
        style={{
          flex: 1,
          padding: '16px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messageGroups.map((group) => (
          <div key={group.date}>
            {/* Date separator */}
            <div
              style={{
                textAlign: 'center',
                margin: '16px 0',
                position: 'relative',
              }}
            >
              <Divider plain>
                <Text type="secondary">{formatMessageDate(group.messages[0].timestamp)}</Text>
              </Divider>
            </div>

            {/* Messages for this date */}
            {group.messages.map((message, messageIndex) => {
              const isCurrentUser = message.senderId === currentUserId;
              const showAvatar = messageIndex === 0 || 
                group.messages[messageIndex - 1].senderId !== message.senderId;
              
              return (
                <div
                  key={message.id}
                  style={{
                    display: 'flex',
                    justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                    marginBottom: 8,
                  }}
                >
                  {!isCurrentUser && showAvatar && (
                    <Avatar
                      src={otherUser?.avatar}
                      icon={<UserOutlined />}
                      size="small"
                      style={{ marginRight: 8, alignSelf: 'flex-end' }}
                    />
                  )}
                  
                  <div
                    style={{
                      maxWidth: '70%',
                      padding: '8px 12px',
                      borderRadius: 8,
                      backgroundColor: isCurrentUser ? token.colorPrimary : token.colorBgElevated,
                      color: isCurrentUser ? token.colorTextLightSolid : token.colorText,
                      position: 'relative',
                    }}
                  >
                    <div>{message.content}</div>
                    <div
                      style={{
                        fontSize: '0.7rem',
                        marginTop: 4,
                        textAlign: 'right',
                        opacity: 0.7,
                      }}
                    >
                      {formatMessageTime(message.timestamp)}
                      {isCurrentUser && (
                        <span style={{ marginLeft: 4 }}>
                          {message.status === 'read' ? '✓✓' : '✓'}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {isCurrentUser && showAvatar && (
                    <Avatar
                      src="https://i.pravatar.cc/150?img=1" // Current user avatar
                      size="small"
                      style={{ marginLeft: 8, alignSelf: 'flex-end' }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: 'flex', marginBottom: 16 }}>
            <Avatar
              src={otherUser?.avatar}
              icon={<UserOutlined />}
              size="small"
              style={{ marginRight: 8 }}
            />
            <div
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                backgroundColor: token.colorBgElevated,
                color: token.colorText,
              }}
            >
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div style={{ padding: '12px 16px', borderTop: `1px solid ${token.colorBorderSecondary}` }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input.TextArea
            placeholder="Type a message..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            style={{ flex: 1, borderRadius: 20 }}
            value={isTyping ? '' : ''}
            onChange={() => {}}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                const target = e.target as HTMLTextAreaElement;
                if (target.value.trim()) {
                  onSendMessage(target.value.trim());
                  target.value = '';
                }
              }
            }}
          />
          <Button
            type="primary"
            shape="circle"
            icon={<SendOutlined />}
            style={{ marginLeft: 8 }}
            onClick={() => {
              const textarea = document.querySelector('textarea');
              if (textarea && textarea.value.trim()) {
                onSendMessage(textarea.value.trim());
                textarea.value = '';
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageThread;
