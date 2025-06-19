import { cx } from '../utils.js';
import UserAvatar from '../componets/UserAvatar.js';
import { useUserOnline } from '../contexts/UsersOnlineStatus.js';

interface HorizontalUserListProps {
  users: Array<{ id: number; firstName: string; avatar: string }>;
  className?: string;
}

export default function HorizontalUserList({ className, users }: HorizontalUserListProps) {
  return (
    <div className={cx('flex overflow-x-auto gap-3 py-2', className)}>
      {users.map((user) => (
        <User key={user.id} id={user.id} firstName={user.firstName} avatar={user.avatar} />
      ))}
    </div>
  );
}

function User({
  id,
  firstName,
  avatar,
  onClick,
}: {
  id: number;
  firstName: string;
  avatar: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) {
  const { isOnline } = useUserOnline();

  return (
    <div
      className="flex flex-col items-center justify-center gap-1"
      role="button"
      tabIndex={0}
      aria-label={`User ${firstName}`}
      onClick={onClick}>
      <UserAvatar name={firstName} src={avatar} online={isOnline(id)} />
      <strong>{firstName}</strong>
    </div>
  );
}
