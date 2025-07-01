import { cx } from '~/utils/string';

export default function Box({
  children,
  className,
  headerRNode,
}: {
  headerRNode?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        'bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700',
        className
      )}>
      {Boolean(headerRNode) && (
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">{headerRNode}</div>
        </div>
      )}
      {children}
    </div>
  );
}
