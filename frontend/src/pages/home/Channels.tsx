import { Suspense, use, useEffect, useState } from 'react';
import Box from '~/components/Box';
import { Button } from '~/components/Button';
import PlusIcon from '~/svgs/Plus';
import ClosedLockIcon from '~/svgs/ClosedLock';
import NewMessageBadge from '~/components/NewMessageBadge';
import MemberIcon from '~/svgs/Member';
import TeamIcon from '~/svgs/Team';
import EditChannelModal from './EditChannelModal';
import useConversationsWebSocket from '~/hooks/useConversationsWebSocket';
import { get } from '~/utils/remote';
import Spinner from '~/svgs/Spinner';

export default function Channels() {
  const [showEditChannelModal, setShowEditChannelModal] = useState(false);
  const [channelsPromise, setChannelsPromise] = useState<Promise<ApiResponse<ExtendedChannel[]>>>(
    new Promise(() => {})
  );

  useEffect(() => {
    setChannelsPromise(get<ExtendedChannel[]>('/conversations'));
  }, []);

  useConversationsWebSocket((updatedChannels) => {
    setChannelsPromise(Promise.resolve({ success: true, data: updatedChannels }));
  });

  return (
    <>
      <Box
        header={
          <>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Channels</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEditChannelModal(true)}
              leftIcon={<PlusIcon className="h-4 w-4" />}>
              New Channel
            </Button>
          </>
        }>
        <Suspense
          fallback={
            <div className="min-h-48 flex items-center justify-center gap-2">
              <Spinner className="w-5 h-5" /> Loading channels...
            </div>
          }>
          <ChannelList channelsPromise={channelsPromise} />
        </Suspense>
      </Box>
      <EditChannelModal isOpen={showEditChannelModal} onClose={setShowEditChannelModal} />
    </>
  );
}

function ChannelList({ channelsPromise }: { channelsPromise: Promise<ApiResponse<ExtendedChannel[]>> }) {
  const resolvedData = use(channelsPromise);

  if (!resolvedData.success) {
    return <div className="text-red-500">Error loading channels</div>;
  }

  return resolvedData.data.map((channel) => (
    <ChannelItem
      key={channel.id}
      channel={channel}
      onClick={() => {
        window.location.href = `/channels/${channel.id}`;
      }}
    />
  ));
}

function ChannelItem({
  channel,
  onClick,
}: {
  channel: ExtendedChannel;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      aria-label={`Channel: ${channel.name}`}
      tabIndex={0}
      role="button"
      onClick={onClick}
      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200">
      <div className="flex items-center space-x-3">
        <div className="flex items-center gap-1">
          <div className="text-gray-500 dark:text-gray-400 flex items-center justify-center w-4 h-4 shrink-0">
            {channel.isPublic ? '#' : <ClosedLockIcon className="h-4 w-4" />}
          </div>
          <span className="font-medium text-gray-900 dark:text-white">{channel.name}</span>
          {channel.isMember && <MemberIcon className="w-4 h-4 text-blue-500" />}
        </div>
        {Boolean(channel.hasUnreadMessages) && <NewMessageBadge />}
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        
        {!channel.isMember && (
          <Button size="xs" variant="outline">
            Join
          </Button>
        )}
        {channel.memberCount > 0 && (
          <div className="flex items-center gap-1">
            <span>{channel.memberCount}</span>
            <TeamIcon className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  );
}
