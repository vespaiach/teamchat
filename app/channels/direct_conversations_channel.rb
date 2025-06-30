# frozen_string_literal: true

class DirectConversationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "direct_conversations_#{current_user.id}"
  end

  def unsubscribed
    stop_all_streams
  end
end
