// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
import RoomController from "controllers/room_controller"
import ChatsController from "controllers/chats_controller"
import FlashMessageController from "controllers/flash_message_controller"
eagerLoadControllersFrom("controllers", application)
application.register("room", RoomController)
application.register("chats", ChatsController)
application.register("flash-message", FlashMessageController)