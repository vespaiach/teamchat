import React, { forwardRef } from 'react';
import { cx } from '~/utils/string';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Size variants
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
      xl: 'px-8 py-5 text-xl',
    };

    // Variant styles with dark mode support
    const variantClasses = {
      primary: cx(
        'text-white border border-transparent shadow-sm',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'dark:focus:ring-offset-gray-900',
        'ring-primary bg-primary border-primary hover:not-disabled:bg-primary-hover'
      ),
      secondary: cx(
        'text-gray-700 bg-gray-100 border border-gray-300 shadow-sm',
        'hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
        'dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700',
        'dark:focus:ring-offset-gray-900 dark:focus:ring-gray-400'
      ),
      outline: cx(
        'text-primary bg-transparent border border-primary shadow-sm hover:not-disabled:bg-primary-light',
        'dark:text-dark-primary dark:border-dark-primary hover:not-disabled:bg-dark-primary-light',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 ring-primary dark:ring-dark-primary',
      ),
      ghost: cx(
        'text-gray-700 bg-transparent border border-transparent',
        'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
        'dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-offset-gray-900 dark:focus:ring-gray-400'
      ),
      danger: cx(
        'text-white bg-red-600 border border-transparent shadow-sm',
        'hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500',
        'dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-offset-gray-900'
      ),
    };

    // Base classes
    const baseClasses = cx(
      'inline-flex items-center justify-center font-medium rounded-lg',
      'disabled:opacity-50 disabled:cursor-not-allowed transition duration-200',
      fullWidth ? 'w-full' : '',
      sizeClasses[size],
      variantClasses[variant],
      className
    );

    const isDisabled = disabled || loading;

    return (
      <button ref={ref} className={baseClasses} disabled={isDisabled} {...props}>
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {leftIcon && !loading && <span className="mr-2 flex-shrink-0">{leftIcon}</span>}

        <span>{children}</span>

        {rightIcon && <span className="ml-2 flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Icon Button variant for cases where you only need an icon
export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'leftIcon' | 'rightIcon'> {
  icon: React.ReactNode;
  'aria-label': string;
}

// Button Group component for related actions
export interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className = '', orientation = 'horizontal' }) => {
  const orientationClasses = {
    horizontal: 'flex flex-row',
    vertical: 'flex flex-col',
  };

  return (
    <div className={cx(orientationClasses[orientation], className)}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const isFirst = index === 0;
          const isLast = index === React.Children.count(children) - 1;

          let additionalClasses = '';
          if (orientation === 'horizontal') {
            additionalClasses =
              cx(
                !isFirst ? '-ml-px' : '',
                !isFirst && !isLast ? 'rounded-none' : '',
                isFirst && !isLast ? 'rounded-r-none' : '',
                !isFirst && isLast ? 'rounded-l-none' : ''
              ) ?? '';
          } else {
            additionalClasses =
              cx(
                !isFirst ? '-mt-px' : '',
                !isFirst && !isLast ? 'rounded-none' : '',
                isFirst && !isLast ? 'rounded-b-none' : '',
                !isFirst && isLast ? 'rounded-t-none' : ''
              ) ?? '';
          }

          return React.cloneElement(child, {
            ...(child.props as any),
            className: `${(child.props as any).className || ''} ${additionalClasses}`.trim(),
          });
        }
        return child;
      })}
    </div>
  );
};
