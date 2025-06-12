import { Controller } from '@hotwired/stimulus';
import { scrollToLastChat } from 'utils/dom';
import chatChannel from 'channels/chat_channel';

export default class extends Controller {
  static targets = ['newChat'];
  static values = {
    roomId: Number,
  };

  connect() {
    this._handleScroll = this._throttle(this._handleScroll.bind(this), 100);
    window.addEventListener('scroll', this._handleScroll);

    // Scroll to bottom on initial load
    // this.scrollToBottom();
  }

  disconnect() {
    this.containerTarget.removeEventListener('scroll', this._handleScroll);
  }

  newChatTargetConnected(targetElement) {
    scrollToLastChat();
    targetElement.removeAttribute('data-chats-target');
    const previousTargetElement = this.getPreviousChatTarget(targetElement);
    if (previousTargetElement) {
      const previousUserId = previousTargetElement.dataset.userId;
      const currentUserId = targetElement.dataset.userId;
      if (previousUserId !== currentUserId) {
        return;
      }

      const previousCreatedAt = new Date(previousTargetElement.dataset.createdAt);
      const currentCreatedAt = new Date(targetElement.dataset.createdAt);
      if (currentCreatedAt.getTime() - previousCreatedAt.getTime() > 3 * 60 * 1000) {
        return; // More than 3 minutes apart, do not group
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

  _handleScroll() {
    // Check if scrolled to the top (with small tolerance)
    if (window.scrollY <= 10 && !this.loadingValue) {
      this._loadMore();
    }
  }

  // Throttle function to prevent too many scroll events
  _throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  _loadMore() {
    const chatContainerElement = document.getElementById('chats-container');
    if (!chatContainerElement) return;

    const firstChatElement = chatContainerElement.firstElementChild;
    if (!firstChatElement || firstChatElement.classList.contains('loading')) return;

    chatChannel.loadChatHistories(parseInt(firstChatElement.dataset.chatId), this.roomIdValue);
    firstChatElement.insertAdjacentElement('beforebegin', this._buildLoadingElement());
  }

  _buildLoadingElement() {
    const loadingElement = document.createElement('div');
    loadingElement.classList.add('loading', 'flex', 'items-center', 'justify-center', 'pt-3');
    loadingElement.innerHTML = `
      <svg class="mr-3 -ml-1 size-5 animate-spin text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
    `
    return loadingElement;
  }
}
