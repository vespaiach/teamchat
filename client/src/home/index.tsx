import { createRoot } from 'react-dom/client';
import { UsersOnlineStatus } from '../contexts/UsersOnlineStatus.js';
import UserAvatar from '../componets/UserAvatar.js';
import Magnifier from '../componets/Svg/Magnifier.js';
import IconButton from '../componets/IconButton.js';
import HorizontalUserList from './HorizontalUserList.js';

function Home({ loggedInUser }: { loggedInUser: LoggedInUser }) {
  return (
    <div className="viewport">
      <div className="flex items-center justify-between p-4">
        <IconButton>
          <Magnifier />
        </IconButton>
        <strong className="text-lg">Home</strong>
        <UserAvatar name={loggedInUser.name} src={loggedInUser.avatar} online />
      </div>
      <HorizontalUserList />
    </div>
  );
}

// Mount the ChatRoom component to the DOM
const container = document.getElementById('home');
if (container) {
  const root = createRoot(container);
  const currentUser = JSON.parse(document.getElementById('current-user-data')!.textContent!) as LoggedInUser;
  root.render(
    <UsersOnlineStatus>
      <Home loggedInUser={currentUser} />
    </UsersOnlineStatus>
  );
}
