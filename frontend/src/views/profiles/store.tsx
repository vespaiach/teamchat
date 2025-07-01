import { createContext, useContext, useState } from 'react';
import getPredefinedData from '~/utils/predefined-data';
import { transformUser } from '~/utils/transformer';

interface ProfilesStore {
  loggedInUser: User;
  setLoggedInUser: (user: User) => void;
}

const userResponse = getPredefinedData<UserResponse>('logged-in-user');
if (!userResponse) {
  throw new Error('User data not found. Ensure the user data is embedded in the HTML.');
}

const ProfilesStoreContext = createContext({
  loggedInUser: transformUser(userResponse) as User,
  setLoggedInUser: () => {}
} as ProfilesStore);

export function ProfilesStoreProvider({ children }: { children: React.ReactNode }) {
  const [loggedInUser, setLoggedInUser] = useState(transformUser(userResponse!));

  return <ProfilesStoreContext.Provider value={{ loggedInUser, setLoggedInUser }}>{children}</ProfilesStoreContext.Provider>;
}

export function useProfilesStore() {
  const context = useContext(ProfilesStoreContext);
  if (!context) {
    throw new Error('useProfilesStore must be used within a ProfilesStoreProvider');
  }
  return context;
}
