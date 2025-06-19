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
  return (
    <div
      aria-label={`${name}'s avatar`}
      onClick={onClick}
      role="img"
      className={cx(
        'flex items-center justify-center bg-stone-200 bg-cover bg-center shrink-0 rounded-full relative border-2',
        SIZE[size],
        online ? 'border-green-500' : 'border-transparent',
        className
      )}>
      {Boolean(src) && (
        <img src={src} alt={`${name}'s avatar`} className="object-cover object-center w-full h-full rounded-full border border-transparent" />
      )}
      {!src && (
        <div className="rounded-full w-full h-full text-lg font-bold flex items-center justify-center">{name[0]}</div>
      )}
      {children}
    </div>
  );
}
