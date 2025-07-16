import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from '~/components/Logo';
import { TextBox } from '~/components/TextBox';
import { Button } from '~/components/Button';
import GroupChannels from '~/views/conversations/SideBar/GroupChannels';
import DirectChannels from '~/views/conversations/SideBar/DirectChannels';
import { ConversationsStoreProvider, useConversationsStore } from '~/views/conversations/store';
import PlusIcon from '~/svgs/Plus';
import MagnifierIcon from '~/svgs/Magnifier';
import UserAvatar from '../UserAvatar';

export default function Conversations() {
  const { selectedChannelId, selectChannel, groupConversations, directConversations, loggedInUser } = useConversationsStore();

  // Set default selected channel if not set
  useEffect(() => {
    if (selectedChannelId === null) {
      const channelId = parseInt(new URLSearchParams(window.location.search).get('channel') ?? '0', 10);

      const channel = groupConversations.find((c) => c.id === channelId);
      if (channel) {
        selectChannel(channel.id);
        return;
      }

      const dm = directConversations.find((c) => c.id === channelId);
      if (dm) {
        selectChannel(dm.id);
        return;
      }

      if (groupConversations.length > 0) {
        selectChannel(groupConversations[0].id);
      }

      if (directConversations.length > 0) {
        selectChannel(directConversations[0].id);
      }
    }
  }, [selectedChannelId, groupConversations, directConversations, selectChannel]);

  return (
    <div className="page-container flex">
      <div className="w-80 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-200">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Logo size={28} />
            <div className="flex items-center space-x-2">
              <Button variant="primary" size="sm" className="px-3" leftIcon={<PlusIcon className="h-4 w-4" />}>
                New
              </Button>
            </div>
          </div>

          <TextBox
            name="search"
            placeholder="Search TeamChat"
            size="sm"
            icon={<MagnifierIcon className="h-4 w-4 text-gray-400" />}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          <GroupChannels />
          <DirectChannels />
        </div>

        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200">
            <div className="relative">
              <UserAvatar user={loggedInUser} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{loggedInUser.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between transition-colors duration-200">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white"># general</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              <span>12 members</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (window.location.href = '/home')}
              leftIcon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              }>
              Home
            </Button>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }>
              Details
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {[].map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
              <div className="flex-shrink-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white"
                  style={{ backgroundColor: 'var(--primary)' }}>
                  {message.avatar}
                </div>
              </div>
              <div className={`flex-1 ${message.isOwnMessage ? 'text-right' : ''}`}>
                <div className={`flex items-center space-x-2 mb-1 ${message.isOwnMessage ? 'justify-end' : ''}`}>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{message.user}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{message.timestamp}</span>
                </div>
                <div
                  className={`inline-block max-w-lg px-4 py-2 rounded-lg ${
                    message.isOwnMessage ? 'text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}
                  style={message.isOwnMessage ? { backgroundColor: 'var(--primary)' } : {}}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <TextBox
                name="message"
                placeholder="Type a message..."
                className="pr-20"
                icon={
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                }
                iconPosition="right"
              />
            </div>
            <Button
              variant="primary"
              size="md"
              leftIcon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              }>
              Send
            </Button>
          </div>

          {/* Message Options */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-3">
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z"
                  />
                </svg>
              </button>
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button>
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400">
              Press{' '}
              <kbd className="px-1 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                Enter
              </kbd>{' '}
              to send
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConversationsStoreProvider>
      <Conversations />
    </ConversationsStoreProvider>
  </StrictMode>
);
