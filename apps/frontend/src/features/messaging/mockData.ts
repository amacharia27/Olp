// apps/frontend/src/features/messaging/mockData.ts
import { User, Conversation, Message } from './types';

// Mock users
export const mockUsers: User[] = [
  {
    id: 'current-user',
    name: 'Current User',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'teacher',
    status: 'online'
  },
  {
    id: 'user-1',
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'student',
    status: 'online',
    lastActive: '2025-06-24T10:30:00Z'
  },
  {
    id: 'user-2',
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'parent',
    status: 'offline',
    lastActive: '2025-06-23T18:45:00Z'
  },
  {
    id: 'user-3',
    name: 'Alice Johnson',
    avatar: 'https://i.pravatar.cc/150?img=4',
    role: 'teacher',
    status: 'away',
    lastActive: '2025-06-24T09:15:00Z'
  },
  {
    id: 'user-4',
    name: 'Robert Williams',
    avatar: 'https://i.pravatar.cc/150?img=7',
    role: 'headteacher',
    status: 'online',
    lastActive: '2025-06-24T11:05:00Z'
  },
  {
    id: 'user-5',
    name: 'Emily Davis',
    avatar: 'https://i.pravatar.cc/150?img=9',
    role: 'deputy',
    status: 'online',
    lastActive: '2025-06-24T11:20:00Z'
  }
];

// Helper function to create messages
const createMessage = (
  id: string,
  conversationId: string,
  senderId: string,
  content: string,
  timestamp: string,
  isRead: boolean = true
): Message => ({
  id,
  conversationId,
  senderId,
  content,
  timestamp,
  status: isRead ? 'read' : 'delivered',
  isRead
});

// Mock conversations
export const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    participantIds: ['current-user', 'user-1'],
    messages: [
      createMessage('msg-1-1', 'conv-1', 'user-1', 'Hello teacher, I have a question about today\'s homework', '2025-06-23T14:30:00Z'),
      createMessage('msg-1-2', 'conv-1', 'current-user', 'Hi Jane, what\'s your question?', '2025-06-23T14:35:00Z'),
      createMessage('msg-1-3', 'conv-1', 'user-1', 'I\'m having trouble with question 5 on the math assignment', '2025-06-23T14:40:00Z'),
      createMessage('msg-1-4', 'conv-1', 'current-user', 'Let me explain. For question 5, you need to use the quadratic formula...', '2025-06-23T14:45:00Z'),
      createMessage('msg-1-5', 'conv-1', 'user-1', 'Thank you! That makes sense now.', '2025-06-23T14:50:00Z', false)
    ],
    lastMessage: 'Thank you! That makes sense now.',
    lastMessageTimestamp: '2025-06-23T14:50:00Z',
    unreadCount: 1
  },
  {
    id: 'conv-2',
    participantIds: ['current-user', 'user-2'],
    messages: [
      createMessage('msg-2-1', 'conv-2', 'current-user', 'Hello Mr. Doe, I wanted to discuss Jane\'s progress in class', '2025-06-22T10:15:00Z'),
      createMessage('msg-2-2', 'conv-2', 'user-2', 'Hi, thank you for reaching out. How is she doing?', '2025-06-22T10:30:00Z'),
      createMessage('msg-2-3', 'conv-2', 'current-user', 'She\'s doing well overall, but I\'ve noticed she\'s having some difficulty with algebra concepts', '2025-06-22T10:35:00Z'),
      createMessage('msg-2-4', 'conv-2', 'user-2', 'I see. We can work with her at home. Do you have any specific recommendations?', '2025-06-22T10:40:00Z')
    ],
    lastMessage: 'I see. We can work with her at home. Do you have any specific recommendations?',
    lastMessageTimestamp: '2025-06-22T10:40:00Z',
    unreadCount: 0
  },
  {
    id: 'conv-3',
    participantIds: ['current-user', 'user-3'],
    messages: [
      createMessage('msg-3-1', 'conv-3', 'user-3', 'Hi colleague, do you have the lesson plan template for next term?', '2025-06-24T09:10:00Z'),
      createMessage('msg-3-2', 'conv-3', 'current-user', 'Yes, I do. I\'ll share it with you', '2025-06-24T09:15:00Z'),
      createMessage('msg-3-3', 'conv-3', 'user-3', 'Thanks! That would be very helpful', '2025-06-24T09:20:00Z')
    ],
    lastMessage: 'Thanks! That would be very helpful',
    lastMessageTimestamp: '2025-06-24T09:20:00Z',
    unreadCount: 0
  },
  {
    id: 'conv-4',
    participantIds: ['current-user', 'user-4'],
    messages: [
      createMessage('msg-4-1', 'conv-4', 'user-4', 'Please submit your end of term reports by Friday', '2025-06-21T11:00:00Z'),
      createMessage('msg-4-2', 'conv-4', 'current-user', 'I\'ll have them ready by Thursday', '2025-06-21T11:05:00Z'),
      createMessage('msg-4-3', 'conv-4', 'user-4', 'Excellent, thank you for your promptness', '2025-06-21T11:10:00Z')
    ],
    lastMessage: 'Excellent, thank you for your promptness',
    lastMessageTimestamp: '2025-06-21T11:10:00Z',
    unreadCount: 0
  },
  {
    id: 'conv-5',
    participantIds: ['current-user', 'user-5'],
    messages: [
      createMessage('msg-5-1', 'conv-5', 'current-user', 'I need to discuss the new assessment criteria', '2025-06-20T13:20:00Z'),
      createMessage('msg-5-2', 'conv-5', 'user-5', 'Sure, let\'s meet tomorrow at 10 AM', '2025-06-20T13:25:00Z'),
      createMessage('msg-5-3', 'conv-5', 'current-user', 'That works for me. See you then', '2025-06-20T13:30:00Z'),
      createMessage('msg-5-4', 'conv-5', 'user-5', 'Great! I\'ll prepare the documents we need to review', '2025-06-20T13:35:00Z', false),
      createMessage('msg-5-5', 'conv-5', 'user-5', 'Also, please bring your rubric samples if you have them ready', '2025-06-20T13:40:00Z', false)
    ],
    lastMessage: 'Also, please bring your rubric samples if you have them ready',
    lastMessageTimestamp: '2025-06-20T13:40:00Z',
    unreadCount: 2
  },
  {
    id: 'conv-6',
    participantIds: ['current-user', 'user-1', 'user-3'],
    messages: [
      createMessage('msg-6-1', 'conv-6', 'current-user', 'I\'ve created a group for the science project coordination', '2025-06-19T15:00:00Z'),
      createMessage('msg-6-2', 'conv-6', 'user-3', 'Great idea! This will make planning easier', '2025-06-19T15:10:00Z'),
      createMessage('msg-6-3', 'conv-6', 'user-1', 'Thank you for including me in this project', '2025-06-19T15:15:00Z')
    ],
    lastMessage: 'Thank you for including me in this project',
    lastMessageTimestamp: '2025-06-19T15:15:00Z',
    unreadCount: 0,
    isGroup: true,
    groupName: 'Science Project Team'
  }
];

// Mock attachments could be added to messages as needed
