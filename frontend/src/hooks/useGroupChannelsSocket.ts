import { useEffect, useRef } from 'react';
import { transformGroupChannel } from '~/utils/transformer';
import { consumer } from '~/utils/ws';

export default function useGroupChannelsSocket(receiveChannels: (channel: ExtendedGroupChannel) => void) {
  const receiveRef = useRef<(channels: ExtendedGroupChannel) => void>(() => {});
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
        received: (data: { conversation: GroupChannelResponse }) => {
          receiveRef.current(transformGroupChannel(data.conversation));
        },
      }
    );

    return () => {
      channel.unsubscribe();
    };
  }, []);
}
