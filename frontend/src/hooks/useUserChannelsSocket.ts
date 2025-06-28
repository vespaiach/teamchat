import { useEffect, useRef } from 'react';
import { transformUser } from '~/utils/transformer';
import { consumer } from '~/utils/ws';

export default function useUserChannelsSocket(receiveUser: (user: User) => void) {
  const receiveRef = useRef<(user: User) => void>(() => {});
  receiveRef.current = (user) => {
    receiveUser(user);
  };

  useEffect(() => {
    const channel = consumer.subscriptions.create(
      { channel: 'UsersChannel' },
      {
        connected: () => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Connected to useUserChannelsSocket');
          }
        },
        disconnected: () => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Disconnected from useUserChannelsSocket');
          }
        },
        received: (data: { user: UserResponse }) => {
          receiveRef.current(transformUser(data.user));
        },
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, []);
}
