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
  
  var appErrors: ServerNotification[] | undefined;

  type OnlineStatus = 'online' | 'offline' | 'away' | 'busy';
}

export {}