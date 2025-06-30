import { Button } from '~/components/Button';
import IconButton from '~/components/IconButton';
import { Logo } from '~/components/Logo';
import { TextBox } from '~/components/TextBox';
import PlusIcon from '~/svgs/Plus';
import LoggedInUser from './LoggedInUser';

export default function SideBar() {
  return (
    <div className="w-80 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-200">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <Logo size={28} />
          <div className="flex items-center space-x-2">
            <Button
              variant="primary"
              size="sm"
              className="px-3"
              leftIcon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }>
              New
            </Button>
          </div>
        </div>

        {/* Search */}
        <TextBox
          name="search"
          placeholder="Search TeamChat"
          size="sm"
          icon={
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Channels Section */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
              <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Channels
            </h3>
            <IconButton
              variant="ghost"
              size="sm"
              className="p-1 h-6 w-6"
              aria-label="Add channel"
              icon={<PlusIcon />}
            />
          </div>

          <div className="space-y-1">{/* Channels go here  */}</div>
        </div>

        {/* Direct Messages Section */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center">
              <svg className="h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Direct Messages
            </h3>
            <IconButton
              variant="ghost"
              size="sm"
              className="p-1 h-6 w-6"
              aria-label="Start direct message"
              icon={<PlusIcon />}
            />
          </div>

          <div className="space-y-1">{/* Direct message go here  */}</div>
        </div>
      </div>

      <LoggedInUser />
    </div>
  );
}
