// apps/frontend/src/features/student/pages/MessagesPage.tsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  Layout, 
  Button, 
  Input, 
  Avatar, 
  List, 
  Badge, 
  Typography, 
  Card, 
  Space, 
  Row, 
  Col, 
  Tabs, 
  Empty, 
  Divider, 
  Form, 
  Modal,
  Select
} from 'antd';
import { 
  SendOutlined, 
  UserOutlined, 
  SearchOutlined, 
  PlusOutlined, 
  DeleteOutlined, 
  MoreOutlined, 
  FileImageOutlined, 
  SmileOutlined, 
  PaperClipOutlined, 
  AudioOutlined, 
  StarOutlined, 
  StarFilled, 
  EllipsisOutlined, 
  MessageOutlined, 
  CloseOutlined
} from '@ant-design/icons';
import './MessagesPage.css';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

// --- MOCK DATA ---
const mockConversations = [
  { 
    id: '1', 
    participantName: 'Dr. Sarah Johnson', 
    role: 'Academic Advisor',
    lastMessage: 'Let me know if you need any help with your course selection.', 
    timestamp: '10:30 AM', 
    unreadCount: 0, 
    avatar: <UserOutlined />, 
    status: 'online',
    favorite: true
  },
  { 
    id: '2', 
    participantName: 'Ms. Wanjiku', 
    role: 'Mathematics Teacher',
    lastMessage: 'Great work on your last assignment!', 
    timestamp: 'Yesterday', 
    unreadCount: 0, 
    avatar: <UserOutlined style={{ backgroundColor: '#52c41a', color: '#fff' }} />,
    status: 'offline',
    favorite: false
  },
  { 
    id: '3', 
    participantName: 'Library Helpdesk', 
    role: 'Support Staff',
    lastMessage: 'The book you requested is available.', 
    timestamp: '3 days ago', 
    unreadCount: 0, 
    avatar: <MessageOutlined style={{ backgroundColor: '#722ed1', color: '#fff' }} />,
    status: 'away',
    favorite: false
  },
  { 
    id: '4', 
    participantName: 'Principal Office', 
    role: 'Administration',
    lastMessage: 'Please check the notice board for upcoming events.', 
    timestamp: 'Jun 20', 
    unreadCount: 2, 
    avatar: <UserOutlined style={{ backgroundColor: '#fa8c16', color: '#fff' }} />,
    status: 'online',
    favorite: true
  },
  { 
    id: '5', 
    participantName: 'School Counselor', 
    role: 'Student Support',
    lastMessage: 'Let me know if you need to schedule another session.', 
    timestamp: 'Jun 18', 
    unreadCount: 0, 
    avatar: <UserOutlined style={{ backgroundColor: '#eb2f96', color: '#fff' }} />,
    status: 'offline',
    favorite: false
  },
];

