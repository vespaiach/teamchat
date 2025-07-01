import { createContext, useContext, useMemo, useState } from 'react';
import useDirectChannels from '~/hooks/useDirectChannels';
import useDirectChannelsSocket from '~/hooks/useDirectChannelsSocket';
import useGroupChannels from '~/hooks/useGroupChannels';
import useGroupChannelsSocket from '~/hooks/useGroupChannelsSocket';
import useUserChannelsSocket from '~/hooks/useUserChannelsSocket';
import useUsers from '~/hooks/useUsers';
import getPredefinedData from '~/utils/predefined-data';
import { transformUser } from '~/utils/transformer';

interface HomeStore {
  groupChannels: ExtendedGroupChannel[];
  groupChannelsLoading: boolean;
  directChannels: ExtendedDirectChannel[];
  directChannelsLoading: boolean;
  users: User[];
  usersLoading: boolean;
  loggedInUser: User;
}

const userResponse = getPredefinedData<UserResponse>('logged-in-user');
if (!userResponse) {
  throw new Error('User data not found. Ensure the user data is embedded in the HTML.');
}

const HomeStoreContext = createContext({
  groupChannels: [],
  groupChannelsLoading: true,
  directChannels: [],
  directChannelsLoading: true,
  users: [],
  usersLoading: true,
  loggedInUser: transformUser(userResponse) as User,
} as HomeStore);

export function HomeStoreProvider({ children }: { children: React.ReactNode }) {
  const [loggedInUser] = useState(transformUser(userResponse!));
  const { groupChannelsLoading, groupChannels, setGroupChannels } = useGroupChannels();
  const { directChannelsLoading, directChannels, setDirectChannels } = useDirectChannels();
  const { usersLoading, users, setUsers } = useUsers();

  const extendedDirectChannels = useMemo(() => {
    return directChannels.map((channel) => ({
      ...channel,
      partner: channel.participants.find((user) => user.id !== loggedInUser.id)!,
    })) as ExtendedDirectChannel[];
  }, [directChannels, loggedInUser.id]);

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
        directChannels: extendedDirectChannels,
        directChannelsLoading,
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

// Sort users by online status (online, away, offline)
// const sortedUsers = [...users].sort((a, b) => {
//   const statusOrder = { online: 0, away: 1, offline: 2 };
//   return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
// });
