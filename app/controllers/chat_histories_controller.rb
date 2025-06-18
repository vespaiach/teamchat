# frozen_string_literal: true

class ChatHistoriesController < ApplicationController
  include LoadChats

  before_action :set_room

  def index
    render json: recent_chats_by_room(@room).map(&:json)
  end

  private

  def set_room
    @room = Room.belonging_to_member(current_user.id).find_by!(id: params[:room_id])
  end
end
