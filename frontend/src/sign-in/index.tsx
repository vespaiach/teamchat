import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from '~/components/Logo';
import { EmailTextBox, PasswordTextBox } from '~/components/TextBox';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import LeftBrandingPanel from '~/components/LeftBrandingPanel';
import { ToastProvider } from '~/global-contexts/toast';
import useShowServerErrors from '~/hooks/useAppErrors';

export function SignIn() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useShowServerErrors();

  const validateEmail = (email: string): string | null => {
    if (!email.trim()) {
      return 'Email is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (!password) {
      return 'Password is required';
    }
    
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    
    return null;
  };

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

  useEffect(() => {
    setCsrfToken(document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? null);
  }, []);



  return (
    <div className="page-container flex">
      <LeftBrandingPanel />

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
            {csrfToken && <input type="hidden" name="authenticity_token" value={csrfToken} />}
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
