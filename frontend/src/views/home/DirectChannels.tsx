import Box from '~/components/Box';
import Spinner from '~/svgs/Spinner';
import useDirectChannels from '~/hooks/useDirectChannels';
import UserAvatar from '~/components/UserAvatar';
import useDirectChannelPartner from '~/hooks/useDirectChannelPartner';

export default function DirectChannels() {
  const { directChannels, directChannelLoading } = useDirectChannels();

  return (
    <>
      <Box header={<h2 className="text-lg font-semibold text-gray-900 dark:text-white">Direct Messages</h2>}>
        {directChannelLoading && (
          <div className="min-h-48 flex items-center justify-center gap-2">
            <Spinner className="w-5 h-5" /> Loading channels...
          </div>
        )}
        {!directChannelLoading && directChannels.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No direct messages yet. Start a conversation with someone!
          </div>
        )}
        {!directChannelLoading && <ChannelList channels={directChannels} />}
      </Box>
    </>
  );
}

function ChannelList({ channels }: { channels: DirectChannel[] }) {
  return channels.map((channel) => <ChannelItem key={channel.id} channel={channel} />);
}

function ChannelItem({ channel }: { channel: DirectChannel }) {
  const partner = useDirectChannelPartner(channel);
  if (!partner) {
    return null;
  }

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
          <UserAvatar user={partner} online />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{partner.name}</p>
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
