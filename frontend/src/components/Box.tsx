import { cx } from '~/utils/string';

export default function Box({
  children,
  className,
  header,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx('lg:col-span-1', className)}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">{header}</div>
        </div>
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}
