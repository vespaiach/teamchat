import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Logo } from '~/components/Logo';
import { EmailTextBox, PasswordTextBox, TextBox } from '~/components/TextBox';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import LeftBrandingPanel from '~/components/LeftBrandingPanel';
import { ToastProvider } from '~/global-contexts/toast';
import useShowServerNotifications from '~/hooks/useShowServerNotifications';
import { validateEmail, validateName, validatePassword } from '~/utils/string';
import useCSRFToken from '~/hooks/useCSRFToken';

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { csrfTokenElement } = useCSRFToken();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  useShowServerNotifications();

  const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
    if (!confirmPassword) {
      return 'Please confirm your password';
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }

    return null;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Clear previous errors
    setEmailError(null);
    setPasswordError(null);
    setFirstNameError(null);
    setLastNameError(null);
    setConfirmPasswordError(null);

    // Get form data
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirm_password') as string;
    const firstName = formData.get('first_name') as string;
    const lastName = formData.get('last_name') as string;

    // Validate fields
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    const firstNameValidationError = validateName(firstName, 'First name');
    const lastNameValidationError = validateName(lastName, 'Last name');
    const confirmPasswordValidationError = validateConfirmPassword(password, confirmPassword);

    if (emailValidationError) {
      setEmailError(emailValidationError);
    }

    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
    }

    if (firstNameValidationError) {
      setFirstNameError(firstNameValidationError);
    }

    if (lastNameValidationError) {
      setLastNameError(lastNameValidationError);
    }

    if (confirmPasswordValidationError) {
      setConfirmPasswordError(confirmPasswordValidationError);
    }

    if (
      emailValidationError ||
      passwordValidationError ||
      firstNameValidationError ||
      lastNameValidationError ||
      confirmPasswordValidationError
    ) {
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

  const handleFirstNameBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const firstName = event.target.value;
    const error = validateName(firstName, 'First name');
    setFirstNameError(error);
  };

  const handleLastNameBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const lastName = event.target.value;
    const error = validateName(lastName, 'Last name');
    setLastNameError(error);
  };

  const handleConfirmPasswordBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const confirmPassword = event.target.value;
    const form = event.target.form;
    const password = form?.elements.namedItem('password') as HTMLInputElement;
    const error = validateConfirmPassword(password?.value || '', confirmPassword);
    setConfirmPasswordError(error);
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
    // Also revalidate confirm password if it has an error
    if (confirmPasswordError) {
      setConfirmPasswordError(null);
    }
  };

  const handleFirstNameChange = () => {
    if (firstNameError) {
      setFirstNameError(null);
    }
  };

  const handleLastNameChange = () => {
    if (lastNameError) {
      setLastNameError(null);
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

          <form className="space-y-6" method="post" action="/signup" onSubmit={handleSubmit}>
            {csrfTokenElement}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <TextBox
                  name="first_name"
                  label="First Name"
                  placeholder="John"
                  autoComplete="given-name"
                  required
                  error={firstNameError || undefined}
                  disabled={isSubmitting}
                  onBlur={handleFirstNameBlur}
                  onChange={handleFirstNameChange}
                />
              </div>

              <div>
                <TextBox
                  name="last_name"
                  label="Last Name"
                  placeholder="Doe"
                  autoComplete="family-name"
                  required
                  error={lastNameError || undefined}
                  disabled={isSubmitting}
                  onBlur={handleLastNameBlur}
                  onChange={handleLastNameChange}
                />
              </div>
            </div>

            <div>
              <EmailTextBox
                name="email"
                label="Email Address"
                placeholder="john.doe@company.com"
                autoComplete="email"
                required
                error={emailError || undefined}
                disabled={isSubmitting}
                onBlur={handleEmailBlur}
                onChange={handleEmailChange}
              />
            </div>

            <div>
              <PasswordTextBox
                name="password"
                label="Password"
                placeholder="Create a strong password"
                autoComplete="new-password"
                helperText="Must be at least 6 characters with numbers and letters"
                required
                error={passwordError || undefined}
                disabled={isSubmitting}
                onBlur={handlePasswordBlur}
                onChange={handlePasswordChange}
              />
            </div>

            <div>
              <PasswordTextBox
                name="confirm_password"
                label="Confirm Password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
                error={confirmPasswordError || undefined}
                disabled={isSubmitting}
                onBlur={handleConfirmPasswordBlur}
                onChange={handleConfirmPasswordChange}
              />
            </div>

            <div>
              <Checkbox id="terms" name="terms" disabled={isSubmitting}>
                I agree to the{' '}
                <a
                  href="#"
                  className="font-medium transition duration-200 hover:opacity-80 text-primary dark:text-dark-primary">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="#"
                  className="font-medium transition duration-200 hover:opacity-80 text-primary dark:text-dark-primary">
                  Privacy Policy
                </a>
              </Checkbox>
            </div>

            <div>
              <Button type="submit" variant="primary" size="md" fullWidth disabled={isSubmitting}>
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
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
    <ToastProvider>
      <SignUp />
    </ToastProvider>
  </StrictMode>
);
