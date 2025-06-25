import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import PlusIcon from '~/svgs/Plus'
import { TextBox } from '~/components/TextBox';
import { Button } from '~/components/Button';
import Header from './Header';
import EditChannelModal from './EditChannelModal';
import NewMessageBadge from '~/components/NewMessageBadge';
import { ToastContainer } from '~/global-contexts/toast';

// Mock data for demonstration
const channels = [
  { id: 1, name: 'general', hasNewMessages: true, lastActivity: '2 min ago', memberCount: 12 },
  { id: 2, name: 'random', hasNewMessages: false, lastActivity: '1 hour ago', memberCount: 8 },
  { id: 3, name: 'development', hasNewMessages: true, lastActivity: '5 min ago', memberCount: 6 },
  { id: 4, name: 'design', hasNewMessages: false, lastActivity: '3 hours ago', memberCount: 4 },
  { id: 5, name: 'marketing', hasNewMessages: true, lastActivity: '15 min ago', memberCount: 5 },
];

const users = [
  { id: 1, name: 'John Doe', email: 'john@company.com', status: 'online', hasNewMessages: true, avatar: 'JD' },
  { id: 2, name: 'Sarah Wilson', email: 'sarah@company.com', status: 'online', hasNewMessages: false, avatar: 'SW' },
  { id: 3, name: 'Mike Johnson', email: 'mike@company.com', status: 'away', hasNewMessages: true, avatar: 'MJ' },
  { id: 4, name: 'Emily Chen', email: 'emily@company.com', status: 'offline', hasNewMessages: false, avatar: 'EC' },
  { id: 5, name: 'David Brown', email: 'david@company.com', status: 'online', hasNewMessages: false, avatar: 'DB' },
  { id: 6, name: 'Lisa Anderson', email: 'lisa@company.com', status: 'away', hasNewMessages: false, avatar: 'LA' },
  { id: 7, name: 'Tom Wilson', email: 'tom@company.com', status: 'offline', hasNewMessages: true, avatar: 'TW' },
];

// Sort users by online status (online, away, offline)
const sortedUsers = [...users].sort((a, b) => {
  const statusOrder = { online: 0, away: 1, offline: 2 };
  return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
});

const StatusIndicator = ({ status }: { status: string }) => {
  const colors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    offline: 'bg-gray-400',
  };

  return (
    <div
      className={`w-3 h-3 rounded-full ${
        colors[status as keyof typeof colors]
      } border-2 border-white dark:border-gray-800`}
    />
  );
};

export default function Home() {
  const [showEditChannelModal, setShowEditChannelModal] = useState(false);

  return (
    <div className="page-container">
      <Header /> 
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Channels */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Channels</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowEditChannelModal(true)}
                    leftIcon={
                      <PlusIcon className="h-4 w-4" />
                    }>
                    New Channel
                  </Button>
                </div>
              </div>

              <div className="p-2">
                {channels.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500 dark:text-gray-400">#</span>
                        <span className="font-medium text-gray-900 dark:text-white">{channel.name}</span>
                      </div>
                      {channel.hasNewMessages && <NewMessageBadge />}
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{channel.memberCount}</span>
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column - Chat Area Placeholder */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200 h-96">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white"># general</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">12 members</p>
              </div>

              <div className="p-4 h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-4">
                    <svg
                      className="h-12 w-12 text-gray-400 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">Select a channel or user to start chatting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Users & DMs */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Team Members</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {users.filter((u) => u.status === 'online').length} online
                </p>
              </div>

              <div className="p-2">
                {sortedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white"
                          style={{ backgroundColor: 'var(--primary)' }}>
                          {user.avatar}
                        </div>
                        <div className="absolute -bottom-1 -right-1">
                          <StatusIndicator status={user.status} />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                          {user.hasNewMessages && <NewMessageBadge />}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Search - Hidden on Desktop */}
            <div className="md:hidden mt-4">
              <TextBox
                name="search-mobile"
                placeholder="Search users, channels..."
                icon={
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                }
              />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--primary)' }}>
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Channels</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{channels.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Online Users</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {users.filter((u) => u.status === 'online').length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Unread Messages</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {channels.filter((c) => c.hasNewMessages).length + users.filter((u) => u.hasNewMessages).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Team Members</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{users.length}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <EditChannelModal isOpen={showEditChannelModal} onClose={setShowEditChannelModal} />
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
    <ToastContainer />
  </StrictMode>
);
