import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['email', 'password', 'emailError', 'passwordError']

  connect() {
    console.log('SigninController connected')
  }

  validate(event) {
    let isValid = true

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Validate email
    if (!this.emailTarget.value.trim() || !emailRegex.test(this.emailTarget.value.trim())) {
      this.emailErrorTarget.classList.remove('hidden')
      isValid = false
    } else {
      this.emailErrorTarget.classList.add('hidden')
    }

    // Validate password
    if (!this.passwordTarget.value.trim()) {
      this.passwordErrorTarget.classList.remove('hidden')
      isValid = false
    } else {
      this.passwordErrorTarget.classList.add('hidden')
    }

    // Prevent form submission if validation fails
    if (!isValid) {
      event.preventDefault()
    }
  }
}
