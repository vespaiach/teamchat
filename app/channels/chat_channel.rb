# frozen_string_literal: true

class ChatChannel < ApplicationCable::Channel
  def subscribed
    # Subscribe to the specific room's chat stream
    room = find_room
    if room&.users&.include?(current_user)
      stream_for room
    else
      reject
    end
  end

  def unsubscribed
    # Clean up when channel is unsubscribed
    stop_all_streams
  end

  private

  def find_room
    room_id = params[:room_id]
    return nil unless room_id

    Room.belonging_to_member(current_user.id).find_by(id: room_id)
  end
end
