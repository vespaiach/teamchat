import { Fragment, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createConsumer } from '@rails/actioncable';
import { MyChat, TheirChat, DayBreak } from './Chat.js';
import useChatHistories from './useChatHistories.js';

const consumer = createConsumer();

function ChatRoom({ roomId, loggedInUserId }: { roomId: number; loggedInUserId: number }) {
  const { chatHistories, loadMoreChatHistories, loading } = useChatHistories(roomId);

  return (
    <div className="viewport space-y-10">
      {chatHistories.map((chat, index) => {
        const showDayBreak =
          index === 0 || chatHistories[index - 1].createdAt.toDateString() !== chat.createdAt.toDateString();
        const ChatComponent = chat.creatorId === loggedInUserId ? MyChat : TheirChat;

        return (
          <Fragment key={chat.id}>
            {showDayBreak && <DayBreak date={chat.createdAt} />}
            <ChatComponent
              creatorAvatar={chat.creatorAvatar}
              creatorName={chat.creatorName}
              createdAt={chat.createdAt}
              messages={chat.messages}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

const container = document.getElementById('chat-room');
if (container) {
  const root = createRoot(container);
  root.render(
    <ChatRoom roomId={parseInt(container.dataset.roomId)} loggedInUserId={parseInt(container.dataset.loggedInUserId)} />
  );
}
