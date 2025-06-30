import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

interface OnlineStatusContextType {
  onlineUserIds: number[];
  isUserOnline: (userId: number) => boolean;
  setUserOnline: (userId: number) => void;
  setUserOffline: (userId: number) => void;
  setOnlineUsers: (userIds: number[]) => void;
}

const OnlineStatusContext = createContext<OnlineStatusContextType | undefined>(undefined);

interface OnlineStatusProviderProps {
  children: ReactNode;
  initialOnlineUsers?: number[];
}

export function OnlineStatusProvider({ children, initialOnlineUsers = [] }: OnlineStatusProviderProps) {
  const [onlineUserIds, setOnlineUserIds] = useState<number[]>(initialOnlineUsers);

  const isUserOnline = useCallback((userId: number) => {
    return onlineUserIds.includes(userId);
  }, [onlineUserIds]);

  const setUserOnline = useCallback((userId: number) => {
    setOnlineUserIds((prev) => {
      if (!prev.includes(userId)) {
        return [...prev, userId];
      }
      return prev;
    });
  }, []);

  const setUserOffline = useCallback((userId: number) => {
    setOnlineUserIds((prev) => prev.filter((id) => id !== userId));
  }, []);

  const setOnlineUsers = useCallback((userIds: number[]) => {
    setOnlineUserIds(userIds);
  }, []);

  const value: OnlineStatusContextType = {
    onlineUserIds,
    isUserOnline,
    setUserOnline,
    setUserOffline,
    setOnlineUsers,
  };

  return <OnlineStatusContext.Provider value={value}>{children}</OnlineStatusContext.Provider>;
}

export function useOnlineStatus(): OnlineStatusContextType {
  const context = useContext(OnlineStatusContext);
  if (context === undefined) {
    throw new Error('useOnlineStatus must be used within an OnlineStatusProvider');
  }
  return context;
}