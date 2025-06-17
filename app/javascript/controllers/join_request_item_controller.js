import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = { id: Number }

  async approve() {
    await this.makeRequest('approve')
  }

  async reject() {
    await this.makeRequest('reject')
  }

  async makeRequest(action) {
    try {
      const response = await fetch(`/join_requests/${this.idValue}/${action}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        }
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Remove the request item from the DOM
        this.element.remove()
        this.showFlashMessage(data.message, 'success')
      } else {
        this.showFlashMessage(data.error, 'error')
      }
    } catch (error) {
      console.error(`Error ${action}ing join request:`, error)
      this.showFlashMessage(`An error occurred while ${action}ing the request.`, 'error')
    }
  }

  showFlashMessage(message, type) {
    // Create a flash message element
    const flashElement = document.createElement('div')
    flashElement.className = `fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`
    flashElement.textContent = message
    
    document.body.appendChild(flashElement)
    
    // Remove the message after 5 seconds
    setTimeout(() => {
      if (flashElement.parentNode) {
        flashElement.parentNode.removeChild(flashElement)
      }
    }, 5000)
  }
}
