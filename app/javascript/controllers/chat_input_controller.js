import { Controller } from '@hotwired/stimulus'
// import { Turbo } from '@hotwired/turbo-rails'
// import { scrollToLastChat } from 'utils/dom'

export default class extends Controller {
  static outlets = ['chats']
  static targets = ['textInput', 'textMessageTemplate']
  static values = {
    roomId: Number
  }

  handleTextInputSend() {
    const message = this.textInputTarget.value.trim()
    if (message) {
      this.#sendTextMessage(message)
      this.textInputTarget.value = ''
    }
  }

  handleEnterOnTextInput(event) {
    if (event.key === 'Enter' && !event.ctrlKey) {
      event.preventDefault()
      this.handleTextInputSend()
    } else if (event.key === 'Enter' && event.ctrlKey) {
      this.textInputTarget.value += '\n'
    }
  }

  #sendTextMessage(message) {
    this.#sendChat({ message })
  }

  #sendChat(data) {
    this.#fetch(`/rooms/${this.roomIdValue}/chats/create_text`, data)
  }

  #fetch(url, data, method = 'POST') {
    return fetch(url, {
      method,
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    })
  }
}

// Turbo.StreamActions['insert-sort'] = function () {
//   // Stop if no chats container is found
//   const container = this.targetElements[0]
//   if (!container) return

//   // Stop if no template content is found
//   let newElement = this.templateContent
//   if (newElement instanceof DocumentFragment) {
//     newElement = newElement.firstElementChild;
//     if (!newElement) {
//       console.error("DocumentFragment is empty.");
//       return;
//     }
//   }

//   // If there is no chats in the container, append the new element
//   const lastChatElement = container.querySelector('[data-chat-id]:last-of-type');
//   if (!lastChatElement) {
//     container.append(newElement)
//     scrollToLastChat()
//     return
//   }

//   const lastChatId = lastChatElement?.dataset?.chatId
//   const newChatId = newElement.dataset.chatId

//   // If this is an update, replace the existing element
//   const existingElement = document.querySelector(`[data-chat-id="${newChatId}"]`)
//   if (existingElement) {
//     existingElement.replaceWith(newElement)
//     scrollToLastChat()
//     return
//   }

//   // If the new chat is the last one, append it
//   if (newChatId > lastChatId) {
//     container.append(newElement)
//     scrollToLastChat()
//     return
//   }

//   // Walk backwards through the chat elements until we find the right place to insert the new element
//   let currentElement = lastChatElement
//   while (currentElement && currentElement.dataset.chatId > newChatId) {
//     currentElement = currentElement.previousElementSibling
//   }
//   if (currentElement) {
//     currentElement.parentElement?.insertBefore(newElement, currentElement.nextElementSibling)
//   } else {
//     // New Chat is the first one, prepend it
//     container.prepend(newElement)
//   }
//   scrollToLastChat()
// }
