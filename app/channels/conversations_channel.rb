# frozen_string_literal: true

class ConversationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from :conversations
  end

  def unsubscribed
    # Clean up when channel is unsubscribed
    stop_all_streams
  end
end
