class RoomChannel < ApplicationCable::Channel
  def subscribed
    room = Room.belonging_to_member(current_user.id).find_by(id: params[:room_id])
    stream_or_reject_for room
  end
end
