import { cx } from '~/utils/string';

export default function PoundSignIcon({ className }: { className?: string }) {
  return <span className={cx('block flex items-center justify-center', className)}>#</span>;
}
