import React, { forwardRef, useMemo } from 'react';
import { cx } from '~/utils/string';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  description?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'card';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, size = 'md', variant = 'default', className = '', id, children, ...props }, ref) => {
    const checkboxId = useMemo(() => id || `checkbox-${Math.random().toString(36).substring(2, 9)}`, [id]);

    // Size variants
    const sizeClasses = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };

    // Base checkbox classes
    const baseCheckboxClasses = cx(
      'border-gray-300 dark:border-gray-600 rounded accent-primary',
      'dark:bg-gray-800 transition-colors duration-200',
      'focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed',
      sizeClasses[size],
      error ? 'border-red-500 dark:border-red-400' : '',
      className
    );

    // Container classes based on variant
    const containerClasses =
      variant === 'card'
        ? 'p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200'
        : 'flex items-start space-x-3';

    const content = (
      <>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={baseCheckboxClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${checkboxId}-error` : description ? `${checkboxId}-description` : undefined}
          {...props}
        />

        <div className="flex-1">
          {label && (
            <label
              htmlFor={checkboxId}
              className={cx(
                'block font-medium text-gray-700 dark:text-gray-300 cursor-pointer',
                size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-base' : 'text-sm',
                variant === 'card' ? 'mb-1' : ''
              )}>
              {label}
            </label>
          )}

          {children && !label && (
            <label
              htmlFor={checkboxId}
              className={cx(
                'block font-medium text-gray-700 dark:text-gray-300 cursor-pointer',
                size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-base' : 'text-sm',
                variant === 'card' ? 'mb-1' : ''
              )}>
              {children}
            </label>
          )}

          {description && (
            <p
              id={`${checkboxId}-description`}
              className={cx('text-gray-500 dark:text-gray-400 mt-1', size === 'sm' ? 'text-xs' : 'text-sm')}>
              {description}
            </p>
          )}

          {error && (
            <p
              id={`${checkboxId}-error`}
              className={cx('text-red-600 dark:text-red-400 mt-1', size === 'sm' ? 'text-xs' : 'text-sm')}>
              {error}
            </p>
          )}
        </div>
      </>
    );

    if (variant === 'card') {
      return (
        <div className={containerClasses}>
          <div className="flex items-start space-x-3">{content}</div>
        </div>
      );
    }

    return <div className={containerClasses}>{content}</div>;
  }
);

Checkbox.displayName = 'Checkbox';

// Checkbox Group component for related checkboxes
export interface CheckboxGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  label?: string;
  description?: string;
  error?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  children,
  className = '',
  orientation = 'vertical',
  label,
  description,
  error,
}) => {
  const groupId = `checkbox-group-${Math.random().toString(36).substr(2, 9)}`;

  const orientationClasses = {
    horizontal: 'flex flex-row flex-wrap gap-4',
    vertical: 'space-y-3',
  };

  return (
    <div className={`${className}`}>
      {label && (
        <div className="mb-3">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</h3>
          {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
        </div>
      )}

      <div
        className={orientationClasses[orientation]}
        role="group"
        aria-labelledby={label ? `${groupId}-label` : undefined}
        aria-describedby={error ? `${groupId}-error` : description ? `${groupId}-description` : undefined}>
        {children}
      </div>

      {error && (
        <p id={`${groupId}-error`} className="text-red-600 dark:text-red-400 text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  );
};
