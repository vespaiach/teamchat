import React, { useMemo } from 'react';
import { cx } from '~/utils/string';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps
  extends Omit<
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'size' | 'onChange' | 'onBlur'
  > {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  required?: boolean;
  value?: string | null;
  disabled?: boolean;
  placeholder?: string;
  options: DropdownOption[];
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
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

export default function Dropdown(props: DropdownProps) {
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
    value = '',
    disabled = false,
    placeholder,
    options,
    onChange,
    onBlur,
    ...divProps
  } = props;

  const selectId = useMemo(() => id || `dropdown-${Math.random().toString(36).substring(2, 9)}`, [id]);

  const baseClasses = cx(
    'rounded-lg transition-colors duration-200 outline-none',
    'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    sizeClasses[size],
    variantClasses[variant],
    error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '',
    disabled ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800' : 'cursor-pointer',
    fullWidth ? 'w-full' : '',
    'appearance-none bg-no-repeat bg-right pr-10',
    icon && iconPosition === 'left' ? 'pl-10' : '',
    icon && iconPosition === 'right' ? 'pr-16' : ''
  );

  const containerClasses = cx('relative', fullWidth ? 'w-full' : 'inline-block', className);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange && !disabled) {
      onChange(e.target.value);
    }
  };

  return (
    <div {...divProps} className={containerClasses}>
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
        <select
          id={selectId}
          value={value || ''}
          disabled={disabled}
          onChange={handleSelectChange}
          onBlur={onBlur}
          className={baseClasses}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: 'right 0.5rem center',
            backgroundSize: '1.5em 1.5em',
          }}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-8 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}
      </div>
      {(error || helperText) && (
        <div className="mt-2">
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          {helperText && !error && <p className="text-sm text-gray-500 dark:text-gray-400">{helperText}</p>}
        </div>
      )}
    </div>
  );
}
