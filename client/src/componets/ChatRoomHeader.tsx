import { useRef } from 'react';
import { cx } from '../utils/string.js';
import IconButton from './IconButton.js';
import UserAvatar from './UserAvatar.js';

interface ChatInputProps {
  className?: string;
  user?: {
    name: string;
    online?: boolean;
    avatar?: string;
  };
  room?: {
    name: string;
    totalMembers: number;
    onlineMembers?: number;
  };
}

export default function ChatRoomHeader({ className, user, room }: ChatInputProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={headerRef}
      className={cx(
        'sticky z-50 top-0 w-full bg-white flex items-center gap-2 px-5 py-4',
        'border-b border-gray-200 shadow-[0_4px_3px_-3px_rgba(0,0,0,0.1)]',
        className
      )}>
      <IconButton>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 1L1 5M1 5L5 9M1 5L13 5"
            stroke="#000E08"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IconButton>
      {!!user && <UserHeader {...user} />}
      {!!room && <GroupHeader {...room} />}
    </div>
  );
}

function UserHeader({ name, online, avatar }: { avatar?: string; name: string; online?: boolean }) {
  return (
    <>
      <UserAvatar name={name} online={online} src={avatar} />
      <div>
        <p className="font-sans font-bold text-base">name</p>
        <p className="text-stone-300 text-xs">{online ? 'Active now' : 'Offline'}</p>
      </div>
    </>
  );
}

function GroupHeader({
  name,
  onlineMembers,
  totalMembers,
}: {
  onlineMembers?: number;
  name: string;
  totalMembers: number;
}) {
  return (
    <>
      <UserAvatar name="Group" />
      <div>
        <p className="font-sans font-bold text-base">{name}</p>
        <p className="text-stone-300 text-xs">
          {totalMembers} members{onlineMembers ? `, ${onlineMembers} online` : ''}
        </p>
      </div>
    </>
  );
}
