// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
import RoomController from "controllers/room_controller"
import ChatInputController from "controllers/chat_input_controller"
import FlashMessageController from "controllers/flash_message_controller"
eagerLoadControllersFrom("controllers", application)
application.register("room", RoomController)
application.register("chat-input", ChatInputController)
application.register("flash-message", FlashMessageController)