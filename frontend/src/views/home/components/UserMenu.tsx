import { useState } from 'react';
import UserAvatar from '~/views/UserAvatar';
import { useHomeStore } from '~/views/home/store';
import ChevronDownIcon from '~/svgs/ChevronDown';
import ChevronUpIcon from '~/svgs/ChevronUp';
import LogOutIcon from '~/svgs/LogOut';
import SettingsIcon from '~/svgs/Settings';
import UserIcon from '~/svgs/User';
import MenuItem from '~/components/MenuItem';
import { useClickOutside } from '~/hooks/useClickOutside';
import { del } from '~/utils/remote';

export default function UserMenu() {
  const { loggedInUser } = useHomeStore();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const handleLogout = async () => {
    setIsOpen(false);
    await del('/signout');
    window.location.href = '/signin';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors duration-200">
        <UserAvatar user={loggedInUser} />
        <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">
          {loggedInUser.name}
        </span>
        {isOpen ? (
          <ChevronUpIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        ) : (
          <ChevronDownIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        )}
      </button>

      {isOpen && (
        <div
          ref={ref}
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
          <MenuItem
            onClick={() => {
              setIsOpen(false);
              window.location.href = '/profile';
            }}
            className="text-gray-700 dark:text-gray-300"
            iconRNode={<UserIcon className="h-4 w-4" />}
            labelRNode={<span>Update Profile</span>}
          />

          <MenuItem
            onClick={() => {
              setIsOpen(false);
              alert('Settings clicked');
            }}
            className="text-gray-700 dark:text-gray-300"
            iconRNode={<SettingsIcon className="h-4 w-4" />}
            labelRNode={<span>Settings</span>}
          />

          <hr className="my-1 border-gray-200 dark:border-gray-600" />

          <MenuItem
            onClick={handleLogout}
            className="text-red-600 dark:text-red-400"
            iconRNode={<LogOutIcon className="h-4 w-4" />}
            labelRNode={<span>Logout</span>}
          />
        </div>
      )}
    </div>
  );
}
