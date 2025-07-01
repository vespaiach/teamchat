import { useState } from 'react';
import { Button } from '~/components/Button';
import Modal from '~/components/Modal';
import PlusIcon from '~/svgs/Plus';
import Spinner from '~/svgs/Spinner';
import ClosedLockIcon from '~/svgs/ClosedLock';
import TeamIcon from '~/svgs/Team';
import TriangleExclamationIcon from '~/svgs/TriangleExclamation';
import { post } from '~/utils/remote';
import { showError, showSuccess } from '~/global-contexts/toast';

interface JoinChannelModalProps {
  isOpen: boolean;
  onClose: (v: false) => void;
  channel: ExtendedChannel | null;
}

export function JoinChannelModal({ isOpen, onClose, channel }: JoinChannelModalProps) {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!channel) return;

    setIsSubmitting(true);

    try {
      const response = await post<{ message: string }>(`/conversations/${channel.id}/join_or_request`, { message });
      if (!response.success) {
        showError(response.error || 'Failed to join or request channel');
      } else {
        showSuccess(response.data.message || 'Request sent successfully!');
      }
      onClose(false);
      setMessage('');
    } catch (error) {
      console.error('Failed to request channel join:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose(false);
    setMessage('');
  };

  if (!channel) return null;
  const isPrivateChannel = !channel.isPublic;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`${isPrivateChannel ? 'Request to Join' : 'Join'} #${channel.name}`}
      size="md"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
            leftIcon={isSubmitting ? <Spinner className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}>
            {isSubmitting ? 'Sending...' : isPrivateChannel ? 'Send Request' : 'Join Channel'}
          </Button>
        </div>
      }>
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {!isPrivateChannel && <span className="text-gray-500 dark:text-gray-400 text-lg">#</span>}
              {isPrivateChannel && (
                <div className="flex items-center">
                  <ClosedLockIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
              )}
              <h3 className="font-semibold text-gray-900 dark:text-white">{channel.name}</h3>
            </div>
          </div>

          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <TeamIcon className="h-4 w-4" />
              <span>{channel.memberCount} members</span>
            </div>

            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                isPrivateChannel
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
              {isPrivateChannel ? 'Private' : 'Public'}
            </span>
          </div>

          {channel.description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{channel.description}</p>
          )}
        </div>

        <div className="text-sm text-gray-600 dark:text-gray-300">
          {isPrivateChannel ? (
            <p>
              This is a private channel. Your request will be sent to the channel administrators for approval. You can
              include an optional message explaining why you'd like to join.
            </p>
          ) : (
            <p>
              This is a public channel. You'll be able to view and participate in conversations immediately after
              joining.
            </p>
          )}
        </div>

        {isPrivateChannel && (
          <div>
            <label htmlFor="join-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message (Optional)
            </label>
            <textarea
              id="join-message"
              name="join-message"
              placeholder="Hi! I'd like to join this channel because..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              maxLength={500}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 resize-none"
            />
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
              {message.length}/500 characters
            </div>
          </div>
        )}

        {isPrivateChannel && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <TriangleExclamationIcon className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-700 dark:text-amber-300">
                <p className="font-medium">Request Pending</p>
                <p>Once you send your request, you'll need to wait for approval from a channel administrator.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
