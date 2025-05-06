import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static outlets = ['modal']

  openCreateRoomModal() {
    this.modalOutlet.open()
  }
}
