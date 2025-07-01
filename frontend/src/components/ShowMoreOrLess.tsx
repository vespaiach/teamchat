import { useState } from 'react';
import ChevronUpIcon from '~/svgs/ChevronUp';
import ChevronDownIcon from '~/svgs/ChevronDown';
import { cx } from '~/utils/string';

interface ShowMoreOrLessProps<T> {
  defaultItemCount?: number;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export default function ShowMoreOrLess<T = unknown>({
  defaultItemCount = 8,
  items,
  renderItem,
}: ShowMoreOrLessProps<T>) {
  const [showAllItems, setShowAllItems] = useState(false);

  return (
    <>
      {(showAllItems ? items : items.slice(0, defaultItemCount)).map((item, index) => renderItem(item, index))}
      {items.length > defaultItemCount && (
        <div className="px-3 py-2">
          <button
            onClick={() => setShowAllItems(!showAllItems)}
            className={cx(
              'w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium',
              'py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200',
              'flex items-center justify-center gap-1',
            )}>
            {showAllItems ? (
              <>
                Show less
                <ChevronUpIcon className='w-4 h-4' />
              </>
            ) : (
              <>
                See {items.length - defaultItemCount} more items
                <ChevronDownIcon className='w-4 h-4' />
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
}
