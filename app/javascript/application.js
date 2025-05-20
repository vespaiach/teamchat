// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import { Turbo } from "@hotwired/turbo-rails"
import "controllers"
import "channels"
import * as ActiveStorage from "@rails/activestorage"

ActiveStorage.start()
Turbo.start()

Turbo.StreamActions['add-css-class'] = function () {
	this.targetElements.forEach((e) => e.classList.add(this.templateContent))
}