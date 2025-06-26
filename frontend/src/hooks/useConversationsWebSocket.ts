import { useEffect, useRef } from 'react';
import { consumer } from '~/utils/ws';

export default function useConversationsWebSocket(receiveChannels: (channels: ExtendedChannel[]) => void) {
  const receiveRef = useRef<(channels: ExtendedChannel[]) => void>(() => {});
  receiveRef.current = (channels) => {
    receiveChannels(channels);
  };

  useEffect(() => {
    const channel = consumer.subscriptions.create({ channel: 'ConversationsChannel' }, {
      connected: () => {
        console.log('Connected to ConversationsChannel');
      },
      disconnected: () => {
        console.log('Disconnected from ConversationsChannel');
      },
      // This will be called when the server sends a message to this channel
      received: (data: { conversations: ExtendedChannel[] }) => {
        receiveRef.current(data.conversations);
      },
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);
}
