import { cloneElement, isValidElement, useMemo, type ReactNode } from 'react';
import Spinner from '~/svgs/Spinner';
import { cx } from '~/utils/string';

// Size variants with padding and icon size
const sizeClasses = {
  xs: {
    padding: 'p-1',
    iconSize: 'w-3 h-3',
    minSize: 'min-w-[1.75rem] min-h-[1.75rem]',
  },
  sm: {
    padding: 'p-1.5',
    iconSize: 'w-4 h-4',
    minSize: 'min-w-[2rem] min-h-[2rem]',
  },
  md: {
    padding: 'p-2',
    iconSize: 'w-5 h-5',
    minSize: 'min-w-[2.5rem] min-h-[2.5rem]',
  },
  lg: {
    padding: 'p-3',
    iconSize: 'w-6 h-6',
    minSize: 'min-w-[3rem] min-h-[3rem]',
  },
  xl: {
    padding: 'p-4',
    iconSize: 'w-7 h-7',
    minSize: 'min-w-[3.5rem] min-h-[3.5rem]',
  },
};

// Variant styles with dark mode support
const variantClasses = {
  primary: cx(
    'text-white border border-transparent shadow-sm bg-primary border-primary',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'dark:focus:ring-offset-gray-900',
    'hover:not-disabled:bg-primary-hover dark:hover:not-disabled:bg-dark-primary-hover'
  ),
  secondary: cx(
    'text-gray-700 bg-gray-100 border border-gray-300 shadow-sm',
    'hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500',
    'dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700',
    'dark:focus:ring-offset-gray-900 dark:focus:ring-gray-400'
  ),
  outline: cx(
    'text-gray-700 bg-white border border-gray-300 shadow-sm border-primary text-primary',
    'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2',
    'dark:text-gray-300 dark:bg-gray-900 dark:border-gray-600 dark:hover:bg-gray-800',
    'dark:focus:ring-offset-gray-900 bg-transparent',
    'hover:not-disabled:bg-primary-light dark:hover:not-disabled:bg-dark-primary-light'
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

// Shape variants
const shapeClasses = {
  square: 'rounded-lg',
  circle: 'rounded-full',
};

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The icon to display - can be any React node (SVG, icon component, etc.) */
  icon: ReactNode;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /** Size of the button */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Shape of the button */
  shape?: 'square' | 'circle';
  /** Loading state */
  loading?: boolean;
  /** Tooltip text (optional) */
  tooltip?: string;

  ref?: React.Ref<HTMLButtonElement>;
}

export default function IconButton(props: IconButtonProps) {
  const {
    icon,
    variant = 'ghost',
    size = 'md',
    shape = 'square',
    loading = false,
    tooltip,
    className = '',
    disabled,
    ref,
    ...rest
  } = props;

  // Base classes
  const baseClasses = cx(
    'inline-flex items-center justify-center font-medium',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'relative group transition duration-200', // For tooltip positioning
    sizeClasses[size].padding,
    sizeClasses[size].minSize,
    shapeClasses[shape],
    variantClasses[variant],
    className
  );

  const isDisabled = disabled || loading;

  // Render icon with proper sizing
  const renderIcon = useMemo(() => {
    if (loading) return <Spinner className={sizeClasses[size].iconSize} />;

    if (isValidElement(icon)) {
      // Clone the icon and add size classes if it's an SVG or similar
      const iconElement = icon as React.ReactElement<{ className?: string }>;
      return cloneElement(iconElement, {
        ...iconElement.props,
        className: cx(sizeClasses[size].iconSize, iconElement.props?.className),
      });
    }

    return <span className={sizeClasses[size].iconSize}>{icon}</span>;
  }, [icon, loading, size]);

  return (
    <button {...rest} ref={ref} className={baseClasses} disabled={isDisabled}>
      {renderIcon}

      {/* Tooltip */}
      {tooltip && (
        <span
          className={cx(
            'absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
            'pointer-events-none whitespace-nowrap',
            'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
            'dark:bg-gray-700'
          )}>
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
        </span>
      )}
    </button>
  );
}
