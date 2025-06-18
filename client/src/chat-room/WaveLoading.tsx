import { cx } from '../utils.js';

export default function WaveLoading({ className }: { className?: string }) {
  return (
    <div className={cx('wave-container', className)}>
      <div className="wave-bar bg-red-600"></div>
      <div className="wave-bar bg-red-600"></div>
      <div className="wave-bar bg-red-600"></div>
      <div className="wave-bar bg-red-600"></div>
      <div className="wave-bar bg-red-600"></div>
    </div>
  );
}
