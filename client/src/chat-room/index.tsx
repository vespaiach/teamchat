import { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { MyChat, TheirChat } from './Chats.js';
import useChatHistories from './useChatHistories.js';
import WaveLoading from '../componets/WaveLoading.js';
import ChatInput from '../componets/ChatInput.js';
import ChatRoomHeader from '../componets/ChatRoomHeader.js';
import useLoadMoreHistoriesOnScrolling from './useLoadMoreHistoriesOnScrolling.js';
import { useSendingChat } from './useSending.js';
import DayBreaker from '../componets/DayBreaker.js';
import AutoScrollIntoView from '../componets/AutoScrollIntoView.js';
import { UsersOnlineStatus } from '../contexts/UsersOnlineStatus.js';

interface Room {
  id: number;
  name: string;
  totalMembers: number;
}

function ChatRoom({ loggedInUser, room }: { room: Room; loggedInUser: LoggedInUser }) {
  const { chatHistories, loadMoreChatHistories, loading } = useChatHistories(room.id);
  useLoadMoreHistoriesOnScrolling(loadMoreChatHistories, chatHistories, loading);

  const { chat, handleChatChange, sendChat, sending } = useSendingChat(room.id);

  return (
    <>
      <div className="viewport space-y-10 min-h-dvh bg-white">
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
              {showDayBreak && <DayBreaker date={chat.createdAt} />}
              <ChatComponent
                userId={chat.creatorId}
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

// Mount the ChatRoom component to the DOM
const container = document.getElementById('chat-room');
if (container) {
  const root = createRoot(container);
  const currentUser = JSON.parse(document.getElementById('current-user-data')!.textContent!) as LoggedInUser;
  const room = JSON.parse(document.getElementById('room-data')!.textContent!) as Room;
  root.render(
    <UsersOnlineStatus>
      <ChatRoom loggedInUser={currentUser} room={room} />
    </UsersOnlineStatus>
  );
}
