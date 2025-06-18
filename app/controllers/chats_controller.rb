# frozen_string_literal: true

class ChatsController < ApplicationController
  before_action :set_room

  def create
    chat = @room.chats.create!(message: params[:message], sender: current_user)

    # Broadcast the new message to ChatChannel subscribers
    ChatChannel.broadcast_to(@room, {
      type: 'new_message',
      chat_id: chat.id,
      message: chat.message,
      sender: {
        id: chat.sender.id,
        name: chat.sender.name || chat.sender.email
      },
      created_at: chat.created_at,
      room_id: @room.id
    })

    render json: { status: 'success', message: 'Chat created successfully' }
  end

  def index
    respond_to do |format|
      format.turbo_stream
      format.html
    end
  end

  private

  def set_room
    @room = Room.belonging_to_member(current_user.id).find_by!(id: params[:room_id])
  end
end
