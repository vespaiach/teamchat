import { createContext, useContext } from 'react';
import useDirectChannels from '~/hooks/useDirectChannels';
import useDirectChannelsSocket from '~/hooks/useDirectChannelsSocket';
import useGroupChannels from '~/hooks/useGroupChannels';
import useGroupChannelsSocket from '~/hooks/useGroupChannelsSocket';
import useUserChannelsSocket from '~/hooks/useUserChannelsSocket';
import useUsers from '~/hooks/useUsers';

interface HomeStore {
  groupChannels: ExtendedGroupChannel[];
  groupChannelsLoading: boolean;
  directChannels: DirectChannel[];
  directChannelsLoading: boolean;
  users: User[];
  usersLoading: boolean;
}

const HomeStoreContext = createContext({
  groupChannels: [],
  groupChannelsLoading: true,
  directChannels: [],
  directChannelsLoading: true,
  users: [],
  usersLoading: true,
} as HomeStore);

export function HomeStoreProvider({ children }: { children: React.ReactNode }) {
  const { groupChannelsLoading, groupChannels, setGroupChannels } = useGroupChannels();
  const { directChannelsLoading, directChannels, setDirectChannels } = useDirectChannels();
  const { usersLoading, users, setUsers } = useUsers();

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

  useUserChannelsSocket((user) => {
    setUsers((prev) => {
      const existingUser = prev.find((u) => u.id === user.id);
      if (existingUser) {
        return prev.map((u) => (u.id === user.id ? { ...u, ...user } : u));
      }
      return [...prev, user];
    });
  });

  return (
    <HomeStoreContext.Provider
      value={{
        groupChannels,
        groupChannelsLoading,
        directChannels,
        directChannelsLoading,
        users,
        usersLoading,
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

// Sort users by online status (online, away, offline)
// const sortedUsers = [...users].sort((a, b) => {
//   const statusOrder = { online: 0, away: 1, offline: 2 };
//   return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
// });