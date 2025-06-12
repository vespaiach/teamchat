import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['container', 'content', 'loader'];
  static values = { 
    url: String,
    loading: { type: Boolean, default: false },
    hasMore: { type: Boolean, default: true }
  };

  connect() {
    this.handleScroll = this.throttle(this.handleScroll.bind(this), 100);
    window.addEventListener('scroll', this.handleScroll);
    
    // Scroll to bottom on initial load
    this.scrollToBottom();
  }

  disconnect() {
    this.containerTarget.removeEventListener('scroll', this.handleScroll);
  }

  scrollToBottom() {
    requestAnimationFrame(() => {
      this.containerTarget.scrollTop = this.containerTarget.scrollHeight;
    });
  }

  handleScroll() {
    // Check if scrolled to the top (with small tolerance)
    if (window.scrollY <= 10 && this.hasMoreValue && !this.loadingValue) {
      this.loadMore();
    }
  }

  showLoader() {
    if (this.hasLoaderTarget) {
      this.loaderTarget.classList.remove('hidden');
    }
  }

  hideLoader() {
    if (this.hasLoaderTarget) {
      this.loaderTarget.classList.add('hidden');
    }
  }

  async loadMore() {
    if (this.loadingValue || !this.hasMoreValue) return;

    this.loadingValue = true;
    this.showLoader();
    
    try {
      // Get the ID of the oldest chat for pagination
      const firstChatElement = this.contentTarget.querySelector('[data-chat-id]');
      const lastSeenId = firstChatElement ? firstChatElement.dataset.chatId : null;
      
      // Build URL with pagination parameters
      const url = new URL(this.urlValue, window.location.origin);
      if (lastSeenId) {
        url.searchParams.set('last_seen_id', lastSeenId);
      }
      
      // Make the request
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Accept': 'text/vnd.turbo-stream.html',
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (response.ok) {
        const html = await response.text();
        
        // Store current scroll position
        const scrollTop = this.containerTarget.scrollTop;
        const scrollHeight = this.containerTarget.scrollHeight;
        
        // Create a temporary container to parse the response
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Get the new chat elements
        const newChats = tempDiv.querySelectorAll('[data-chat-id]');
        
        if (newChats.length === 0) {
          // No more chats to load
          this.hasMoreValue = false;
        } else {
          // Prepend new chats to the content
          const fragment = document.createDocumentFragment();
          newChats.forEach(chat => {
            fragment.appendChild(chat);
          });
          this.contentTarget.insertBefore(fragment, this.contentTarget.firstChild);
          
          // Restore scroll position relative to the new content
          const newScrollHeight = this.containerTarget.scrollHeight;
          const heightDifference = newScrollHeight - scrollHeight;
          this.containerTarget.scrollTop = scrollTop + heightDifference;
        }
      } else {
        console.error('Failed to load more chats:', response.status);
      }
    } catch (error) {
      console.error('Error loading more chats:', error);
    } finally {
      this.loadingValue = false;
      this.hideLoader();
    }
  }
}
