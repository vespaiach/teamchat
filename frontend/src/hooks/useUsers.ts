import { useEffect, useState } from 'react';
import type { User } from '~/models/user';
import { UserQuery } from '~/services/UserQuery';

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setUsers(await UserQuery.list())
      setLoading(false);
    })();
  }, []);

  return {
    setUsers,
    users,
    usersLoading: loading,
  };
}
