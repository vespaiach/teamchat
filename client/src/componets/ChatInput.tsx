import TextInput from './TextInput.js';
import { cx } from '../utils/string.js';
import IconButton from './IconButton.js';
import WaveLoading from './WaveLoading.js';

interface ChatInputProps {
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  value?: string;
  sending?: boolean;
}

export default function ChatInput({ className, value, sending, onChange, onClick }: ChatInputProps) {
  return (
    <div className={cx('fixed bottom-0 left-0 right-0 w-full', className)}>
      <div className="viewport px-5 flex items-center gap-2 relative border-t border-t-stone-100 bg-white py-4">
        <TextInput
          type="text"
          className="flex-1 w-40 text-sm pr-12"
          placeholder="Write your message"
          value={value}
          onChange={onChange}
        />
        {sending && <WaveLoading className="absolute right-10 top-1/2 -translate-y-1/2" />}
        {!sending && (
          <IconButton
            className="absolute w-7! h-7! right-8 top-1/2 -translate-y-1/2 text-white rounded-lg! bg-red-500!"
            onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="currentColor" viewBox="0 0 512 512">
              <path d="M 137.65570599613153 232.2321083172147 L 70.31334622823985 97.54738878143134 L 137.65570599613153 232.2321083172147 L 70.31334622823985 97.54738878143134 L 384.247582205029 232.2321083172147 L 384.247582205029 232.2321083172147 L 137.65570599613153 232.2321083172147 L 137.65570599613153 232.2321083172147 Z M 137.65570599613153 279.7678916827853 L 384.247582205029 279.7678916827853 L 137.65570599613153 279.7678916827853 L 384.247582205029 279.7678916827853 L 70.31334622823985 414.4526112185687 L 70.31334622823985 414.4526112185687 L 137.65570599613153 279.7678916827853 L 137.65570599613153 279.7678916827853 Z M 49.516441005802704 37.13733075435203 Q 28.719535783365572 29.214700193423596 13.864603481624759 44.06963249516441 Q 0 59.91489361702128 7.922630560928433 79.72147001934236 L 96.06189555125725 256 L 96.06189555125725 256 L 7.922630560928433 432.27852998065765 L 7.922630560928433 432.27852998065765 Q 0 452.0851063829787 13.864603481624759 467.9303675048356 Q 28.719535783365572 482.7852998065764 49.516441005802704 475.85299806576404 L 493.18375241779495 285.7098646034816 L 493.18375241779495 285.7098646034816 Q 511.0096711798839 276.79690522243715 512 256 Q 511.0096711798839 236.19342359767893 493.18375241779495 227.28046421663444 L 49.516441005802704 37.13733075435203 L 49.516441005802704 37.13733075435203 Z" />
            </svg>
          </IconButton>
        )}
      </div>
    </div>
  );
}
