import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [
    "firstName", 
    "lastName", 
    "firstNameError", 
    "lastNameError",
    "avatarInput"
  ]

  connect() {
    console.log("Profile controller connected")
  }

  validate(event) {
    let isValid = true

    // Validate first name
    if (!this.firstNameTarget.value.trim()) {
      this.firstNameErrorTarget.classList.remove('invisible')
      isValid = false
    } else {
      this.firstNameErrorTarget.classList.add('invisible')
    }

    // Validate last name
    if (!this.lastNameTarget.value.trim()) {
      this.lastNameErrorTarget.classList.remove('invisible')
      isValid = false
    } else {
      this.lastNameErrorTarget.classList.add('invisible')
    }

    if (!isValid) {
      event.preventDefault()
    }
  }

  previewAvatar(event) {
    const input = event.target
    if (input.files && input.files[0]) {
      const placeholder = document.getElementById('avatar-placeholder')
      const preview = document.getElementById('avatar-preview')
      
      if (placeholder) {
        placeholder.classList.add('hidden')
      }
      
      if (preview) {
        const reader = new FileReader()
        
        reader.onload = function(e) {
          preview.src = e.target.result
          preview.classList.remove('hidden')
        }
        
        reader.readAsDataURL(input.files[0])
      }
    }
  }
}