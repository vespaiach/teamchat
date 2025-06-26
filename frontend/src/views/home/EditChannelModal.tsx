import { useState } from 'react';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import Modal from '~/components/Modal';
import { TextBox } from '~/components/TextBox';
import { showSuccess } from '~/global-contexts/toast';
import PlusIcon from '~/svgs/Plus';
import SpinnerIcon from '~/svgs/Spinner';
import { post, put } from '~/utils/remote';
import { validateChannelName } from '~/utils/string';

interface EditChannelModalProps {
  isOpen: boolean;
  channel?: Channel;
  onClose: (visible: false) => void;
}

export default function EditChannelModal({ isOpen, onClose, channel }: EditChannelModalProps) {
  const [name, setName] = useState(channel?.name || '');
  const [nameError, setNameError] = useState('');
  const [description, setDescription] = useState(channel?.description || '');
  const [isPrivate, setIsPrivate] = useState(channel?.isPrivate || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = Boolean(channel);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateChannelName(name);
    if (error) {
      setNameError(error);
      return;
    } else {
      setNameError('');
    }

    setIsSubmitting(true);
    if (await submitData({ ...channel, name, description, isGroup: !isPrivate })) {
      showSuccess(`Channel ${isEditMode ? 'updated' : 'created'} successfully!`);
      onClose(false);
    }
    setIsSubmitting(false);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setName('');
      setDescription('');
      setIsPrivate(false);
      onClose(false);
    }
  };

  const footer = (
    <div className="flex items-center justify-end space-x-3">
      <Button variant="ghost" size="sm" onClick={handleClose} disabled={isSubmitting}>
        Cancel
      </Button>
      <Button
        variant="primary"
        size="sm"
        type="submit"
        onClick={handleSubmit}
        disabled={!name.trim() || isSubmitting}
        leftIcon={isSubmitting ? <SpinnerIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}>
        {isSubmitting ? 'Creating...' : 'Create Channel'}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isEditMode ? 'Edit channel' : 'Create a channel'}
      footer={footer}
      size="md"
      closeOnBackdropClick={!isSubmitting}
      showCloseButton={!isSubmitting}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="channel-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Channel name <span className="text-red-500">*</span>
          </label>
          <TextBox
            error={nameError}
            id="channel-name"
            name="name"
            value={name}
            onChange={(e) => {
              setNameError('');
              setName(e.target.value);
            }}
            placeholder="e.g. marketing, design-team"
            disabled={isSubmitting}
            maxLength={30}
            required
            icon={<span className="text-gray-400 text-sm">#</span>}
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Channel names must be lowercase, without spaces or periods, and shorter than 30 characters.
          </p>
        </div>

        <div>
          <label
            htmlFor="channel-description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description (optional)
          </label>
          <textarea
            id="channel-description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this channel about?"
            disabled={isSubmitting}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 resize-none"
          />
        </div>

        <div>
          <Checkbox
            id="is-private"
            name="isPrivate"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            disabled={isSubmitting}>
            <div>
              <label
                htmlFor="is-private"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                Make private
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Only invited members can see and join private channels.
              </p>
            </div>
          </Checkbox>
        </div>
      </form>
    </Modal>
  );
}

async function submitData(data: Omit<Channel, 'id' | 'createdAt'> & { id?: number }) {
  const method = data.id ? put : post;
  const response = await method<{ id: number; name: string }>('/conversations', data);
  return response.success;
}
