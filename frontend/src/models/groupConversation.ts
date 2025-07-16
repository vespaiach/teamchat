import { toUser } from './user';
import type { APIUser, User } from './user';

export interface GroupConversation {
  id: number;
  name: string;
  description: string | null;
  isPublic: boolean;
  createdById: number;
  createdAt: Date;
  memberCount: number;
  hasUnreadMessages: boolean;
  isMember: boolean;
}

export interface APIGroupConversation {
  id: number;
  name: string;
  description: string | null;
  is_public: boolean;
  created_by_id: number;
  created_at: string;
  member_count: number;
  has_unread_messages: boolean;
  is_member: boolean;
}

export interface DirectConversation {
  id: number;
  createdById: number;
  createdAt: Date;
  hasUnreadMessages: boolean;
  participants: User[];
}

export interface APIDirectConversation {
  id: number;
  created_by_id: number;
  created_at: string;
  has_unread_messages: boolean;
  participants: APIUser[];
}

export function toGroupConversation(data: APIGroupConversation): GroupConversation {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    isPublic: data.is_public,
    createdById: data.created_by_id,
    createdAt: new Date(data.created_at),
    memberCount: data.member_count,
    hasUnreadMessages: data.has_unread_messages,
    isMember: data.is_member,
  };
}

export function toDirectConversation(data: APIDirectConversation): DirectConversation {
  return {
    id: data.id,
    createdById: data.created_by_id,
    createdAt: new Date(data.created_at),
    hasUnreadMessages: data.has_unread_messages,
    participants: data.participants.map(toUser),
  };
}
