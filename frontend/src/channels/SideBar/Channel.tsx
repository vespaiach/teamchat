import NewMessageBadge from '~/components/NewMessageBadge';
import { cx } from '~/utils/string';

interface ChannelProps {
  id: string;
  isPrivate: boolean;
  name: string;
  selected?: boolean;
  hasNewMessages?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function Channel({ onClick, isPrivate, name, hasNewMessages = false, selected = false }: ChannelProps) {
  return (
    <div
      role="link"
      aria-label={`Channel ${name}`}
      onClick={onClick}
      className={cx(
        'flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition-colors duration-200',
        selected
          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
      )}>
      <div className="flex items-center space-x-2 flex-1 min-w-0">
        <span className="text-gray-500 dark:text-gray-400">{isPrivate ? '' : '#'}</span>
        <span className="text-sm font-medium truncate">{name}</span>
        {hasNewMessages && <NewMessageBadge />}
      </div>
    </div>
  );
}
