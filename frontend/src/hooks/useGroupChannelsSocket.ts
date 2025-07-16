import { useEffect, useRef } from 'react';
import { toGroupConversation, type APIGroupConversation, type GroupConversation } from '~/models/groupConversation';
import { consumer } from '~/utils/ws';

export default function useGroupChannelsSocket(receiveChannels: (channel: GroupConversation) => void) {
  const receiveRef = useRef<(channels: GroupConversation) => void>(() => {});
  receiveRef.current = (channels) => {
    receiveChannels(channels);
  };

  useEffect(() => {
    const channel = consumer.subscriptions.create(
      { channel: 'GroupConversationsChannel' },
      {
        connected: () => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Connected to GroupConversationsChannel');
          }
        },
        disconnected: () => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Disconnected from GroupConversationsChannel');
          }
        },
        received: (data: { conversation: APIGroupConversation }) => {
          receiveRef.current(toGroupConversation(data.conversation));
        },
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, []);
}
