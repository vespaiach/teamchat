import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  connect() {
    const messageEl = this.element
    setTimeout(() => {
      messageEl.remove()
    }, 3000)
  }
}
