// apps/frontend/src/features/messaging/components/MessagingLayout.tsx
import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import ConversationList from '@/features/messaging/components/ConversationList';
import MessageThread from '@/features/messaging/components/MessageThread';
import { Conversation, Message, User } from '@/features/messaging/types';
import { mockConversations, mockUsers } from '@/features/messaging/mockData';

const { Sider, Content } = Layout;

const MessagingLayout: React.FC = () => {
  const { token } = theme.useToken();
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
    conversations.length > 0 ? conversations[0].id : null
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileDrawerVisible, setIsMobileDrawerVisible] = useState<boolean>(false);

  // Get the selected conversation
  const selectedConversation = conversations.find(conv => conv.id === selectedConversationId) || null;

  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => {
    const otherUser = mockUsers.find((user: User) => user.id === conversation.participantIds.find((id: string) => id !== 'current-user'));
    return otherUser && 
      (otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  // Handle sending a new message
  const handleSendMessage = (content: string) => {
    if (!selectedConversationId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversationId,
      senderId: 'current-user',
      content,
      timestamp: new Date().toISOString(),
      status: 'sent',
      isRead: false
    };

    // Update the conversation with the new message
    setConversations(prevConversations => 
      prevConversations.map(conv => {
        if (conv.id === selectedConversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: content,
            lastMessageTimestamp: newMessage.timestamp,
            unreadCount: 0 // Reset unread count for current user's messages
          };
        }
        return conv;
      })
    );
  };

  // Handle selecting a conversation
  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    
    // Mark all messages as read when selecting a conversation
    setConversations(prevConversations => 
      prevConversations.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            unreadCount: 0,
            messages: conv.messages.map((msg: Message) => ({
              ...msg,
              isRead: true
            }))
          };
        }
        return conv;
      })
    );

    // Close mobile drawer if open
    if (isMobileDrawerVisible) {
      setIsMobileDrawerVisible(false);
    }
  };

  // Get the other user in the conversation
  const getOtherUser = (conversation: Conversation): User | undefined => {
    const otherUserId = conversation.participantIds.find((id: string) => id !== 'current-user');
    return mockUsers.find((user: User) => user.id === otherUserId);
  };

  return (
    <Layout style={{ height: '100%', background: token.colorBgContainer }}>
      <Sider
        width={320}
        style={{
          background: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorderSecondary}`,
          height: '100%',
          overflow: 'auto',
          position: 'relative',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        collapsed={false}
        collapsible
      >
        <ConversationList
          conversations={filteredConversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={handleSelectConversation}
          onSearch={setSearchQuery}
          searchQuery={searchQuery}
          getOtherUser={getOtherUser}
        />
      </Sider>
      <Content style={{ height: '100%', position: 'relative' }}>
        {selectedConversation ? (
          <MessageThread
            conversation={selectedConversation}
            currentUserId="current-user"
            onSendMessage={handleSendMessage}
            otherUser={getOtherUser(selectedConversation)}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              background: token.colorBgContainer,
              color: token.colorTextSecondary,
              fontSize: token.fontSizeLG,
            }}
          >
            Select a conversation to start messaging
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default MessagingLayout;
