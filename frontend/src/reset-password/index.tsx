import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from '~/components/Logo';
import { PasswordTextBox } from '~/components/TextBox';
import { Button } from '~/components/Button';
import LeftBrandingPanel from '~/components/LeftBrandingPanel';

export default function ResetPassword() {
  
  return (
    <div className="page-container flex">
      <LeftBrandingPanel>
        <h1 className="text-4xl font-bold mb-6">Create New Password</h1>
        <p className="text-xl mb-8 opacity-90">
          You're almost there! Create a strong new password to secure your account.
        </p>
        <div className="space-y-4 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>At least 8 characters</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Include numbers and letters</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Mix of uppercase and lowercase</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Consider special characters</span>
          </div>
        </div>
      </LeftBrandingPanel>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="w-full max-w-md">
        <div className="lg:hidden text-center mb-8">
            <Logo size={50} className="justify-center mb-4" />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Reset your password</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your new password below to complete the reset process.
            </p>
          </div>

          <form className="space-y-6">
            <PasswordTextBox
              name="password"
              label="New Password"
              placeholder="Enter your new password"
              autoComplete="new-password"
              helperText="Must be at least 8 characters with numbers and letters"
              required
            />

            <PasswordTextBox
              name="confirmPassword"
              label="Confirm New Password"
              placeholder="Confirm your new password"
              autoComplete="new-password"
              required
            />

            <div>
              <Button type="submit" variant="primary" size="md" fullWidth>
                Update Password
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Remember your password?{' '}
              <a
                href="/signin"
                className="font-medium transition duration-200 hover:opacity-80 text-primary dark:text-dark-primary">
                Back to sign in
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
    <ResetPassword />
  </StrictMode>
);
