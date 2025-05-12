import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['email', 'emailError']

  validate(event) {
    let isValid = true

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!this.emailTarget.value.trim() || !emailRegex.test(this.emailTarget.value.trim())) {
      this.emailErrorTarget.classList.remove('invisible')
      this.emailErrorTarget.textContent = 'Valid email is required'
      isValid = false
    } else {
      this.emailErrorTarget.classList.add('invisible')
    }

    if (!isValid) {
      event.preventDefault()
    }
  }
}
