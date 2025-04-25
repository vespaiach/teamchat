import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['newChat']

  newChatTargetConnected(targetElement) {
    const viewportElement = document.getElementById('chat-viewport')
    viewportElement.scrollTo({ top: viewportElement.scrollHeight, behavior: 'smooth' })
    targetElement.removeAttribute('data-chats-target')
  }
}