import Modal from '~/components/Modal';
import UserAvatar from '~/views/UserAvatar';
import StatusIndicator from '~/components/StatusIndicator';
import MessageIcon from '~/svgs/Message';
import { Button } from '~/components/Button';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: (val: false) => void;
  user: User | null;
  onSendMessage?: (userId: number) => void;
}

export function UserProfileModal({ isOpen, onClose, user }: UserProfileModalProps) {
  if (!user) return null;

  const handleSendMessage = () => {
    onClose(false);
  };

  const handleStartCall = () => {
    onClose(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Profile">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <UserAvatar user={user} size="medium" />

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
            <StatusIndicator status="online" />
          </div>
        </div>

        {/* User Details */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</label>
              <p className="text-sm text-gray-900 dark:text-white">{'Team Member'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Department</label>
              <p className="text-sm text-gray-900 dark:text-white">{'Engineering'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Joined</label>
              <p className="text-sm text-gray-900 dark:text-white">{'Jan 2024'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Timezone</label>
              <p className="text-sm text-gray-900 dark:text-white">{'PST (UTC-8)'}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button onClick={handleSendMessage}>
            <MessageIcon className="h-4 w-4 mr-2" />
            Send Message
          </Button>

          <Button onClick={handleStartCall}>
            <MessageIcon className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
