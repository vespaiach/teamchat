import { Controller } from '@hotwired/stimulus';
// import { Turbo } from '@hotwired/turbo-rails'
// import { scrollToLastChat } from 'utils/dom'
import chatChannel from 'channels/chat_channel';

export default class extends Controller {
  static outlets = ['chats'];
  static targets = ['textInput'];
  static values = {
    roomId: Number,
  };

  handleTextInputSend() {
    const message = this.textInputTarget.value.trim();
    if (message) {
      chatChannel.sendChat(message, this.roomIdValue);
      this.textInputTarget.value = '';
    }
  }

  handleEnterOnTextInput(event) {
    if (event.key === 'Enter' && !event.ctrlKey) {
      event.preventDefault();
      this.handleTextInputSend();
    } else if (event.key === 'Enter' && event.ctrlKey) {
      this.textInputTarget.value += '\n';
    }
  }
}
