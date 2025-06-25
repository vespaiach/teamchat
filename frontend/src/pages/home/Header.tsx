import { Button } from "~/components/Button";
import { Logo } from "~/components/Logo";
import StatusIndicator from "~/components/StatusIndicator";
import { TextBox } from "~/components/TextBox";

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo size={32} className="mr-4" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">TeamChat</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:block">
              <TextBox
                name="search"
                placeholder="Search users, channels..."
                className="w-80"
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

            {/* Open Chat Button */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => (window.location.href = '/chat')}
              leftIcon={
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              }>
              Open Chat
            </Button>

            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white"
                  style={{ backgroundColor: 'var(--primary)' }}>
                  JD
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <StatusIndicator status="online" />
                </div>
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300">John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
