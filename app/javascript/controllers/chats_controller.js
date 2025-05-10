import { Controller } from '@hotwired/stimulus'
import { scrollToLastChat } from 'utils/dom'

export default class extends Controller {
  static targets = ['newChat']

  newChatTargetConnected(targetElement) {
    scrollToLastChat()
    targetElement.removeAttribute('data-chats-target')
  }
}