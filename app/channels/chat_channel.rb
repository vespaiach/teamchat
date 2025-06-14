# frozen_string_literal: true

class ChatChannel < ApplicationCable::Channel
  include LoadChats

  def subscribed; end
  def unsubscribed; end

  def send_chat(data)
    return unless current_user

    message = data['message']
    room(data).chats.create!(message:, sender: current_user)
  end

  def load_chat_histories(data)
    return unless current_user

    target_room = room(data)

    # Pass parameters explicitly since channels don't have params
    room_id = data['room_id']
    last_seen_chat_id = data['last_seen_chat_id']
    limit = data['limit'] || 30

    Rails.logger.info "ChatChannel#load_chat_histories called with room_id: #{room_id}, last_seen_chat_id: #{last_seen_chat_id}, limit: #{limit}"

    chats = chat_histories_by_room(room_id, last_seen_chat_id, limit)

    Rails.logger.info "ChatChannel#load_chat_histories found #{chats.count} chats"

    # Use Turbo::StreamsChannel to broadcast with custom action
    Turbo::StreamsChannel.broadcast_action_to(
      target_room,
      action: 'chat-histories-append',
      target: 'chats-container',
      partial: 'chats/list',
      locals: { chats: chats }
    )

    Rails.logger.info 'ChatChannel#load_chat_histories broadcast completed'
  end

  private

  def room(data)
    room = Room.belonging_to_member(current_user.id).find_by(id: data['room_id'])
    reject unless room
    room
  end
end
