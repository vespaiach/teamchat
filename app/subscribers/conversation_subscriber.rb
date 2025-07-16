# frozen_string_literal: true

class ConversationSubscriber < ActiveSupport::Subscriber
  attach_to :conversation

  def created(event)
    debugger
    p "CONVERSATION CREATED: #{event.payload[:conversation].id}"
    # Handle the conversation created event (e.g., send a notification)
  end
end
