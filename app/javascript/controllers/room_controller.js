import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['messageInput']

  connect() {
    console.log('Chat input controller connected')
  }

  _send(body) {
    fetch(`/rooms/${this.messageInputTarget.dataset.roomId}/chats`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body,
      credentials: 'include' // Ensures cookies are sent with the request
    })
  }

  _sendTextMessage(message) {
    this._send(JSON.stringify({ message, type: 'TextMessage' }))
  }

  handleSendButtonClick(event) {
    event.preventDefault()
    const message = this.messageInputTarget.value.trim()
    if (message) {
      this._sendTextMessage(message)
    }
  }

  handleChatInputKeyup(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      const message = this.messageInputTarget.value.trim()
      if (message) {
        this._sendTextMessage(message)
      }
    }
  }
}
