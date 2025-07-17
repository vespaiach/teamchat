# frozen_string_literal: true

class ConversationSubscriber < ActiveSupport::Subscriber
  attach_to :conversation

  def created(event)
    conversation = event.payload[:conversation]

    Rails.logger.info "ConversationSubscriber: Conversation created with ID #{conversation.id}"
  end
end
