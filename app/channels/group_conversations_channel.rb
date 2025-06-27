# frozen_string_literal: true

class GroupConversationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "conversations_#{current_user.id}"
  end

  def unsubscribed
    # Clean up when channel is unsubscribed
    stop_all_streams
  end
end
