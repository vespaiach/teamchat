import { Controller } from '@hotwired/stimulus'
import { DirectUpload } from '@rails/activestorage'
import { scrollToLastChat } from 'utils/dom'

export default class extends Controller {
  static targets = ['closeButton', 'membersPanel']

  connect() {
    scrollToLastChat()
  }

  handleCloseButtonClick(event) {
    event.preventDefault()
    this.membersPanelTarget.classList.toggle('basis-[0%]!')
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

  handleFileUpload(event) {
    const file = this.fileInputTarget.files[0]
    if (!file) return

    const upload = new DirectUpload(file, this.fileInputTarget.dataset.directUploadUrl)

    upload.create((error, blob) => {
      if (error) {
        alert('Upload failed.')
      } else {
        // Create hidden field with blob signed ID for form submission
        const hiddenField = document.createElement('input')
        hiddenField.setAttribute('type', 'hidden')
        hiddenField.setAttribute('value', blob.signed_id)
        hiddenField.name = event.target.name
        event.target.parentNode.appendChild(hiddenField)

        // this._uploadFileWithProgress(upload, file)
      }
    })
  }

  _uploadFileWithProgress(upload, file) {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', `/rooms/${this.messageInputTarget.dataset.roomId}/upload`, true)
    xhr.setRequestHeader('Content-Type', file.type)
    xhr.setRequestHeader('X-CSRF-Token', document.querySelector('meta[name="csrf-token"]').getAttribute('content'))
    Object.entries(upload.customHeaders).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value)
    })

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        this.uploadProgressTarget.style.display = 'block'
        this.uploadProgressTarget.value = (e.loaded / e.total) * 100
      }
    })

    xhr.send(file)
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
}