const mockMessages: Record<string, any[]> = {
  '1': [
    { id: 'm1', text: 'Good morning Mr. Otieno, I have a question about the Science homework.', sender: 'me', timestamp: '10:28 AM', read: true, attachments: [] },
    { id: 'm2', text: 'Hello. Of course, what is your question?', sender: 'them', timestamp: '10:29 AM', read: true, attachments: [] },
    { id: 'm3', text: 'Can I get an extension on the deadline?', sender: 'me', timestamp: '10:29 AM', read: true, attachments: [] },
    { id: 'm4', text: 'Yes, please submit it by Friday.', sender: 'them', timestamp: '10:30 AM', read: false, attachments: [] },
  ],
  '2': [
    { id: 'm5', text: 'Great work on your last assignment!', sender: 'them', timestamp: 'Yesterday', read: true, attachments: [] },
    { id: 'm6', text: 'Thank you, Ms. Wanjiku. I spent a lot of time on it.', sender: 'me', timestamp: 'Yesterday', read: true, attachments: [] },
    { id: 'm7', text: 'I can tell. Your solution to problem 3 was particularly creative.', sender: 'them', timestamp: 'Yesterday', read: true, attachments: [] },
  ],
  '3': [
    { id: 'm8', text: 'Hello, I wanted to check if "To Kill a Mockingbird" is available?', sender: 'me', timestamp: '3 days ago', read: true, attachments: [] },
    { id: 'm9', text: 'Let me check our system...', sender: 'them', timestamp: '3 days ago', read: true, attachments: [] },
    { id: 'm10', text: 'The book you requested is available. You can pick it up anytime during library hours.', sender: 'them', timestamp: '3 days ago', read: true, attachments: [] },
  ],
  '4': [
    { id: 'm11', text: 'All students please note that the school calendar for next term is now available.', sender: 'them', timestamp: 'Jun 20', read: false, attachments: [{ name: 'School_Calendar.pdf', size: '1.2 MB', type: 'pdf' }] },
    { id: 'm12', text: 'Please check the notice board for upcoming events.', sender: 'them', timestamp: 'Jun 20', read: false, attachments: [] },
  ],
  '5': [
    { id: 'm13', text: 'How are you doing with your exam preparation?', sender: 'them', timestamp: 'Jun 18', read: true, attachments: [] },
    { id: 'm14', text: "I'm feeling a bit overwhelmed with all the subjects.", sender: 'me', timestamp: 'Jun 18', read: true, attachments: [] },
    { id: 'm15', text: "That's understandable. Let's schedule a session to discuss study strategies.", sender: 'them', timestamp: 'Jun 18', read: true, attachments: [] },
    { id: 'm16', text: 'Let me know if you need to schedule another session.', sender: 'them', timestamp: 'Jun 18', read: true, attachments: [] },
  ],
};
// --- END OF MOCK DATA ---

// Define interfaces for better type safety
interface Conversation {
  id: string;
  participantName: string;
  role: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar: React.ReactNode;
  status: 'online' | 'offline' | 'away';
  favorite: boolean;
}

interface MessageAttachment {
  name: string;
  size: string;
  type: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
  read: boolean;
  attachments: MessageAttachment[];
}

