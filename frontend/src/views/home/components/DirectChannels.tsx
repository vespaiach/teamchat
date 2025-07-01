import Box from '~/components/Box';
import Spinner from '~/svgs/Spinner';
import UserAvatar from '~/views/UserAvatar';
import { useHomeStore } from '~/views/home/store';
import ShowMoreOrLess from '~/components/ShowMoreOrLess';

export default function DirectChannels() {
  const { directChannels, directChannelsLoading } = useHomeStore();

  return (
    <div className="lg:col-span-1">
      <Box headerRNode={<h2 className="text-lg font-semibold text-gray-900 dark:text-white">Direct Messages</h2>}>
        <div className="p-2">
          {directChannelsLoading && (
            <div className="min-h-48 flex items-center justify-center gap-2 dark:text-gray-400">
              <Spinner className="w-5 h-5" /> Loading channels...
            </div>
          )}
          {!directChannelsLoading && directChannels.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No direct messages yet. Start a conversation with someone!
            </div>
          )}
          {!directChannelsLoading && <ChannelList channels={directChannels} />}
        </div>
      </Box>
    </div>
  );
}

function ChannelList({ channels }: { channels: ExtendedDirectChannel[] }) {
  return (
    <ShowMoreOrLess items={channels} renderItem={(channel) => <ChannelItem key={channel.id} channel={channel} />} />
  );
}

function ChannelItem({ channel }: { channel: ExtendedDirectChannel }) {
  return (
    <div
      role="listitem"
      tabIndex={0}
      onClick={() => {
        window.location.href = `/conversations?channel=${channel.id}`;
      }}
      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative flex-shrink-0">
          <UserAvatar user={channel.partner} online />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{channel.partner.name}</p>
            <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full bg-primary dark:bg-primary-dark">
              3
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Hey, did you see the new designs?</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">2 min ago</p>
        </div>
      </div>
    </div>
  );
}
