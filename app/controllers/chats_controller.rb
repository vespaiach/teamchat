# frozen_string_literal: true

class ChatsController < ApplicationController
  before_action :set_room

  def create
    sleep 1

    if params[:message].present?
      chat = @room.chats.create!(message: params[:message], sender: current_user)
      # TODO: move this to a background job for better performance
      # Broadcast the new message to ChatChannel subscribers
      ChatChannel.broadcast_to(@room, chat.json)
    end

    render json: { status: 'success', message: 'Chat created successfully' }
  end

  private

  def set_room
    @room = Room.belonging_to_member(current_user.id).find_by!(id: params[:room_id])
  end
end
