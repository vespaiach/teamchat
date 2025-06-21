import { cx } from '~/utils/string';

const colors: Record<OnlineStatus, string> = {
  online: 'bg-green-500',
  away: 'bg-yellow-500',
  offline: 'bg-gray-400',
  busy: 'bg-red-500',
};

export default function StatusIndicator({ status }: { status: OnlineStatus }) {
  return <div className={cx('w-2.5 h-2.5 rounded-full border border-white dark:border-gray-800', colors[status])} />;
}
