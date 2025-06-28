import { createContext, useContext, useState } from 'react';
import getPredefinedData from '~/utils/predefined-data';
import { transformUser } from '~/utils/transformer';

interface AppStore {
  loggedInUser: User;
}

const userResponse = getPredefinedData<UserResponse>('logged-in-user');
if (!userResponse) {
  throw new Error('User data not found. Ensure the user data is embedded in the HTML.');
}

const AppStoreContext = createContext<AppStore>({ loggedInUser: transformUser(userResponse) });

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<User>(transformUser(userResponse!));

  return <AppStoreContext.Provider value={{ loggedInUser: user }}>{children}</AppStoreContext.Provider>;
}

export function useLoggedInUser() {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error('useLoggedInUser must be used within an AppStoreProvider');
  }
  return context.loggedInUser;
}
