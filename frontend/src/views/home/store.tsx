import { createContext, useContext, useMemo, useState } from 'react';
import useDirectConversations from '~/hooks/useDirectConversations';
import useDirectChannelsSocket from '~/hooks/useDirectChannelsSocket';
import useGroupConversations from '~/hooks/useGroupConversations';
import useGroupChannelsSocket from '~/hooks/useGroupChannelsSocket';
// import useOnlineStateChannelsSocket from '~/hooks/useOnlineStateChannelsSocket';
import useUsers from '~/hooks/useUsers';
import getPredefinedData from '~/utils/predefined-data';
import { transformUser } from '~/utils/transformer';
import type { User } from '~/models/user';

interface HomeStore {
  groupConversations: ExtendedGroupChannel[];
  groupConversationsLoading: boolean;
  directConversations: ExtendedDirectChannel[];
  directConversationsLoading: boolean;
  users: User[];
  usersLoading: boolean;
  loggedInUser: User;
}

const userResponse = getPredefinedData<UserResponse>('logged-in-user');
if (!userResponse) {
  throw new Error('User data not found. Ensure the user data is embedded in the HTML.');
}

const HomeStoreContext = createContext({
  groupConversations: [],
  groupConversationsLoading: true,
  directConversations: [],
  directConversationsLoading: true,
  users: [],
  usersLoading: true,
  loggedInUser: transformUser(userResponse) as User,
} as HomeStore);

export function HomeStoreProvider({ children }: { children: React.ReactNode }) {
  const [loggedInUser] = useState(transformUser(userResponse!));
  const { groupConversationsLoading, groupConversations, setGroupConversations } = useGroupConversations();
  const { directConversationsLoading, directConversations, setDirectConversations } = useDirectConversations();
  const { usersLoading, users } = useUsers();

  const extendedDirectConversations = useMemo(() => {
    return directConversations.map((channel) => ({
      ...channel,
      partner: channel.participants.find((user) => user.id !== loggedInUser.id)!,
    })) as ExtendedDirectChannel[];
  }, [directConversations, loggedInUser.id]);

  useGroupChannelsSocket((groupChannel) => {
    setGroupConversations((prev) => {
      const existingChannel = prev.find((c) => c.id === groupChannel.id);
      if (existingChannel) {
        return prev.map((c) => (c.id === groupChannel.id ? { ...c, ...groupChannel } : c));
      }
      return [...prev, groupChannel];
    });
  });

  useDirectChannelsSocket((directChannel) => {
    setDirectConversations((prev) => {
      const existingChannel = prev.find((c) => c.id === directChannel.id);
      if (existingChannel) {
        return prev.map((c) => (c.id === directChannel.id ? { ...c, ...directChannel } : c));
      }
      return [...prev, directChannel];
    });
  });

  // useOnlineStateChannelsSocket((userIds) => {
  //   setUsers((prev) => {
  //     const existingUser = prev.find((u) => u.id === user.id);
  //     if (existingUser) {
  //       return prev.map((u) => (u.id === user.id ? { ...u, ...user } : u));
  //     }
  //     return [...prev, user];
  //   });
  // });

  return (
    <HomeStoreContext.Provider
      value={{
        groupConversations,
        groupConversationsLoading,
        directConversations: extendedDirectConversations,
        directConversationsLoading,
        users,
        usersLoading,
        loggedInUser,
      }}>
      {children}
    </HomeStoreContext.Provider>
  );
}

export function useHomeStore() {
  const context = useContext(HomeStoreContext);
  if (!context) {
    throw new Error('useHomeStore must be used within a HomeStoreProvider');
  }
  return context;
}

