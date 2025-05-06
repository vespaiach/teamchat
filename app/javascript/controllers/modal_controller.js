import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['dialog']

  open() {
    if (this.hasDialogTarget) {
      this.dialogTarget.showModal()
      document.body.classList.add('overflow-hidden')
    } else {
      console.error('Modal dialog target not found')
    }
  }

  close() {
    if (this.hasDialogTarget) {
      this.dialogTarget.close()
      document.body.classList.remove('overflow-hidden')
    }
  }

  closeBackground(event) {
    if (event.target === this.dialogTarget) {
      this.close()
    }
  }
}
