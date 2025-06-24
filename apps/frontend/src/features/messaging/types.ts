// apps/frontend/src/features/messaging/types.ts

export interface User {
  id: string;
  name: string;
  avatar?: string;
  role: 'student' | 'teacher' | 'parent' | 'headteacher' | 'deputy' | 'admin';
  status?: 'online' | 'offline' | 'away';
  lastActive?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  isRead: boolean;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'audio' | 'video';
  url: string;
  size: number; // in bytes
  thumbnailUrl?: string;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  messages: Message[];
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  isGroup?: boolean;
  groupName?: string;
  groupAvatar?: string;
}

export interface TypingIndicator {
  conversationId: string;
  userId: string;
  timestamp: string;
}

export interface MessageFilter {
  searchText?: string;
  unreadOnly?: boolean;
  startDate?: string;
  endDate?: string;
  withAttachments?: boolean;
}
