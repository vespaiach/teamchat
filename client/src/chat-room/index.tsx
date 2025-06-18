import { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { MyChat, TheirChat, DayBreak, AutoScrollIntoView } from './Chat.js';
import useChatHistories from './useChatHistories.js';
import WaveLoading from './WaveLoading.js';
import ChatInput from '../componets/ChatInput.js';
import ChatRoomHeader from '../componets/ChatRoomHeader.js';
import useLoadHistoriesOnScrolling from './useLoadHistoriesOnScrolling.js';
import { useSendingChat } from './useSending.js';

interface CurrentUser {
  id: number;
  name: string;
  avatar: string;
}

interface Room {
  id: number;
  name: string;
  totalMembers: number;
}

function ChatRoom({ loggedInUser, room }: { room: Room; loggedInUser: CurrentUser }) {
  const { chatHistories, loadMoreChatHistories, loading } = useChatHistories(room.id);
  useLoadHistoriesOnScrolling(loadMoreChatHistories, chatHistories, loading);

  const { chat, handleChatChange, sendChat, sending } = useSendingChat(room.id);

  return (
    <>
      <div className="viewport space-y-10 min-h-dvh">
        <ChatRoomHeader room={room} />
        <div className="flex justify-center items-center pt-2">
          <WaveLoading className={loading ? 'visible' : 'invisible'} />
        </div>
        {chatHistories.map((chat, index) => {
          const showDayBreak =
            index === 0 || chatHistories[index - 1].createdAt.toDateString() !== chat.createdAt.toDateString();
          const ChatComponent = chat.creatorId === loggedInUser.id ? MyChat : TheirChat;
          return (
            <Fragment key={chat.groupId}>
              {showDayBreak && <DayBreak date={chat.createdAt} />}
              <ChatComponent
                creatorAvatar={chat.creatorAvatar}
                creatorName={chat.creatorName}
                createdAt={chat.createdAt}
                messages={chat.messages}
              />
              {index === chatHistories.length - 1 && <AutoScrollIntoView key={chat.messages.length} className="h-14" />}
            </Fragment>
          );
        })}
      </div>
      <ChatInput value={chat} onChange={handleChatChange} onClick={sendChat} sending={sending} />
    </>
  );
}

const container = document.getElementById('chat-room');
if (container) {
  const root = createRoot(container);
  const currentUser = JSON.parse(document.getElementById('current-user-data')!.textContent!) as CurrentUser;
  const room = JSON.parse(document.getElementById('room-data')!.textContent!) as Room;
  root.render(<ChatRoom loggedInUser={currentUser} room={room} />);
}
