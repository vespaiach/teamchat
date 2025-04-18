import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['iAmTheLastChat']

  iAmTheLastChatTargetConnected(target) {
    const viewport = document.getElementById('chat-viewport')
    if (viewport) {
      viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' })
    }

    this._removeOtherLastChat(target)
  }

  _removeOtherLastChat(fromChatElement) {
    let previousChatElement = fromChatElement.previousElementSibling
    while (previousChatElement?.dataset?.chatsTarget === 'iAmTheLastChat') {
      previousChatElement.removeAttribute('data-chats-target')
      previousChatElement = previousChatElement.previousElementSibling
    }
  }
}
