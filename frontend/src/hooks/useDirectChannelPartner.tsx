import { useMemo } from 'react';
import { useLoggedInUser } from '~/global-contexts/app-store';

export default function useDirectChannelPartner(channel: DirectChannel) {
  const loggedInUser = useLoggedInUser();

  const partner = useMemo(() => {
    return channel.participants.find((user) => user.id !== loggedInUser?.id);
  }, [channel.participants, loggedInUser?.id]);

  return partner;
}
