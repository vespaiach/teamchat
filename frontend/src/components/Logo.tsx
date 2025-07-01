import { cx } from '~/utils/string';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function Logo({ size = 40, className = '', showText = true }: LogoProps) {
  return (
    <div className={cx('flex items-center text-primary dark:text-dark-primary space-x-2', className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0">
        {/* Chat bubble base */}
        <path
          d="M8 12C8 8.68629 10.6863 6 14 6H34C37.3137 6 40 8.68629 40 12V26C40 29.3137 37.3137 32 34 32H18L8 42V12Z"
          fill="currentColor"
        />

        {/* Inner highlight for depth */}
        <path
          d="M12 12C12 10.8954 12.8954 10 14 10H34C35.1046 10 36 10.8954 36 12V26C36 27.1046 35.1046 28 34 28H17.4142L12 33.4142V12Z"
          fill="url(#gradient1)"
        />

        {/* Team dots representing multiple users */}
        <circle cx="18" cy="19" r="2.5" fill="white" opacity="0.9" />
        <circle cx="24" cy="19" r="2.5" fill="white" opacity="0.9" />
        <circle cx="30" cy="19" r="2.5" fill="white" opacity="0.9" />

        {/* Connection lines between dots */}
        <path d="M20.5 19H21.5M26.5 19H27.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />

        {/* Notification indicator */}
        <circle cx="36" cy="10" r="4" fill="oklch(65% 0.15 25)" stroke="white" strokeWidth="1.5" />
        <circle cx="36" cy="10" r="1.5" fill="white" />

        <defs>
          <linearGradient id="gradient1" x1="12" y1="10" x2="36" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="oklch(65% 0.2 27.325)" />
            <stop offset="1" stopColor="oklch(50% 0.25 27.325)" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <span className="text-2xl font-bold tracking-tight text-primary dark:text-dark-primary">
          TeamChat
        </span>
      )}
    </div>
  );
}

// Simplified version for small spaces
export function LogoIcon({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      <path
        d="M8 12C8 8.68629 10.6863 6 14 6H34C37.3137 6 40 8.68629 40 12V26C40 29.3137 37.3137 32 34 32H18L8 42V12Z"
        fill="var(--primary)"
      />
      <path
        d="M12 12C12 10.8954 12.8954 10 14 10H34C35.1046 10 36 10.8954 36 12V26C36 27.1046 35.1046 28 34 28H17.4142L12 33.4142V12Z"
        fill="url(#gradient2)"
      />
      <circle cx="18" cy="19" r="2.5" fill="white" opacity="0.9" />
      <circle cx="24" cy="19" r="2.5" fill="white" opacity="0.9" />
      <circle cx="30" cy="19" r="2.5" fill="white" opacity="0.9" />
      <path d="M20.5 19H21.5M26.5 19H27.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <circle cx="36" cy="10" r="4" fill="oklch(65% 0.15 25)" stroke="white" strokeWidth="1.5" />
      <circle cx="36" cy="10" r="1.5" fill="white" />

      <defs>
        <linearGradient id="gradient2" x1="12" y1="10" x2="36" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="oklch(65% 0.2 27.325)" />
          <stop offset="1" stopColor="oklch(50% 0.25 27.325)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
