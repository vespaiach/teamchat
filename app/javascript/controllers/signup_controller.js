import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['firstName', 'lastName', 'email', 'password', 'passwordConfirmation', 'firstNameError', 'lastNameError', 'emailError', 'passwordError', 'passwordConfirmationError']

  validate(event) {
    let isValid = true

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

    // Validate email
    if (!this.emailTarget.value.trim() || !emailRegex.test(this.emailTarget.value.trim())) {
      this.emailErrorTarget.classList.remove('invisible')
      isValid = false
    } else {
      this.emailErrorTarget.classList.add('invisible')
    }

    // Validate password
    if (!this.passwordTarget.value.trim() || this.passwordTarget.value.trim().length < 6) {
      this.passwordErrorTarget.classList.remove('invisible')
      isValid = false
    } else {
      this.passwordErrorTarget.classList.add('invisible')
    }

    // Validate password confirmation
    if (this.passwordTarget.value !== this.passwordConfirmationTarget.value) {
      this.passwordConfirmationErrorTarget.classList.remove('invisible')
      isValid = false
    } else {
      this.passwordConfirmationErrorTarget.classList.add('invisible')
    }

    // Prevent form submission if validation fails
    if (!isValid) {
      event.preventDefault()
    }
  }
}