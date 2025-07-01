import { useState, useRef } from 'react';
import { useClickOutside } from '~/hooks/useClickOutside';
import MenuItem from '~/components/MenuItem';
import EditIcon from '~/svgs/Edit';
import CameraIcon from '~/svgs/Camera';
import UploadIcon from '~/svgs/Upload';
import { cx } from '~/utils/string';

interface AvatarEditDropdownProps {
  className?: string;
  onCameraCapture?: () => void;
  onFileUpload?: (file: File) => void;
  disabled?: boolean;
}

export default function AvatarEditDropdown({ 
  className, 
  onCameraCapture, 
  onFileUpload,
  disabled = false
}: AvatarEditDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const handleCameraClick = () => {
    if (disabled) return;
    setIsOpen(false);
    onCameraCapture?.();
  };

  const handleUploadClick = () => {
    if (disabled) return;
    setIsOpen(false);
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload?.(file);
      // Reset the input so the same file can be selected again
      event.target.value = '';
    }
  };

  return (
    <div className={cx('relative', className)}>
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cx(
          'absolute -bottom-1 -right-1 w-8 h-8 rounded-full',
          'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600',
          'hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200',
          'flex items-center justify-center shadow-sm',
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        )}
        aria-label="Edit avatar"
        title={disabled ? 'Upload in progress...' : 'Edit avatar'}>
        <EditIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </button>

      {isOpen && !disabled && (
        <div
          ref={dropdownRef}
          className={cx(
            'absolute -right-2 top-8 w-48 z-50',
            'bg-white dark:bg-gray-800 rounded-lg shadow-lg',
            'border border-gray-200 dark:border-gray-700 py-1'
          )}>
          <MenuItem
            onClick={handleCameraClick}
            className="text-gray-700 dark:text-gray-300"
            iconRNode={<CameraIcon className="h-4 w-4" />}
            labelRNode={<span>Take Photo</span>}
          />

          <MenuItem
            onClick={handleUploadClick}
            className="text-gray-700 dark:text-gray-300"
            iconRNode={<UploadIcon className="h-4 w-4" />}
            labelRNode={<span>Upload Photo</span>}
          />
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
        aria-label="Upload avatar image"
      />
    </div>
  );
}
