declare global {
  interface ServerNotification {
    type: 'error' | 'success' | 'warning';
    title?: string;
    message: string;
  }

  interface User {
    id: string;
    email: string;
    avatar?: string;
    firstName: string;
    lastName: string;
    name: string;
    joinedAt: Date;
    role: string | null;
    department: string | null;
    timezone: string;
  }

  interface GroupChannel {
    id: number;
    name: string;
    description: string | null;
    isPublic: boolean;
    createdById: number;
    createdAt: Date;
    memberCount: number;
    hasUnreadMessages: boolean;
  }

  interface ExtendedGroupChannel extends GroupChannel {
    isMember: boolean;
  }

  interface DirectChannel {
    id: number;
    createdById: number;
    createdAt: Date;
    hasUnreadMessages: boolean;
    participants: User[];
  }

  interface ExtendedDirectChannel extends DirectChannel {
    partner: User;
  }

  type ToastType = 'success' | 'error' | 'warning';

  interface Toast {
    id: string;
    type: ToastType;
    title?: string;
    message: string;
    duration?: number;
  }

  var appErrors: ServerNotification[] | undefined;

  type OnlineStatus = 'online' | 'offline';
}

export {};
