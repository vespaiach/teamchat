import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from '~/components/Logo';
import { EmailTextBox, PasswordTextBox, TextBox } from '~/components/TextBox';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import LeftBrandingPanel from '~/components/LeftBrandingPanel';

export default function SignUp() {
  return (
    <div className="page-container flex">
      <LeftBrandingPanel />

      {/* Right side - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900 transition-colors duration-200">
        <div className="w-full max-w-md">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-8">
            <Logo size={50} className="justify-center mb-4" />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create your account</h2>
            <p className="text-gray-600 dark:text-gray-400">Get started with TeamChat today</p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextBox name="firstName" label="First Name" placeholder="John" autoComplete="given-name" required />

              <TextBox name="lastName" label="Last Name" placeholder="Doe" autoComplete="family-name" required />
            </div>

            <EmailTextBox
              name="email"
              label="Email Address"
              placeholder="john.doe@company.com"
              autoComplete="email"
              required
            />

            <TextBox name="company" label="Company Name" placeholder="Your Company" autoComplete="organization" />

            <PasswordTextBox
              name="password"
              label="Password"
              placeholder="Create a strong password"
              autoComplete="new-password"
              helperText="Must be at least 8 characters with numbers and letters"
              required
            />

            <PasswordTextBox
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              autoComplete="new-password"
              required
            />

            <Checkbox id="terms" name="terms" required>
              I agree to the{' '}
              <a
                href="#"
                className="font-medium transition duration-200 hover:opacity-80"
                style={{ color: 'var(--primary)' }}>
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="#"
                className="font-medium transition duration-200 hover:opacity-80"
                style={{ color: 'var(--primary)' }}>
                Privacy Policy
              </a>
            </Checkbox>

            <Checkbox id="newsletter" name="newsletter">
              Send me product updates and team collaboration tips
            </Checkbox>

            <div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                onClick={() => (window.location.href = '/home')}>
                Create Account
              </Button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a
              href="/signin"
              className="font-medium transition duration-200 hover:opacity-80 text-primary dark:text-dark-primary">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SignUp />
  </StrictMode>
);
