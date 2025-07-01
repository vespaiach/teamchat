import { useState } from 'react';
import IconButton from '~/components/IconButton';
import NewMessageBadge from '~/components/NewMessageBadge';
import UserAvatar from '~/views/UserAvatar';
import ChevronDownIcon from '~/svgs/ChevronDown';
import PlusIcon from '~/svgs/Plus';
import { cx } from '~/utils/string';
import { useConversationsStore } from '~/views/conversations/store';

export default function DirectChannels() {
  const { directChannels, directChannelsLoading, selectedChannelId, selectChannel } = useConversationsStore();
  const [showChannels, setShowChannels] = useState(true);

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-3">
        <h3
          className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1 cursor-pointer"
          role="button"
          tabIndex={0}
          onClick={() => {
            setShowChannels(!showChannels);
          }}>
          <ChevronDownIcon className={cx('h-3 w-3 transition-transform', !showChannels && 'rotate-180')} />
          Direct Messages
        </h3>
        <IconButton variant="ghost" size="sm" className="p-1 h-6 w-6" aria-label="Add channel" icon={<PlusIcon />} />
      </div>

      {directChannelsLoading && (
        <div className="flex items-center justify-center h-12 text-gray-500 dark:text-gray-400">
          Loading channels...
        </div>
      )}

      {showChannels && (
        <div className="space-y-1">
          {directChannels.map((channel) => (
            <ChannelItem
              key={channel.id}
              channel={channel}
              onClick={() => selectChannel(channel.id)}
              selected={channel.id === selectedChannelId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ChannelProps {
  channel: ExtendedDirectChannel;
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function ChannelItem({ channel, selected = false, onClick }: ChannelProps) {
  return (
    <div
      onClick={onClick}
      role="menuitem"
      tabIndex={0}
      className={cx(
        'flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer  transition-colors duration-200',
        selected ? 'bg-blue-100 dark:bg-blue-900/30' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
      )}>
      <div className="relative">
        <UserAvatar user={channel.partner} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium text-gray-900 dark:text-white truncate">{channel.partner.name}</span>
          {channel.hasUnreadMessages && <NewMessageBadge />}
        </div>
      </div>
    </div>
  );
}
