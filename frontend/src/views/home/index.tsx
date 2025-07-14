import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from '~/views/home/components/HomeHeader';
import { ToastContainer } from '~/global-contexts/toast';
import GroupChannels from '~/views/home/components/GroupChannels';
import DirectChannels from '~/views/home/components/DirectChannels';
import Users from '~/views/home/components//Users';
import { HomeStoreProvider } from '~/views/home/store';

export default function Home() {
  return (
    <div className="page-container">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GroupChannels />
          <DirectChannels />
          <Users />
        </div>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HomeStoreProvider>
      <Home />
      <ToastContainer />
    </HomeStoreProvider>
  </StrictMode>
);

if (process.env.NODE_ENV === 'development') {
  import('~/utils/development')
    .then(({ default: subscribeToDevelopmentChannel }) => {
      const channel = subscribeToDevelopmentChannel('frontend/src/views/home/index.tsx');
      window.addEventListener('beforeunload', channel.unsubscribe);
    })
    .catch((err) => console.error('Failed to load development utilities:', err));
}
