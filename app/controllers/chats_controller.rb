class ChatsController < ApplicationController
  before_action :set_room

  def create
    @chat = @room.chats.create!(message_params.merge(sender: current_user))
    respond_to do |format|
      format.json { render json: { success: true }, status: :created }
    end
  end

  private

  def set_room
    @room = Room.belonging_to_member(current_user.id).find_by!(id: params[:room_id])
  end

  def message_params
    case params[:type]
    when "LinkMessage"
      params.permit(:url, :type)
    when "TextMessage"
      params.permit(:message, :type)
    end
  end
end
