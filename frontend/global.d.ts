declare global {
  interface AppError {
    id: string;
    message: string;
    location?: string;
  }

  interface User {
    id: string;
    email: string;
    avatar?: string;
    firstName: string;
    lastName: string;
  }
  
  var appErrors: AppError[] | undefined;

  type OnlineStatus = 'online' | 'offline' | 'away' | 'busy';
}

export {}