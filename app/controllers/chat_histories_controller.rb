# frozen_string_literal: true

class ChatHistoriesController < ApplicationController
  include LoadChats

  before_action :set_room

  def index
    render json: chats
  end

  private

  def chats
    recent_chats_by_room(@room).map do |chat|
      chat.as_json.merge({ sender: chat.sender.as_json })
    end
  end

  def set_room
    @room = Room.belonging_to_member(current_user.id).find_by!(id: params[:room_id])
  end
end
