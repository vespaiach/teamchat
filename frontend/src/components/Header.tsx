import { Logo } from '~/components/Logo';
import IconButton from './IconButton';
import ChevronLeftIcon from '~/svgs/ChevronLeft';

interface HeaderProps {
  onBack?: () => void;
  pageTitle: string;
  children?: React.ReactNode;
}

export default function Header({ pageTitle, children, onBack }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {onBack && <IconButton icon={<ChevronLeftIcon className="h-6 w-6" onClick={onBack} />} />}
            <Logo size={32} className="mr-5" />
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">{pageTitle}</h1>
          </div>
          {children}
        </div>
      </div>
    </header>
  );
}
