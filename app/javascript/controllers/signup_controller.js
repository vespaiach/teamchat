import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['firstName', 'lastName', 'email', 'password', 'passwordConfirmation', 'firstNameError', 'lastNameError', 'emailError', 'passwordError', 'passwordConfirmationError']

  validate(event) {
    let isValid = true

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!this.firstNameTarget.value.trim()) {
      this.firstNameErrorTarget.classList.remove('invisible')
      this.firstNameErrorTarget.textContent = 'First name is required'
      isValid = false
    } else {
      this.firstNameErrorTarget.classList.add('invisible')
    }

    if (!this.lastNameTarget.value.trim()) {
      this.lastNameErrorTarget.classList.remove('invisible')
      this.lastNameErrorTarget.textContent = 'Last name is required'
      isValid = false
    } else {
      this.lastNameErrorTarget.classList.add('invisible')
    }

    if (!this.emailTarget.value.trim() || !emailRegex.test(this.emailTarget.value.trim())) {
      this.emailErrorTarget.classList.remove('invisible')
      this.emailErrorTarget.textContent = 'Valid email is required'
      isValid = false
    } else {
      this.emailErrorTarget.classList.add('invisible')
    }

    if (!this.passwordTarget.value.trim() || this.passwordTarget.value.trim().length < 6) {
      this.passwordErrorTarget.classList.remove('invisible')
      this.passwordErrorTarget.textContent = 'Password must be at least 6 characters'
      isValid = false
    } else {
      this.passwordErrorTarget.classList.add('invisible')
    }

    if (this.passwordTarget.value !== this.passwordConfirmationTarget.value) {
      this.passwordConfirmationErrorTarget.classList.remove('invisible')
      this.passwordConfirmationErrorTarget.textContent = 'Passwords do not match'
      isValid = false
    } else {
      this.passwordConfirmationErrorTarget.classList.add('invisible')
    }

    if (!isValid) {
      event.preventDefault()
    }
  }
}