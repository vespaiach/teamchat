import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from '~/components/Logo';
import { EmailTextBox } from '~/components/TextBox';
import { Button } from '~/components/Button';
import LeftBrandingPanel from '~/components/LeftBrandingPanel';
import { ToastProvider } from '~/global-contexts/toast';
import useShowServerErrors from '~/hooks/useAppErrors';
import useCSRFToken from '~/hooks/useCSRFToken';
import { validateEmail } from '~/utils/string';

export default function ForgotPassword() {
  const { csrfTokenElement } = useCSRFToken();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useShowServerErrors();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmailError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    const emailValidationError = validateEmail(email);

    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    setIsSubmitting(true);

    event.currentTarget.submit();
  };

  const handleEmailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const email = event.target.value;
    const error = validateEmail(email);
    setEmailError(error);
  };

  const handleEmailChange = () => {
    if (emailError) {
      setEmailError(null);
    }
  };

  return (
    <div className="page-container flex">
      {/* Left side - Branding */}
      <LeftBrandingPanel>
        <h1 className="text-4xl font-bold mb-6">Password Recovery</h1>
        <p className="text-xl mb-8 opacity-90">
          Don't worry, it happens to the best of us. We'll help you get back into your account.
        </p>
        <div className="space-y-4 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Secure password reset</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Email verification</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Account protection</span>
          </div>
        </div>
      </LeftBrandingPanel>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <Logo size={50} className="justify-center mb-4" />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Forgot your password?</h2>
            <p className="text-gray-600 dark:text-gray-400">
              No worries! Enter your email and we'll send you reset instructions.
            </p>
          </div>

          <form className="space-y-6" method="post" action="/forgot-password" onSubmit={handleSubmit}>
            {csrfTokenElement}
            <EmailTextBox
              name="email"
              label="Email Address"
              placeholder="Enter your email address"
              autoComplete="email"
              helperText="We'll send password reset instructions to this email"
              error={emailError || undefined}
              disabled={isSubmitting}
              onBlur={handleEmailBlur}
              onChange={handleEmailChange}
              required
            />

            <div>
              <Button 
                type="submit" 
                variant="primary" 
                size="md" 
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
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
    <ToastProvider>
      <ForgotPassword />
    </ToastProvider>
  </StrictMode>
);
