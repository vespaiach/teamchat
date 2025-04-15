class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def chat(data)
    Chat.create!(
      type: data["type"],
      user: current_user,
      room_id: data["room_id"],
      message: data["message"]
    )
    ActionCable.server.broadcast("room_channel", data)
  end
end
