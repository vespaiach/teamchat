# frozen_string_literal: true

class OnlineStatusChannel < ApplicationCable::Channel
  # Include ActionView helpers for dom_id
  include ActionView::RecordIdentifier

  before_subscribe :store_channel_id
  before_unsubscribe :remove_channel_id

  def subscribed
    stream_from 'users_online_status'
    broadcast_online_status
  end

  def unsubscribed
    broadcast_online_status
  end

  def ping
    store_channel_id
    broadcast_online_status
  end

  private

  def remove_channel_id
    channels = retrieve_channel_ids
    channels.delete(self.object_id)
    Rails.cache.write(channels_cache_key, channels)
  end

  def store_channel_id
    channels = retrieve_channel_ids
    channels[self.object_id] = Time.current + 10.seconds
    Rails.cache.write(channels_cache_key, channels)
    Rails.cache.write("user_#{current_user.id}_last_seen_at", Time.current)
  end

  def retrieve_channel_ids
    Rails.cache.fetch(channels_cache_key) { {} }
  end

  def channels_cache_key
    "user_#{current_user.id}_online_channels_ids"
  end

  def broadcast_online_status
    ActionCable.server.broadcast(
      'users_online_status',
      {
        user_id: current_user.id,
        online: current_user.online?,
        last_seen_at: Rails.cache.read("user_#{current_user.id}_last_seen_at")
      }
    )
  end
end
