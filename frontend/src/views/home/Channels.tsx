import { Suspense, use, useEffect, useState } from 'react';
import Box from '~/components/Box';
import { Button } from '~/components/Button';
import PlusIcon from '~/svgs/Plus';
import ClosedLockIcon from '~/svgs/ClosedLock';
import NewMessageBadge from '~/components/NewMessageBadge';
import MemberIcon from '~/svgs/Member';
import TeamIcon from '~/svgs/Team';
import EditChannelModal from '~/views/home/EditChannelModal';
import useConversationsWebSocket from '~/hooks/useConversationsWebSocket';
import { get } from '~/utils/remote';
import Spinner from '~/svgs/Spinner';
import { JoinChannelModal } from '~/views/JoinChannelModal';

export default function Channels() {
  const [showEditChannelModal, setShowEditChannelModal] = useState(false);
  const [joinOrRequestChannel, setJoinOrRequestChannel] = useState<ExtendedChannel | null>(null);
  const [channelsPromise, setChannelsPromise] = useState<Promise<ApiResponse<ExtendedChannel[]>>>(
    new Promise(() => {})
  );

  const handleJoinOrRequest = (channel: ExtendedChannel) => {
    setJoinOrRequestChannel(channel);
  };

  useEffect(() => {
    setChannelsPromise(get<ExtendedChannel[]>('/conversations'));
  }, []);

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
          <ChannelList channelsPromise={channelsPromise} onJoinOrRequest={handleJoinOrRequest} />
        </Suspense>
      </Box>
      <EditChannelModal isOpen={showEditChannelModal} onClose={setShowEditChannelModal} />
      <JoinChannelModal
        channel={joinOrRequestChannel}
        isOpen={Boolean(joinOrRequestChannel)}
        onClose={() => {
          setJoinOrRequestChannel(null);
        }}
      />
    </>
  );
}

function ChannelList({
  channelsPromise,
  onJoinOrRequest,
}: {
  onJoinOrRequest: (channel: ExtendedChannel) => void;
  channelsPromise: Promise<ApiResponse<ExtendedChannel[]>>;
}) {
  const resolvedData = use(channelsPromise);
  const [channels, setChannels] = useState<ExtendedChannel[]>(resolvedData.success ? resolvedData.data : []);

  useConversationsWebSocket((updatedOrNewChannel) => {
    setChannels((l) => {
      if (!l) return [updatedOrNewChannel];
      const existingIndex = l.findIndex((c) => c.id === updatedOrNewChannel.id);
      if (existingIndex !== -1) {
        // Update existing channel
        const updatedChannels = [...l];
        updatedChannels[existingIndex] = updatedOrNewChannel;
        return updatedChannels;
      }
      // Add new channel
      return [updatedOrNewChannel, ...l];
    });
  });

  if (!resolvedData.success) {
    return <div className="text-red-500">Error loading channels</div>;
  }

  return channels.map((channel) => (
    <ChannelItem
      key={channel.id}
      channel={channel}
      onJoinOrRequest={onJoinOrRequest}
      onClick={() => {
        window.location.href = `/channels/${channel.id}`;
      }}
    />
  ));
}

function ChannelItem({
  channel,
  onClick,
  onJoinOrRequest,
}: {
  channel: ExtendedChannel;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  onJoinOrRequest: (channel: ExtendedChannel) => void;
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
          <Button
            size="xs"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onJoinOrRequest(channel);
            }}>
            {channel.isPublic ? 'Join' : 'Request'}
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
