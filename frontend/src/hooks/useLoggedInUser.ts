import { useEffect, useState } from 'react';

export default function useLoggedInUser() {
  const [loggedInUser, setUser] = useState<LoggedInUser | null>(null);

  useEffect(() => {
    const data = document.getElementById('logged-in-user')?.textContent;
    if (data) {
      try {
        setUser(JSON.parse(data) as LoggedInUser);
      } catch (e) {
        console.error('Failed to parse user data:', e);
      }
    }
  }, []);

  return loggedInUser;
}
