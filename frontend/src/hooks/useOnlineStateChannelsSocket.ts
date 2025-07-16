import { useEffect, useRef } from 'react';
import { consumer } from '~/utils/ws';

export default function useOnlineStateChannelsSocket(receiveOnlineUserIds: (userIds: number[]) => void) {
  const receiveRef = useRef<(ids: number[]) => void>(() => {});
  receiveRef.current = (ids) => {
    receiveOnlineUserIds(ids);
  };

  useEffect(() => {
    const channel = consumer.subscriptions.create(
      { channel: 'OnlineStateChannel' },
      {
        connected: () => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Connected to OnlineStateChannel');
          }
        },
        disconnected: () => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Disconnected from OnlineStateChannel');
          }
        },
        received: (data: { user_ids: number[] }) => {
          receiveRef.current(data.user_ids);
        },
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, []);
}
