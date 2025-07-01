import { cx } from '~/utils/string';

const colors: Record<OnlineStatus, string> = {
  online: 'bg-green-500',
  offline: 'bg-gray-400',
};

const sizeClasses: Record<'small' | 'medium' | 'large', string> = {
  small: 'w-3 h-3',
  medium: 'w-5 h-5',
  large: 'w-6 h-6',
};

interface StatusIndicatorProps {
  status: 'online' | 'offline';
  size?: 'small' | 'medium' | 'large';
}

export default function StatusIndicator({ status, size = 'small' }: StatusIndicatorProps) {
  return (
    <div
      className={cx('rounded-full border border-white dark:border-gray-800', colors[status], sizeClasses[size])}
    />
  );
}
