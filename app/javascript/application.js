import { Turbo } from '@hotwired/turbo-rails';
import 'controllers';
import * as ActiveStorage from '@rails/activestorage';

ActiveStorage.start();
Turbo.start();

Turbo.StreamActions['add-css-class'] = function () {
  this.targetElements.forEach((e) => e.classList.add(this.templateContent));
};

Turbo.StreamActions['chat-append'] = function () {
  const lastChat = this.targetElements[0].lastElementChild;
  const lastChatId = parseInt(lastChat.dataset.chatId);
  const newChatId = parseInt(this.templateContent.querySelector('[data-chat-id]').dataset.chatId);
  if (!lastChat || newChatId > lastChatId) {
    window.Turbo.StreamActions.append.call(this);
  } else {
    let previousChat = lastChat;
    while (
      previousChat.previousElementSibling &&
      previousChat.previousElementSibling.dataset?.chatId &&
      previousChat.previousElementSibling.dataset.chatId > newChatId
    ) {
      previousChat = previousChat.previousElementSibling;
    }
    previousChat.insertAdjacentElement('afterend', this.templateContent.firstElementChild);
  }
};
