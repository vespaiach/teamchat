import { Button } from '~/components/Button';
import { TextBox } from '~/components/TextBox';
import MessageIcon from '~/svgs/Message';
import UserMenu from '~/views/home/components/UserMenu';
import MagnifierIcon from '~/svgs/Magnifier';
import Header from '~/components/Header';

export default function HomeHeader() {
  return (
    <Header pageTitle="Home">
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
    </Header>
  );
}
