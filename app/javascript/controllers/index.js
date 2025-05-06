// Import and register all your controllers from the importmap via controllers/**/*_controller
import { application } from "controllers/application"
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
import RoomController from "controllers/room_controller"
import ChatInputController from "controllers/chat_input_controller"
import FlashMessageController from "controllers/flash_message_controller"
import ChatsController from "controllers/chats_controller"
import SigninController from "controllers/signin_controller"
import PasswordResetsController from "controllers/password_resets_controller"
import ModalController from "controllers/modal_controller"
import RoomFormController from "controllers/room_form_controller"
eagerLoadControllersFrom("controllers", application)
application.register("room", RoomController)
application.register("chat-input", ChatInputController)
application.register("flash-message", FlashMessageController)
application.register("chats", ChatsController)
application.register("signin", SigninController)
application.register("password-resets", PasswordResetsController)
application.register("modal", ModalController)
application.register("room-form", RoomFormController)