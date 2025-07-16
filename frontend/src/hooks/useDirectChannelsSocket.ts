import { useEffect, useRef } from 'react';
import { toDirectConversation, type APIDirectConversation, type DirectConversation } from '~/models/groupConversation';
import { consumer } from '~/utils/ws';

export default function useDirectChannelsSocket(receiveChannels: (channel: DirectConversation) => void) {
  const receiveRef = useRef<(channel: DirectConversation) => void>(() => {});
  receiveRef.current = (channel) => {
    receiveChannels(channel);
  };

  useEffect(() => {
    const channel = consumer.subscriptions.create(
      { channel: 'DirectConversationsChannel' },
      {
        connected: () => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Connected to DirectConversationsChannel');
          }
        },
        disconnected: () => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Disconnected from DirectConversationsChannel');
          }
        },
        received: (data: { conversation: APIDirectConversation }) => {
          receiveRef.current(toDirectConversation(data.conversation));
        },
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, []);
}
