import { cx } from '~/utils/string';

interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconRNode: React.ReactNode;
  labelRNode: React.ReactNode;
}

export default function MenuItem({ iconRNode, labelRNode, className, ...rest }: MenuItemProps) {
  return (
    <button
      {...rest}
      className={cx(
        `w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 cursor-pointer`,
        className
      )}>
      {iconRNode}
      <span>{labelRNode}</span>
    </button>
  );
}
