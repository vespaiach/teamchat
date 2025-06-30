import Box from '~/components/Box';
import StatusIndicator from '~/components/StatusIndicator';
import { put } from '~/utils/remote';

export default function Status() {
  const handleStatusChange = (status: 'online' | 'offline') => {
    put('/profile', { status })
  };

  return (
    <Box className="flex-1">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Status</h2>
      <div className="space-y-4">
        <div
          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
          role="menuitem"
          onClick={() => {
            handleStatusChange('online');
          }}>
          <div className="flex items-center gap-2">
            <StatusIndicator status="online" size="small" />
            <p className="text-sm text-gray-900 dark:text-white">Online</p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Available to chat</p>
        </div>

        <div
          className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
          role="menuitem"
          onClick={() => {
            handleStatusChange('online');
          }}>
          <div className="flex items-center gap-2">
            <StatusIndicator status="offline" size="small" />
            <p className="text-sm text-gray-900 dark:text-white">Offline</p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Available to chat</p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Status</h3>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Online</p>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
