import { createContext, useContext, useMemo, useState } from 'react';
import useDirectConversations from '~/hooks/useDirectConversations';
import useDirectChannelsSocket from '~/hooks/useDirectChannelsSocket';
import useGroupConversations from '~/hooks/useGroupConversations';
import useGroupChannelsSocket from '~/hooks/useGroupChannelsSocket';
import getPredefinedData from '~/utils/predefined-data';
import { transformUser } from '~/utils/transformer';

interface ConversationsStore {
  groupConversations: ExtendedGroupChannel[];
  groupConversationsLoading: boolean;
  directConversations: ExtendedDirectChannel[];
  directConversationsLoading: boolean;
  loggedInUser: User;
  selectedChannelId: number | null;
  selectChannel: (channelId: number) => void;
}

const userResponse = getPredefinedData<UserResponse>('logged-in-user');
if (!userResponse) {
  throw new Error('User data not found. Ensure the user data is embedded in the HTML.');
}

const ConversationsContext = createContext({
  groupConversations: [],
  groupConversationsLoading: true,
  directConversations: [],
  directConversationsLoading: true,
  loggedInUser: transformUser(userResponse!) as User,
  selectedChannelId: null,
  selectChannel: () => {},
} as ConversationsStore);

export function ConversationsStoreProvider({ children }: { children: React.ReactNode }) {
  const [selectedChannelId, setSelectedChannelId] = useState<number | null>(null);
  const [loggedInUser] = useState(transformUser(userResponse!));
  const { groupConversationsLoading, groupConversations, setGroupChannels } = useGroupConversations();
  const { directConversationsLoading, directConversations, setDirectChannels } = useDirectConversations();
  
  const extendedDirectChannels = useMemo(() => {
    return directConversations.map((channel) => ({
      ...channel,
      partner: channel.participants.find((user) => user.id !== loggedInUser.id)!,
    })) as ExtendedDirectChannel[];
  }, [directConversations, loggedInUser.id]);

  useGroupChannelsSocket((groupChannel) => {
    setGroupChannels((prev) => {
      const existingChannel = prev.find((c) => c.id === groupChannel.id);
      if (existingChannel) {
        return prev.map((c) => (c.id === groupChannel.id ? { ...c, ...groupChannel } : c));
      }
      return [...prev, groupChannel];
    });
  });

  useDirectChannelsSocket((directChannel) => {
    setDirectChannels((prev) => {
      const existingChannel = prev.find((c) => c.id === directChannel.id);
      if (existingChannel) {
        return prev.map((c) => (c.id === directChannel.id ? { ...c, ...directChannel } : c));
      }
      return [...prev, directChannel];
    });
  });

  return (
    <ConversationsContext.Provider
      value={{
        groupConversations,
        groupConversationsLoading,
        directConversations: extendedDirectChannels,
        directConversationsLoading,
        loggedInUser,
        selectedChannelId,
        selectChannel: setSelectedChannelId,
      }}>
      {children}
    </ConversationsContext.Provider>
  );
}

export function useConversationsStore() {
  const context = useContext(ConversationsContext);
  if (!context) {
    throw new Error('useConversationsStore must be used within a ConversationsContext');
  }
  return context;
}
