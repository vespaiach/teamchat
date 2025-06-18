import { useMemo } from 'react';
import { cx } from '../utils.js';

interface AvatarProps {
  size?: 'small' | 'medium' | 'large';
  src?: string;
  name: string;
  className?: string;
  children?: React.ReactNode;
  online?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const SIZE = {
  small: 'w-9 h-9',
  medium: 'w-12 h-12',
  large: 'w-22 h-22',
};

export default function UserAvatar({
  src,
  name,
  size = 'small',
  online = false,
  className,
  children,
  onClick,
}: AvatarProps) {
  const style = useMemo(() => {
    return src ? { backgroundImage: `url(${src})` } : {};
  }, [src]);

  return (
    <div
      aria-label={`${name}'s avatar`}
      onClick={onClick}
      role="img"
      className={cx(
        'flex items-center justify-center bg-stone-200 bg-cover bg-center shrink-0 rounded-full relative',
        SIZE[size],
        className
      )}
      style={style}>
      {!src && <p className="text-lg font-bold">{name[0]}</p>}
      {online && <div className="absolute top-[-2] right-[-1] rounded-full w-3 h-3 bg-green-500 border-2 border-white" />}
      {children}
    </div>
  );
}
