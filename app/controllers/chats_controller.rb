# frozen_string_literal: true

class ChatsController < ApplicationController
  before_action :set_room

  def create_text
    @room.chats.create!(message: params[:message], sender: current_user)
    head :ok
  end

  def create_file
    chat = Chat.new(message: "#{current_user.name} shared a file", sender: current_user, room: @room)
    chat.file_attachment.attach(params[:file_attachment])
    if chat.file_attachment.attached?
      chat.type = get_chat_type(chat)
      chat.save!
      respond_to do |format|
        format.turbo_stream do
          render turbo_stream: turbo_stream.replace("file_upload_form", partial: "shares/flash_message", locals: { message: "File uploaded successfully!" })
        end
      end
    end
  end

  private

  def set_room
    @room = Room.belonging_to_member(current_user.id).find_by!(id: params[:room_id])
  end

  def get_chat_type(chat)
    if chat.file_attachment.content_type.start_with?("image/")
      "PhotoMessage"
    elsif chat.file_attachment.content_type.start_with?("video/")
      "VideoMessage"
    elsif chat.file_attachment.content_type.start_with?("audio/")
      "AudioMessage"
    else
      "FileMessage"
    end
  end
end
