import { useEffect, useState } from 'react';
import { cx } from '~/utils/string.js';

interface AvatarProps {
  size?: 'small' | 'smaller' | 'medium' | 'large';
  online?: boolean | null;
  user: User;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const SIZE = {
  smaller: 'w-8 h-8',
  small: 'w-9 h-9',
  medium: 'w-12 h-12',
  large: 'w-22 h-22',
};

export default function UserAvatar({ user, size = 'small', online, className, onClick }: AvatarProps) {
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    // Download user's avatar from url `/users/:id/avatar`
    const img = new Image();
    img.onload = () => {
      setAvatar(`/users/${user.id}/avatar`);
    };
    img.src = `/users/${user.id}/avatar`;
  }, [user]);

  return (
    <div
      aria-label={`${user.name}'s avatar`}
      onClick={onClick}
      role="img"
      className={cx(
        'flex items-center justify-center bg-stone-200 bg-cover bg-center shrink-0 rounded-full relative',
        SIZE[size],
        className
      )}>
      {avatar && (
        <img
          src={avatar}
          alt={`${user.name}'s avatar`}
          className="object-cover object-center w-full h-full rounded-full border border-transparent"
        />
      )}
      {!avatar && (
        <div className="h-full w-full flex items-center justify-center text-sm font-medium text-white bg-primary dark:bg-primary-dark rounded-full">
          <span className="text-xs font-medium">
            {user.firstName[0].toUpperCase()}
            {user.lastName[0].toUpperCase()}
          </span>
        </div>
      )}
      {online !== undefined && online !== null && (
        <div className="absolute -bottom-0.5 -right-0.5">
          <div
            className={cx(
              'w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800',
              online ? 'bg-green-500' : 'bg-gray-400'
            )}
          />
        </div>
      )}
    </div>
  );
}
