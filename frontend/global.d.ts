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
    name: string;
    description?: string;
    isPrivate: boolean;
    isDM: boolean;
    createdAt: string;
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
        error: string;
      }
    | {
        error: never;
        data: T;
      };
}

export {};
