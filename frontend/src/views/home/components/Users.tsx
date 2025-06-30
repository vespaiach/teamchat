import Box from '~/components/Box';
import UserAvatar from '~/views/UserAvatar';
import Spinner from '~/svgs/Spinner';
import { useHomeStore } from '~/views/home/store';
import ShowMoreOrLess from '~/components/ShowMoreOrLess';

export default function Users() {
  const { users, usersLoading } = useHomeStore();

  return (
    <Box
      header={
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Team Members</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">3 online</p>
        </div>
      }>
      <div className="p-2">
        {usersLoading && (
          <div className="min-h-48 flex items-center justify-center gap-2 dark:text-gray-400">
            <Spinner className="w-5 h-5" /> Loading users...
          </div>
        )}
        <ShowMoreOrLess items={users} renderItem={(user: User) => <UserItem key={user.id} user={user} online />} />
      </div>
    </Box>
  );
}

function UserItem({ user, online }: { user: User; online: boolean }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <UserAvatar user={user} online={online} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{online ? 'online' : 'offline'}</p>
        </div>
      </div>
    </div>
  );
}
