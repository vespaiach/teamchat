import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TextBox } from '~/components/TextBox';
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

          <div className="lg:col-span-1">
            <Users />
            <div className="md:hidden mt-4">
              <TextBox
                name="search-mobile"
                placeholder="Search users, channels..."
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
          </div>
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
