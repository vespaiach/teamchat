import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['emailInput', 'passwordInput', 'emailError', 'passwordError']

  connect() {
    console.log('SigninController connected')
  }

  validate(event) {
    let isValid = true

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // Validate email
    if (!this.emailInputTarget.value.trim() || !emailRegex.test(this.emailInputTarget.value.trim())) {
      this.emailErrorTarget.innerText = 'Please enter a valid email address'
      this.emailErrorTarget.classList.remove('invisible')
      isValid = false
    } else {
      this.emailErrorTarget.classList.add('invisible')
    }

    // Validate password
    if (!this.passwordInputTarget.value.trim()) {
      this.passwordErrorTarget.classList.remove('invisible')
      this.passwordErrorTarget.innerText = 'Please enter your password'
      isValid = false
    } else {
      this.passwordErrorTarget.classList.add('invisible')
    }

    // Prevent form submission if validation fails
    if (!isValid) {
      event.preventDefault()
    }
  }
}
