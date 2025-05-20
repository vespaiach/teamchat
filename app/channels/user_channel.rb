# frozen_string_literal: true

class UserChannel < ApplicationCable::Channel
  def subscribed
    stream_or_reject_for current_user
  end

  def unsubscribed; end

  def send_message(data)
    return unless current_user

    message = data['message']
    room(data).chats.create!(message:, sender: current_user)
  end

  private

  def room(data)
    room = Room.belonging_to_member(current_user.id).find_by(id: data['room_id'])
    reject unless room
    room
  end
end
