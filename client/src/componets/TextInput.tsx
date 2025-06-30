import { cx } from '../utils/string.js';

type TextInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function TextInput({ className, ...rest }: TextInputProps) {
  return <input {...rest} className={cx('border-none rounded-xl bg-stone-100 px-4 py-3 outline-red-200', className)} />;
}
