import { get } from '~/utils/remote';
import { useEffect, useState } from 'react';
import { transformUsers } from '~/utils/transformer';

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await get<UserResponse[]>('/users');
      if (response.success) {
        setUsers(transformUsers(response.data));
      }
      setLoading(false);
    })();
  }, []);

  return {
    setUsers,
    users,
    usersLoading: loading,
  };
}
