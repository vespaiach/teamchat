import { useEffect, useRef } from 'react';
import { transformDirectChannel } from '~/utils/transformer';
import { consumer } from '~/utils/ws';

export default function useDirectChannelsSocket(receiveChannels: (channel: DirectChannel) => void) {
  const receiveRef = useRef<(channel: DirectChannelResponse) => void>(() => {});
  receiveRef.current = (channel) => {
    receiveChannels(transformDirectChannel(channel));
  };

  useEffect(() => {
    const channel = consumer.subscriptions.create({ channel: 'DirectConversationsChannel' }, {
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
      received: (data: { conversation: DirectChannelResponse }) => {
        receiveRef.current(data.conversation);
      },
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);
}
