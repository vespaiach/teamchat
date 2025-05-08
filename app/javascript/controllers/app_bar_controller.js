import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['dropdownMenu', 'menuButton']

  connect() {
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }

  disconnect() {
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }

  handleClickOutside(event) {
    if (!this.dropdownMenuTarget.contains(event.target) && !this.menuButtonTarget.contains(event.target)) {
      this.dropdownMenuTarget.classList.add('hidden');
    }
  }

  toggleMenu() {
    this.dropdownMenuTarget.classList.toggle('hidden')
  }
}