import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from '~/components/Header';
import { ToastContainer } from '~/global-contexts/toast';
import { ProfilesStoreProvider } from '~/views/profiles/store';
import AvatarAndStats from './components/AvatarAndStats';
import Bio from './components/Bio';
import Status from './components/Status';
import IconButton from '~/components/IconButton';
import LogOutIcon from '~/svgs/LogOut';
import { del } from '~/utils/remote';

export function Profiles() {
  const handleLogout = async () => {
    await del('/signout');
    window.location.href = '/signin';
  };

  return (
    <div className="page-container">
      <Header
        pageTitle="Profile"
        onBack={() => {
          window.location.href = '/home';
        }}>
        <IconButton icon={<LogOutIcon className="h-6 w-6" />} onClick={handleLogout} />
      </Header>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AvatarAndStats />
        <div className="mt-6 flex md:flex-row flex-col gap-6">
          <Bio />
          <Status />
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProfilesStoreProvider>
      <Profiles />
      <ToastContainer />
    </ProfilesStoreProvider>
  </StrictMode>
);
