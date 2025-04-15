import { Controller } from "@hotwired/stimulus"
import { sendChat } from "channels/room_channel"

export default class extends Controller {
  static targets = ["input"]

  connect() {
    console.log("Chat input controller connected");
  }

  _send(message) {
    sendChat(message);
    this.inputTarget.value = '';
    console.log("Message sent:", message);
  }

  click(event) {
    event.preventDefault();
    const message = this.inputTarget.value.trim();
    if (message) {
      this._send(message);
    }
  }
  
  keyup(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const message = this.inputTarget.value.trim();
      if (message) {
        this._send(message);
      }
    }
  }
}
