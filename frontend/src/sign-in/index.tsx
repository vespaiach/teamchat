import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from '../components/Logo';
import { EmailTextBox, PasswordTextBox } from '../components/TextBox';
import { Button } from '../components/Button';
import { Checkbox } from '../components/Checkbox';
import LeftBrandingPanel from '~/components/LeftBrandingPanel';

export function SignIn() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

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

          <form className="space-y-6" method="post" action="/signin">
            {csrfToken && <input type="hidden" name="authenticity_token" value={csrfToken} />}
            <EmailTextBox name="email" label="Email" placeholder="Enter your email" autoComplete="email" required />

            <PasswordTextBox
              name="password"
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <div className="flex items-center justify-between">
              <Checkbox id="remember-me" name="remember-me">
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
              <Button type="submit" variant="primary" size="md" fullWidth onClick={undefined}>
                Sign in
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
    <SignIn />
  </StrictMode>
);
