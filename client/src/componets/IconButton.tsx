import { cx } from "../utils/string.js";

type IconButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function IconButton({ children, className, ...rest }: IconButtonProps) {
  return (
    <button
      {...rest}
      className={cx(
        'p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-50 cursor-pointer flex items-center justify-center',
        className
      )}>
      {children}
    </button>
  );
}
