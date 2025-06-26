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
  }

  interface Channel {
    id: number;
    name: string | null;
    description: string | null;
    isPublic: boolean;
    isGroup: boolean;
    createdById: number;
    createdAt: string;
  }

  interface ExtendedChannel extends Channel {
    memberCount: number;
    hasUnreadMessages: boolean;
    isMember: boolean;
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

  type OnlineStatus = 'online' | 'offline' | 'away' | 'busy';

  type ApiResponse<T> =
    | {
        success: false;
        error: string;
      }
    | {
        success: true;
        data: T;
      };
}

export {};
