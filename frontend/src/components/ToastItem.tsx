import { useEffect, useMemo, useState } from 'react';
import ErrorIcon from '~/svgs/Error';
import SuccessIcon from '~/svgs/Success';
import WarningIcon from '~/svgs/Warning';
import { cx } from '~/utils/string';

export type ToastType = 'success' | 'error' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

const toastIconTypes: Record<string, string> = {
  success: 'text-green-500 dark:text-green-400',
  error: 'text-red-500 dark:text-red-400',
  warning: 'text-yellow-500 dark:text-yellow-400',
};

interface ToastItemProps {
  toast: Toast;
  className?: string;
  onRemove: (id: string) => void;
}

export default function ToastItem({ toast, className, onRemove }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Show animation
    const showTimer = setTimeout(() => setIsVisible(true), 10);

    // Auto-close timer
    const duration = toast.duration || 5000;
    const closeTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onRemove(toast.id), 300); // Wait for exit animation
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, [toast.id, toast.duration, onRemove]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const toastClassNames = useMemo(() => {
    const baseStyles = cx(
      'relative w-full max-w-md p-4 rounded-lg shadow-lg border',
      'transition-all duration-300 ease-in-out transform',
      'dark:shadow-xl'
    );

    const animationStyles = cx(isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0');

    const typeStyles = {
      success: cx(
        'bg-green-50 border-green-200 text-green-800',
        'dark:bg-green-900/20 dark:border-green-700 dark:text-green-300'
      ),
      error: cx('bg-red-50 border-red-200 text-red-800', 'dark:bg-red-900 dark:border-red-700 dark:text-red-300'),
      warning: cx(
        'bg-yellow-50 border-yellow-200 text-yellow-800',
        'dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-300'
      ),
    };

    return cx(baseStyles, animationStyles, typeStyles[toast.type], className);
  }, [isVisible, isExiting, toast.type, className]);

  const iconElement = useMemo(() => {
    switch (toast.type) {
      case 'success':
        return <SuccessIcon className="w-5 h-5" />;
      case 'error':
        return <ErrorIcon className="w-5 h-5" />;
      case 'warning':
        return <WarningIcon className="w-5 h-5" />;
    }
  }, [toast.type]);

  return (
    <div className={toastClassNames}>
      <div className="flex items-start">
        <div className={cx('flex-shrink-0 mr-3 mt-0.5', toastIconTypes[toast.type])}>{iconElement}</div>
        <div className="flex-1 min-w-0">
          {toast.title && <p className="font-medium text-sm mb-1">{toast.title}</p>}
          <p className="text-sm opacity-90">{toast.message}</p>
        </div>
        <button
          onClick={handleClose}
          className={cx(
            'flex-shrink-0 ml-3 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10',
            'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
            'focus:ring-gray-500 dark:focus:ring-gray-400'
          )}
          aria-label="Close notification">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