const MessagesPage = () => {
  // State for conversations and messages
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations as Conversation[]);
  const [selectedConversationId, setSelectedConversationId] = useState<string>('1');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [filterBy, setFilterBy] = useState<'all' | 'unread' | 'favorites'>('all');
  
  // Refs
  const messageEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  useEffect(() => {
    // "Fetch" messages for the selected conversation
    if (selectedConversationId) {
      setMessages(mockMessages[selectedConversationId] as Message[] || []);
    } else {
      setMessages([]);
    }
  }, [selectedConversationId]);

  // Filter conversations based on search query and filter type
  const filteredConversations = conversations.filter(conversation => {
    // Apply search filter if search query exists
    const matchesSearch = searchQuery
      ? conversation.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    // Apply type filter
    let matchesFilter = true;
    if (filterBy === 'unread') {
      matchesFilter = conversation.unreadCount > 0;
    } else if (filterBy === 'favorites') {
      matchesFilter = conversation.favorite;
    }
    
    return matchesSearch && matchesFilter;
  });

  // Handle selecting a conversation
  const handleSelectConversation = (id: string) => {
    setSelectedConversationId(id);
    // Mark messages as read
    setConversations(conversations.map(c => c.id === id ? { ...c, unreadCount: 0 } : c));
  };
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversationId) return;

    const newMsg: Message = {
      id: `m${Date.now()}`,
      text: newMessage,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
      attachments: []
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');
    // Update last message in conversation list
    setConversations(conversations.map(c => 
      c.id === selectedConversationId 
        ? { ...c, lastMessage: newMessage, timestamp: 'Just now' } 
        : c
    ));
    // TODO: In a real app, this would be an API call and/or a Socket.IO emit
  };
  
  // Handle toggling favorite status
  const handleToggleFavorite = (id: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering conversation selection
    setConversations(conversations.map(c => 
      c.id === id ? { ...c, favorite: !c.favorite } : c
    ));
    // message.success(`${conversations.find(c => c.id === id)?.favorite ? 'Removed from' : 'Added to'} favorites`);
  };
  
  // Handle deleting a conversation
  const handleDeleteConversation = (id: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation(); // Prevent triggering conversation selection if event exists
    setConversations(conversations.filter(c => c.id !== id));
    if (selectedConversationId === id) {
      setSelectedConversationId(conversations[0]?.id || '');
    }
    // message.success('Conversation deleted');
  };
  
  // Handle attachment button click
  const handleAttachmentClick = () => {
    setShowAttachmentMenu(!showAttachmentMenu);
  };
  
  // Handle emoji picker toggle
  const handleEmojiPickerToggle = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  
  // Handle new conversation button click
  const handleNewConversation = () => {
    setShowNewMessageModal(true);
  };
  
  // Handle search toggle
  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
    if (!isSearching) {
      setSearchQuery('');
    }
  };

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  return (
    <Layout className="messages-layout">
      <Row gutter={[16, 16]} className="messages-header">
        <Col span={24}>
          <Card>
            <div className="messages-title-bar">
              <Title level={2}>Messages</Title>
              <div className="messages-actions">
                <Button 
                  type={isSearching ? "primary" : "default"}
                  icon={isSearching ? <CloseOutlined /> : <SearchOutlined />} 
                  onClick={handleSearchToggle}
                  title="Search messages"
                />
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={handleNewConversation}
                  title="New message"
                />
              </div>
            </div>
            
            {isSearching && (
              <div className="search-bar">
                <Input
                  placeholder="Search conversations..."
                  prefix={<SearchOutlined />}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  allowClear
                />
              </div>
            )}
            
            <Tabs 
              defaultActiveKey="all" 
              onChange={(key) => setFilterBy(key as 'all' | 'unread' | 'favorites')}
              className="message-tabs"
            >
              <TabPane tab="All" key="all" />
              <TabPane 
                tab={<Badge count={conversations.filter(c => c.unreadCount > 0).length} overflowCount={99}>Unread</Badge>} 
                key="unread" 
              />
              <TabPane 
                tab={<span><StarFilled style={{ color: '#faad14' }} /> Favorites</span>} 
                key="favorites" 
              />
            </Tabs>
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 0]} className="messages-content">
        <Col xs={24} sm={24} md={8} lg={8} xl={6} className="conversations-column">
          <Card className="conversations-card" bodyStyle={{ padding: 0, height: '100%' }}>
            {filteredConversations.length > 0 ? (
              <List
                className="conversation-list"
                itemLayout="horizontal"
                dataSource={filteredConversations}
                renderItem={item => (
                  <List.Item
                    onClick={() => handleSelectConversation(item.id)}
                    className={selectedConversationId === item.id ? 'selected' : ''}
                    actions={[
                      <span title={item.favorite ? "Remove from favorites" : "Add to favorites"}>
                        {item.favorite ? 
                          <StarFilled 
                            onClick={(e) => handleToggleFavorite(item.id, e)} 
                            style={{ color: '#faad14' }} 
                          /> : 
                          <StarOutlined 
                            onClick={(e) => handleToggleFavorite(item.id, e)} 
                          />
                        }
                      </span>,
                      <Button
                        type="text"
                        icon={<EllipsisOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteConversation(item.id);
                        }}
                        title="Delete conversation"
                      />
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        <Badge dot={item.status === 'online'} color="green" offset={[-4, 32]}>
                          <Avatar icon={item.avatar} />
                        </Badge>
                      }
                      title={
                        <div className="conversation-title">
                          <Text strong>{item.participantName}</Text>
                          <Text type="secondary" className="conversation-time">{item.timestamp}</Text>
                        </div>
                      }
                      description={
                        <div className="conversation-description">
                          <Text ellipsis type="secondary">{item.lastMessage}</Text>
                          {item.unreadCount > 0 && (
                            <Badge count={item.unreadCount} style={{ backgroundColor: '#1890ff' }} />
                          )}
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty 
                description="No conversations found" 
                image={Empty.PRESENTED_IMAGE_SIMPLE} 
                className="empty-conversations"
              />
            )}
          </Card>
        </Col>
        
        <Col xs={24} sm={24} md={16} lg={16} xl={18} className="chat-column">
          <Card className="chat-card" bodyStyle={{ padding: 0, height: '100%' }}>
            {selectedConversation ? (
              <>
                <div className="chat-window-header">
                  <div className="chat-participant-info">
                    <Avatar icon={selectedConversation.avatar} />
                    <div>
                      <Text strong>{selectedConversation.participantName}</Text>
                      <div>
                        <Text type="secondary">{selectedConversation.role}</Text>
                        {selectedConversation.status === 'online' && (
                          <Badge status="success" text="Online" style={{ marginLeft: 8 }} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button 
                      icon={<SearchOutlined />} 
                      title="Search in conversation"
                    />
                    <Button 
                      icon={<DeleteOutlined />} 
                      onClick={() => {
                        if (selectedConversationId) handleDeleteConversation(selectedConversationId);
                      }}
                      title="Delete conversation"
                    />
                    <Button 
                      icon={<MoreOutlined />} 
                      title="More actions"
                    />
                  </div>
                </div>
                
                <Divider style={{ margin: '0 0 8px 0' }} />
                
                <div className="message-container">
                  {messages.length > 0 ? (
                    messages.map(msg => (
                      <div key={msg.id} className={`message-item ${msg.sender === 'me' ? 'message-sent' : 'message-received'}`}>
                        {msg.sender !== 'me' && (
                          <Avatar 
                            icon={selectedConversation.avatar} 
                            size="small" 
                            className="message-avatar"
                          />
                        )}
                        <div className={`message-bubble ${msg.sender === 'me' ? 'message-sent' : 'message-received'}`}>
                          <div className="message-content">{msg.text}</div>
                          {msg.attachments && msg.attachments.length > 0 && (
                            <div className="message-attachments">
                              {msg.attachments.map((attachment, index) => (
                                <div key={index} className="attachment-item">
                                  <FileImageOutlined /> {attachment.name} ({attachment.size})
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="message-timestamp">{msg.timestamp}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Empty 
                      description="No messages yet" 
                      image={Empty.PRESENTED_IMAGE_SIMPLE} 
                      className="empty-messages"
                    />
                  )}
                  <div ref={messageEndRef} />
                </div>
                
                <div className="message-input-area">
                  <div className="message-toolbar">
                    <Button 
                      icon={<PaperClipOutlined />} 
                      onClick={handleAttachmentClick}
                      title="Attach file"
                    />
                    {showAttachmentMenu && (
                      <div className="attachment-options" style={{ position: 'absolute', bottom: '60px', background: 'white', padding: '10px', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                        <Button icon={<FileImageOutlined />} block>Image</Button>
                        <Button icon={<PaperClipOutlined />} block>Document</Button>
                        <Button icon={<AudioOutlined />} block>Audio</Button>
                      </div>
                    )}
                    <Button 
                      icon={<SmileOutlined />} 
                      onClick={handleEmojiPickerToggle}
                      title="Add emoji"
                    />
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      style={{ display: 'none' }} 
                    />
                  </div>
                  
                  <Space.Compact style={{ width: '100%' }}>
                    <Input.TextArea
                      ref={messageInputRef}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onPressEnter={(e) => { 
                        if (!e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Type a message..."
                      autoSize={{ minRows: 1, maxRows: 4 }}
                    />
                    <Button 
                      type="primary" 
                      icon={<SendOutlined />} 
                      onClick={handleSendMessage} 
                      disabled={!newMessage.trim()}
                      title="Send message"
                    />
                  </Space.Compact>

                </div>
              </>
            ) : (
              <div className="chat-window-placeholder">
                <MessageOutlined style={{fontSize: '64px', color: '#d9d9d9'}}/>
                <Text type="secondary" style={{marginTop: '16px'}}>Select a conversation to start chatting</Text>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  style={{marginTop: '16px'}}
                  onClick={handleNewConversation}
                >
                  Start a new conversation
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
      
      <Modal
        title="New Message"
        open={showNewMessageModal}
        onCancel={() => setShowNewMessageModal(false)}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item label="Recipient" name="recipient" rules={[{ required: true }]}>
            <Select
              placeholder="Select a recipient"
              options={[
                { value: 'advisor', label: 'Academic Advisor' },
                { value: 'support', label: 'Student Support' },
                { value: 'library', label: 'Library Services' },
                { value: 'finance', label: 'Financial Aid Office' }
              ]}
            />
          </Form.Item>
          <Form.Item label="Message" name="message" rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder="Type your message..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default MessagesPage;