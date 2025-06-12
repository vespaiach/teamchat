# frozen_string_literal: true

class ChatChannel < ApplicationCable::Channel
  include LoadChats

  def subscribed
    stream_or_reject_for current_user
  end

  def unsubscribed; end

  def send_chat(data)
    return unless current_user

    message = data['message']
    room(data).chats.create!(message:, sender: current_user)
  end

  def load_chat_histories(data)
    return unless current_user

    chats = chat_histories_by_room(data['room_id'], data['last_seen_chat_id'], data['limit'])
    Turbo::StreamsChannel.broadcast_prepend_to(
      room(data),
      target: 'chats-container',
      partial: 'chats/list',
      locals: { chats: }
    )
  end

  private

  def room(data)
    room = Room.belonging_to_member(current_user.id).find_by(id: data['room_id'])
    reject unless room
    room
  end
end
