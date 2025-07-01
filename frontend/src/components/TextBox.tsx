import React, { forwardRef, useMemo } from 'react';
import { cx } from '~/utils/string';

export interface TextBoxProps
  extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  required?: boolean;
  type?: string;
  value?: string;
  disabled?: boolean;
  name?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

// Size variants
const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-3 py-3 text-base',
  lg: 'px-4 py-4 text-lg',
};

// Variant styles with dark mode support
const variantClasses = {
  default: 'border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900 dark:text-white',
  filled: 'border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white',
  outlined: 'border-2 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900 dark:text-white',
};

export function TextBox(props: TextBoxProps) {
  const {
    label,
    error,
    helperText,
    variant = 'default',
    size = 'md',
    icon,
    iconPosition = 'left',
    fullWidth = true,
    required = false,
    className = '',
    id,
    type = 'text',
    value,
    disabled = false,
    name,
    placeholder = '',
    onChange,
    onBlur,
    ...rest
  } = props;

  const inputId = useMemo(() => id || `textbox-${Math.random().toString(36).substring(2, 9)}`, [id]);

  // Base input classes with dark mode support
  const baseInputClasses = cx(
    'rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500',
    'focus:outline-none focus:ring-2 focus:border-transparent focus:ring-blue-600',
    'transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed',
    'dark:disabled:bg-gray-800 invalid:ring-primary',
    fullWidth ? 'w-full' : '',
    sizeClasses[size],
    variantClasses[variant],
    error ? 'border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400' : '',
    icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '',
    className
  );

  return (
    <div {...rest} className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 dark:text-red-400 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div
            className={cx(
              'absolute inset-y-0',
              'flex items-center pointer-events-none text-gray-400 dark:text-gray-500',
              iconPosition === 'left' ? 'left-0 pl-3' : 'right-0 pr-3'
            )}>
            {icon}
          </div>
        )}

        <input
          name={name}
          disabled={disabled}
          value={value}
          required={required}
          type={type}
          id={inputId}
          className={baseInputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>

      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={`${inputId}-helper`} className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {helperText}
        </p>
      )}
    </div>
  );
}

// Password TextBox variant
export interface PasswordTextBoxProps extends Omit<TextBoxProps, 'type'> {
  showToggle?: boolean;
}

export const PasswordTextBox = forwardRef<HTMLInputElement, PasswordTextBoxProps>(
  ({ showToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const eyeIcon = (
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors pointer-events-auto"
        tabIndex={-1}>
        {showPassword ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
            />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        )}
      </button>
    );

    return (
      <TextBox
        ref={ref}
        type={showPassword ? 'text' : 'password'}
        icon={showToggle ? eyeIcon : undefined}
        iconPosition="right"
        {...props}
      />
    );
  }
);

PasswordTextBox.displayName = 'PasswordTextBox';

// Email TextBox variant
export const EmailTextBox = forwardRef<HTMLInputElement, TextBoxProps>((props, ref) => {
  const emailIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
      />
    </svg>
  );

  return <TextBox ref={ref} type="email" icon={emailIcon} iconPosition="left" {...props} />;
});

EmailTextBox.displayName = 'EmailTextBox';
