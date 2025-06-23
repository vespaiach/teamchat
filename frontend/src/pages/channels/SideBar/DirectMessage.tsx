import NewMessageBadge from '~/components/NewMessageBadge';
import StatusIndicator from '~/components/StatusIndicator';
import UserAvatar from '~/components/UserAvatar';

interface DirectMessageProps {
  user: User;
  hasNewMessages?: boolean;
}

export default function DirectMessage({ user, hasNewMessages }: DirectMessageProps) {
  return (
    <div className="flex items-center space-x-2 px-2 py-1.5 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
      <div className="relative">
        <UserAvatar name={user.firstName} src={user.avatar} />
        <div className="absolute -bottom-0.5 -right-0.5">
          <StatusIndicator status="online" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.firstName}</span>
          {hasNewMessages && <NewMessageBadge />}
        </div>
      </div>
    </div>
  );
}
