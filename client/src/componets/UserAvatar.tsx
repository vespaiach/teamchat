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
        'flex items-center justify-center bg-stone-200 bg-cover bg-center shrink-0 rounded-full',
        SIZE[size],
        className
      )}
      style={style}>
      {!src && <p className="text-lg font-bold">{name[0]}</p>}
      {online && <div className="absolute right-1 bottom-3 w-full w-2 h-2 bg-green-500" />}
      {children}
    </div>
  );
}
