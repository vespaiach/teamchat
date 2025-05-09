import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  connect() {
    const noticeEl = this.element
    setTimeout(() => {
      this.animateAndRemove(noticeEl)
    }, 3000)
  }

  close() {
    this.animateAndRemove(this.element)
  }

  animateAndRemove(element) {
    element.addEventListener('animationend', () => { element.remove() }, { once: true })
    element.classList.add('slide-out-top')
  }
}
