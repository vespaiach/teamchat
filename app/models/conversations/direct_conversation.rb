# frozen_string_literal: true

module Conversations
  class DirectConversation < Conversation
    scope :list, DirectConversationsQuery

    # Virtual attributes for query results
    attr_accessor :has_unread_messages

    def direct?
      true
    end

    def group?
      false
    end

    def as_json
      {
        id:,
        created_by_id:,
        created_at: created_at.iso8601,
        has_unread_messages: has_unread_messages.present?,
        participants:
      }
    end
  end
end
