import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['firstName', 'firstNameError', 'lastName', 'lastNameError', 'avatarInput']

  validate(event) {
    const firstNameValue = this.firstNameTarget.value.trim()
    const lastNameValue = this.lastNameTarget.value.trim()

    // Reset error visibility
    this.firstNameErrorTarget.classList.add('invisible')
    this.lastNameErrorTarget.classList.add('invisible')

    let isValid = true

    // Validate first name
    if (!firstNameValue) {
      this.firstNameErrorTarget.innerText = 'First name is required.'
      this.firstNameErrorTarget.classList.remove('invisible')
      isValid = false
    }

    // Validate last name
    if (!lastNameValue) {
      this.lastNameErrorTarget.innerText = 'Last name is required.'
      this.lastNameErrorTarget.classList.remove('invisible')
      isValid = false
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

        reader.onload = function (e) {
          preview.src = e.target.result
          preview.classList.remove('hidden')
        }

        reader.readAsDataURL(input.files[0])
      }
    }
  }
}
