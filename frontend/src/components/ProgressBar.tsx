import { cx } from '~/utils/string';

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const colorClasses = {
  primary: 'bg-blue-600',
  success: 'bg-green-600',
  warning: 'bg-yellow-600',
  danger: 'bg-red-600',
};

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

export default function ProgressBar({
  progress,
  className = '',
  showPercentage = false,
  color = 'primary',
  size = 'md',
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={cx('w-full', className)}>
      <div className={cx('bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className={cx('transition-all duration-300 ease-out rounded-full', colorClasses[color], sizeClasses[size])}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center">{Math.round(clampedProgress)}%</div>
      )}
    </div>
  );
}
