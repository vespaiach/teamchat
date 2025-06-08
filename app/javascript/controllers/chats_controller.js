import { Controller } from '@hotwired/stimulus';
import { scrollToLastChat } from 'utils/dom';

export default class extends Controller {
  static targets = ['newChat'];

  newChatTargetConnected(targetElement) {
    scrollToLastChat();
    targetElement.removeAttribute('data-chats-target')
    const previousTargetElement = this.getPreviousChatTarget(targetElement);
    if (previousTargetElement) {
      const previousUserId = previousTargetElement.dataset.userId;
      const currentUserId = targetElement.dataset.userId;
      if (previousUserId !== currentUserId) {
        return;
      }

      const previousCreatedAt = new Date(previousTargetElement.dataset.createdAt);
      const currentCreatedAt = new Date(targetElement.dataset.createdAt);
      if (currentCreatedAt.getTime() - previousCreatedAt.getTime() > 5 * 60 * 1000) {
        return; // More than 5 minutes apart, do not group
      }

      targetElement.querySelector('.metadata')?.classList?.add('hidden');
      targetElement.querySelector('a')?.classList?.add('hide-avatar');
      targetElement.classList.remove('mt-5');
      targetElement.classList.add('mt-1');
    }
  }

  getPreviousChatTarget(targetElement) {
    const previousTargetElement = targetElement.previousSibling;
    if (!previousTargetElement) {
      return null; // No previous element
    }
    if (previousTargetElement && previousTargetElement.dataset?.chatId) {
      return previousTargetElement;
    }

    return this.getPreviousChatTarget(previousTargetElement);
  }
}
