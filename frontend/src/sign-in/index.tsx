import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from '~/components/Logo';
import { EmailTextBox, PasswordTextBox } from '~/components/TextBox';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import LeftBrandingPanel from '~/components/LeftBrandingPanel';
import { ToastProvider } from '~/global-contexts/toast';
import useShowServerErrors from '~/hooks/useAppErrors';
import useCSRFToken from '~/hooks/useCSRFToken';
import { validateEmail, validatePassword } from '~/utils/string';

export function SignIn() {
  const { csrfTokenElement } = useCSRFToken();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useShowServerErrors();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Clear previous errors
    setEmailError(null);
    setPasswordError(null);

    // Get form data
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validate fields
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    if (emailValidationError) {
      setEmailError(emailValidationError);
    }

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
    }

    if (emailValidationError || passwordValidationError) {
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

  const handlePasswordBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const password = event.target.value;
    const error = validatePassword(password);
    setPasswordError(error);
  };

  const handleEmailChange = () => {
    if (emailError) {
      setEmailError(null);
    }
  };

  const handlePasswordChange = () => {
    if (passwordError) {
      setPasswordError(null);
    }
  };

  return (
    <div className="page-container flex">
      <LeftBrandingPanel>
        <h1 className="text-4xl font-bold mb-6">TeamChat</h1>
        <p className="text-xl mb-8 opacity-90">
          Bring your team together with seamless communication and collaboration.
        </p>
        <div className="space-y-4 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Real-time messaging</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>File sharing & collaboration</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span>Organized channels & threads</span>
          </div>
        </div>
      </LeftBrandingPanel>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-8">
            <Logo size={50} className="justify-center mb-4" />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sign in to TeamChat</h2>
            <p className="text-gray-600 dark:text-gray-400">Welcome back! Please enter your details.</p>
          </div>

          <form className="space-y-6" method="post" action="/signin" onSubmit={handleSubmit}>
            {csrfTokenElement}
            <EmailTextBox
              name="email"
              label="Email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              error={emailError || undefined}
              disabled={isSubmitting}
              onBlur={handleEmailBlur}
              onChange={handleEmailChange}
            />

            <PasswordTextBox
              name="password"
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              error={passwordError || undefined}
              disabled={isSubmitting}
              onBlur={handlePasswordBlur}
              onChange={handlePasswordChange}
            />

            <div className="flex items-center justify-between">
              <Checkbox id="remember-me" name="remember-me" disabled={isSubmitting}>
                Remember me
              </Checkbox>

              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium transition duration-200 hover:opacity-80 text-primary dark:text-dark-primary">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button type="submit" variant="primary" size="md" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="font-medium transition duration-200 hover:opacity-80 text-primary dark:text-dark-primary">
              Sign up for free
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <SignIn />
    </ToastProvider>
  </StrictMode>
);
