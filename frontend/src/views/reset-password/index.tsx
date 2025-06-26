import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from '~/components/Logo';
import { PasswordTextBox } from '~/components/TextBox';
import { Button } from '~/components/Button';
import LeftBrandingPanel from '~/components/LeftBrandingPanel';
import { ToastContainer } from '~/global-contexts/toast';
import useShowServerNotifications from '~/hooks/useShowServerNotifications';
import useCSRFToken from '~/hooks/useCSRFToken';
import { validatePassword } from '~/utils/string';

const token = window.location.pathname.split('/').pop() || '';

export default function ResetPassword() {
  const { csrfTokenElement } = useCSRFToken();
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useShowServerNotifications();

  if (!token) {
    window.location.href = '/signin';
    return;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Clear previous errors
    setPasswordError(null);
    setConfirmPasswordError(null);

    // Get form data
    const formData = new FormData(event.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('password_confirmation') as string;

    // Validate fields
    const passwordValidationError = validatePassword(password);
    let confirmPasswordValidationError: string | null = null;

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
    }

    if (!confirmPassword) {
      confirmPasswordValidationError = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      confirmPasswordValidationError = 'Passwords do not match';
    }

    if (confirmPasswordValidationError) {
      setConfirmPasswordError(confirmPasswordValidationError);
    }

    if (passwordValidationError || confirmPasswordValidationError) {
      return;
    }

    setIsSubmitting(true);

    event.currentTarget.submit();
  };

  const handlePasswordBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const password = event.target.value;
    const error = validatePassword(password);
    setPasswordError(error);
  };

  const handleConfirmPasswordBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const confirmPassword = event.target.value;
    const form = event.target.closest('form');
    const passwordInput = form?.querySelector('input[name="password"]') as HTMLInputElement;
    const password = passwordInput?.value || '';

    let error: string | null = null;
    if (!confirmPassword) {
      error = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      error = 'Passwords do not match';
    }
    setConfirmPasswordError(error);
  };

  const handlePasswordChange = () => {
    if (passwordError) {
      setPasswordError(null);
    }
  };

  const handleConfirmPasswordChange = () => {
    if (confirmPasswordError) {
      setConfirmPasswordError(null);
    }
  };

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

          <form className="space-y-6" method="post" action={`/reset-password/${token}`} onSubmit={handleSubmit}>
            {csrfTokenElement}
            <PasswordTextBox
              name="password"
              label="New Password"
              placeholder="Enter your new password"
              autoComplete="new-password"
              helperText="Must be at least 8 characters with numbers and letters"
              required
              error={passwordError || undefined}
              disabled={isSubmitting}
              onBlur={handlePasswordBlur}
              onChange={handlePasswordChange}
            />

            <PasswordTextBox
              name="password_confirmation"
              label="Confirm New Password"
              placeholder="Confirm your new password"
              autoComplete="new-password"
              required
              error={confirmPasswordError || undefined}
              disabled={isSubmitting}
              onBlur={handleConfirmPasswordBlur}
              onChange={handleConfirmPasswordChange}
            />

            <div>
              <Button type="submit" variant="primary" size="md" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Updating Password...' : 'Update Password'}
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
    <ToastContainer />
  </StrictMode>
);
