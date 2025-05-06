import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["name", "nameError"]

  validate(event) {
    const nameValue = this.nameTarget.value.trim()
    
    // Reset error visibility
    this.nameErrorTarget.classList.add("invisible")
    
    let isValid = true
    
    // Validate room name
    if (!nameValue) {
      this.nameErrorTarget.innerText = "Room name is required."
      this.nameErrorTarget.classList.remove("invisible")
      isValid = false
    } else if (nameValue.length > 50) {
      this.nameErrorTarget.innerText = "Room name cannot be longer than 50 characters."
      this.nameErrorTarget.classList.remove("invisible")
      isValid = false
    }
    
    if (!isValid) {
      event.preventDefault()
    }
  }
}