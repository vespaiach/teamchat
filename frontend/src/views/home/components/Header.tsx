import { Button } from '~/components/Button';
import { Logo } from '~/components/Logo';
import { TextBox } from '~/components/TextBox';
import MessageIcon from '~/svgs/Message';
import UserMenu from '~/views/home/components/UserMenu';
import MagnifierIcon from '~/svgs/Magnifier';
import { useHomeStore } from '~/views/home/store';

export default function Header() {
  const { loggedInUser } = useHomeStore();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Logo size={32} className="mr-4" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">TeamChat</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <TextBox
                name="search"
                placeholder="Search users, channels..."
                className="w-80"
                icon={<MagnifierIcon className="h-5 w-5 text-gray-400" />}
              />
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => (window.location.href = '/conversations')}
              leftIcon={<MessageIcon className="w-4 h-4" />}>
              Open Chat
            </Button>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
