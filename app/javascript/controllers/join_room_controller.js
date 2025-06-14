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
        
        if (response.ok) {
          // Close modal and redirect to rooms index
          this.modalOutlet.close()
          window.location.href = '/rooms'
        } else {
          console.error('Failed to send join request')
        }
      } catch (error) {
        console.error('Error sending join request:', error)
      }
    }
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
