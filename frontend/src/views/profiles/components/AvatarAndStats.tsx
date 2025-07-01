import { useEffect, useState } from 'react';
import Box from '~/components/Box';
import StatusIndicator from '~/components/StatusIndicator';
import AvatarEditDropdown from '~/components/AvatarEditDropdown';
import ProgressBar from '~/components/ProgressBar';
import CameraModal from '~/components/CameraModal';
import { showSuccess, showError } from '~/global-contexts/toast';
import { cx, dateToMDY } from '~/utils/string';
import { useProfilesStore } from '~/views/profiles/store';
import { upload } from '~/utils/remote';

export default function AvatarAndStats() {
  const { loggedInUser } = useProfilesStore();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setAvatar(`/users/${loggedInUser.id}/avatar`);
    };
    img.src = `/users/${loggedInUser.id}/avatar`;
  }, [loggedInUser]);

  const handleCameraCapture = async () => {
    setIsCameraModalOpen(true);
  };

  const handleCameraModalCapture = (blob: Blob) => {
    uploadAvatarFile(blob);
  };

  const handleFileUpload = (file: File) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      showError('Please select a valid image file (JPEG, PNG, GIF, or WebP).');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      showError('File size must be less than 5MB.');
      return;
    }

    uploadAvatarFile(file);
  };

  const uploadAvatarFile = async (file: File | Blob) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('avatar', file);

      const response = await upload('/profile/avatar', formData, (progress) => {
        setUploadProgress(progress);
      });

      if (response.success) {
        setAvatar(`/users/${loggedInUser.id}/avatar?t=${new Date().getTime()}`);
        showSuccess('Avatar updated successfully!');
        setUploadProgress(100);
      }
    } catch (error) {
      console.error('Avatar upload failed:', error);
      showError('Failed to upload avatar. Please try again.');
    } finally {
      // Reset upload state after a short delay to show completed progress
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  return (
    <>
      <CameraModal isOpen={isCameraModalOpen} onClose={setIsCameraModalOpen} onCapture={handleCameraModalCapture} />

      <Box className="p-6">
        <div className="flex flex-col items-stretch md:flex-row gap-5">
          <div className="flex-1 flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <div className="relative w-32 h-32">
                {avatar && <img src={avatar} className="w-full h-full rounded-full object-cover object-center" />}
                {!avatar && (
                  <div
                    className={cx(
                      'w-32 h-32 rounded-full border-4 border-gray-200 dark:border-gray-600',
                      'flex items-center justify-center text-3xl font-bold text-white bg-primary'
                    )}>
                    {loggedInUser.firstName[0].toUpperCase()}
                    {loggedInUser.lastName[0].toUpperCase()}
                  </div>
                )}
                <AvatarEditDropdown
                  onCameraCapture={handleCameraCapture}
                  onFileUpload={handleFileUpload}
                  disabled={isUploading}
                />

                {isUploading && (
                  <div className="absolute inset-0 bg-black/80 bg-opacity-50 rounded-full flex items-center justify-center">
                    <div className="text-white text-xs font-medium">
                      {uploadProgress < 100 ? 'Uploading...' : 'Complete!'}
                    </div>
                  </div>
                )}
              </div>

              {isUploading && (
                <div className="mt-2 w-32">
                  <ProgressBar progress={uploadProgress} size="sm" color="primary" showPercentage={false} />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{loggedInUser.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">{loggedInUser.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-sm text-gray-500 dark:text-gray-500">Joined {dateToMDY(loggedInUser.joinedAt)}</p>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <StatusIndicator status="online" size="small" />
                <p className="text-sm text-gray-900 dark:text-white">Online</p>
              </div>
            </div>
          </div>

          <div className="flex-1 md:mt-3">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Profile Stats</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">12</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Channels Joined</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">247</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Messages Sent</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
