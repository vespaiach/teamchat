import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from '~/components/Logo';
import { Button } from '~/components/Button';
import LeftBrandingPanel from '~/components/LeftBrandingPanel';
import ExclamationIcon from '~/svgs/Exclamation';

export default function PasswordResetExpired() {
  return (
    <div className="page-container flex">
      <LeftBrandingPanel>
        <h1 className="text-4xl font-bold mb-6">Link Expired</h1>
        <p className="text-xl mb-8 opacity-90">
          Security is our priority. Reset links expire quickly to keep your account safe.
        </p>
        <div className="space-y-4 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Enhanced security protection</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Request a new reset link</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Quick and secure process</span>
          </div>
        </div>
      </LeftBrandingPanel>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <Logo size={50} className="justify-center mb-4" />
          </div>

          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
              <ExclamationIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reset Link Expired</h2>
            <p className="text-gray-600 dark:text-gray-400">
              This password reset link has expired or has already been used. For security reasons, reset links are only
              valid for a limited time.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              type="button"
              variant="primary"
              size="md"
              fullWidth
              onClick={() => (window.location.href = '/forgot-password')}>
              Request New Reset Link
            </Button>

            <Button
              type="button"
              variant="outline"
              size="md"
              fullWidth
              onClick={() => (window.location.href = '/signin')}>
              Back to Sign In
            </Button>
          </div>

          <div className="mt-8">
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ExclamationIcon className="h-5 w-5 text-orange-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    <strong>Security note:</strong> Reset links expire after 24 hours to protect your account from
                    unauthorized access.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Need help?{' '}
              <a
                href="mailto:support@teamchat.com"
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200">
                Contact support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PasswordResetExpired />
  </StrictMode>
);
