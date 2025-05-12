import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['menu', 'button', 'hamburger']

  toggle() {
    if (this.menuTarget.classList.contains('h-0!')) {
      this.menuTarget.classList.remove('h-0!')
      this.hamburgerTarget.classList.add('open')
      window.scrollTo({ top: 0 })
    } else {
      this.menuTarget.classList.add('h-0!')
      this.hamburgerTarget.classList.remove('open')
    }
  }

  animateAndRemove(element) {
    element.addEventListener(
      'animationend',
      () => {
        element.remove()
      },
      { once: true }
    )
    element.classList.add('slide-out-top')
  }
}
