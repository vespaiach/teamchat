import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from '~/components/Logo';
import { Button } from '~/components/Button';
import LeftBrandingPanel from '~/components/LeftBrandingPanel';
import EmailIcon from '~/svgs/Email';
import ExclamationIcon from '~/svgs/Exclamation';

export default function CheckEmail() {
  return (
    <div className="page-container flex">
      <LeftBrandingPanel>
        <h1 className="text-4xl font-bold mb-6">Check Your Inbox</h1>
        <p className="text-xl mb-8 opacity-90">We've sent you detailed instructions to reset your password securely.</p>
        <div className="space-y-4 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Email sent instantly</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Check spam folder if needed</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Link expires in 24 hours</span>
          </div>
        </div>
      </LeftBrandingPanel>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <Logo size={50} className="justify-center mb-4" />
          </div>

          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6 bg-primary-light dark:bg-primary-dark">
              <EmailIcon className="h-8 w-8 text-primary dark:text-dark-primary" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Check your email</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We've sent password reset instructions to your email address.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              type="button"
              variant="primary"
              size="md"
              fullWidth
              onClick={() => (window.location.href = '/signin')}>
              Back to Sign In
            </Button>
          </div>

          <div className="mt-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationIcon className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Didn't receive the email?</h3>
                  <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Check your spam or junk folder</li>
                      <li>Make sure you entered the correct email address</li>
                      <li>Wait a few minutes for the email to arrive</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Need help?{' '}
              <a
                href="mailto:nta.toan@gmail.com"
                className="font-medium transition duration-200 hover:opacity-80 text-primary dark:text-dark-primary">
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
    <CheckEmail />
  </StrictMode>
);

if (process.env.NODE_ENV === 'development') {
  import('~/utils/development')
    .then(({ default: subscribeToDevelopmentChannel }) => {
      const channel = subscribeToDevelopmentChannel();
      window.addEventListener('beforeunload', () => channel.unsubscribe());
    })
    .catch((err) => console.error('Failed to load development utilities:', err));
}
