import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static outlets = ['modal']
  
  roomId = null

  open(event) {
    event.preventDefault()
    this.roomId = event.currentTarget.dataset.joinRoomRoomIdValue
    this.modalOutlet.open()
  }

  async sendJoinRequest() {
    if (this.roomId) {
      try {
        const response = await fetch(`/rooms/${this.roomId}/join_request`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
          }
        })
        
        const data = await response.json()
        
        if (response.ok) {
          // Close modal and show success message
          this.modalOutlet.close()
          this.showFlashMessage(data.message, 'success')
        } else {
          // Show error message
          this.showFlashMessage(data.error, 'error')
          this.modalOutlet.close()
        }
      } catch (error) {
        console.error('Error sending join request:', error)
        this.showFlashMessage('An error occurred while sending the join request.', 'error')
        this.modalOutlet.close()
      }
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

  connect() {
    // Set up the yes button click handler
    const yesButton = document.getElementById('join-room-yes')
    if (yesButton) {
      yesButton.addEventListener('click', () => {
        this.sendJoinRequest()
      })
    }
  }
}
