import { useEffect, useState } from 'react';
import Box from '~/components/Box';
import StatusIndicator from '~/components/StatusIndicator';
import { cx, dateToMDY } from '~/utils/string';
import { useProfilesStore } from '~/views/profiles/store';

export default function AvatarAndStats() {
  const { loggedInUser } = useProfilesStore();
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setAvatar(`/users/${loggedInUser.id}/avatar`);
    };
    img.src = `/users/${loggedInUser.id}/avatar`;
  }, [loggedInUser]);

  return (
    <Box>
      <div className="flex flex-col items-stretch md:flex-row gap-5">

        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          <div className="relative w-32 h-32">
            {avatar && <img src={avatar} className="w-full h-full rounded-full object-cover object-center" />}
            {!avatar && (
              <div
                className={cx(
                  'w-32 h-32 rounded-full border-4 border-gray-200 dark:border-gray-600',
                  'flex items-center justify-center text-3xl font-bold text-white bg-primary'
                )}>
                {loggedInUser.firstName[0].toUpperCase()}
                {loggedInUser.lastName[0].toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{loggedInUser.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{loggedInUser.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-sm text-gray-500 dark:text-gray-500">Joined {dateToMDY(loggedInUser.joinedAt)}</p>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <StatusIndicator status="online" size="small" />
              <p className="text-sm text-gray-900 dark:text-white">Online</p>
            </div>
          </div>
        </div>

        <div className="flex-1 md:mt-3">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Profile Stats</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Channels Joined</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">247</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Messages Sent</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
