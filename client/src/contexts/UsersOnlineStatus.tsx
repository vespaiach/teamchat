import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import consumer from '../consumer.js';

interface UserIdsContextType {
  userIds: number[];
  isOnline: (userId: number) => boolean;
}

const UserIdsContext = createContext<UserIdsContextType | undefined>(undefined);

export function UsersOnlineStatus({ children }: { children: ReactNode }) {
  const [userIds, setUserIdsState] = useState<number[]>([]);

  useEffect(() => {
    const channel = consumer.subscriptions.create('OnlineStatusChannel', {
      connected() {
        console.log('Connected to OnlineStatusChannel');
      },

      disconnected() {
        console.log('Disconnected from OnlineStatusChannel');
      },

      received(data) {
        setUserIdsState(prevUserIds => {
          // Compare data vs userIds first, if there are changes, then update
          if (JSON.stringify(prevUserIds) !== JSON.stringify(data)) {
            return data;
          }
          return prevUserIds;
        });
      },
    });

    const pingInterval = setInterval(() => {
      channel.perform('ping');
    }, 3000);

    return () => {
      channel.unsubscribe();
      clearInterval(pingInterval);
    };
  }, []);

  const isOnline = useCallback((userId: number) => {
    return userIds.includes(userId);
  }, [userIds]);

  const value: UserIdsContextType = {
    userIds,
    isOnline,
  };

  return <UserIdsContext.Provider value={value}>{children}</UserIdsContext.Provider>;
}

export function useUserOnline(): UserIdsContextType {
  const context = useContext(UserIdsContext);
  if (context === undefined) {
    throw new Error('useUserIds must be used within a UserIdsProvider');
  }
  return context;
}
