import { useState } from 'react';
import IconButton from '~/components/IconButton';
import NewMessageBadge from '~/components/NewMessageBadge';
import PoundSignIcon from '~/components/PoundSignIcon';
import ChevronDown from '~/svgs/ChevronDown';
import ClosedLockIcon from '~/svgs/ClosedLock';
import PlusIcon from '~/svgs/Plus';
import { cx } from '~/utils/string';

export default function GroupChannels({
  loading = false,
  channels,
  selectedChannelId,
  onChannelSelect,
}: {
  loading?: boolean;
  channels: ExtendedGroupChannel[];
  selectedChannelId: number | null;
  onChannelSelect: (channel: ExtendedGroupChannel) => void;
}) {
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
          <ChevronDown className={cx('h-3 w-3 transition-transform', !showChannels && 'rotate-180')} />
          Channels
        </h3>
        <IconButton variant="ghost" size="sm" className="p-1 h-6 w-6" aria-label="Add channel" icon={<PlusIcon />} />
      </div>

      {loading && (
        <div className="flex items-center justify-center h-12 text-gray-500 dark:text-gray-400">
          Loading channels...
        </div>
      )}

      {!loading && channels.length === 0 && (
        <div className="text-gray-500 dark:text-gray-400 text-sm text-center">
          No channels available. Create or join a channel to start chatting.
        </div>
      )}

      {showChannels && (
        <div className="space-y-1">
          {channels.map((channel) => (
            <ChannelItem
              key={channel.id}
              channel={channel}
              onClick={() => onChannelSelect(channel)}
              selected={channel.id === selectedChannelId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ChannelProps {
  channel: ExtendedGroupChannel;
  selected?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function ChannelItem({ channel, selected = false, onClick }: ChannelProps) {
  return (
    <div
      onClick={onClick}
      role="menuitem"
      tabIndex={0}
      className={`flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition-colors duration-200 ${
        selected
          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
      }`}>
      <div className="flex items-center space-x-2 flex-1 min-w-0">
        <span className="text-gray-500 dark:text-gray-400">
          {channel.isPublic ? <PoundSignIcon /> : <ClosedLockIcon />}
        </span>
        <span className="text-sm font-medium truncate">{channel.name}</span>
        {channel.hasUnreadMessages && <NewMessageBadge />}
      </div>
    </div>
  );
}
