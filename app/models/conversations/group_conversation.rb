# frozen_string_literal: true

module Conversations
  class GroupConversation < Conversation
    scope :groups, GroupConversationsQuery

    # Virtual attributes for query results
    attr_accessor :member_count, :has_unread_messages, :is_member, :description

    validates :name, presence: true, length: { minimum: 1, maximum: 100 }

    def group?
      true
    end

    def direct?
      false
    end

    def as_json
      {
        id:,
        name:,
        description:,
        is_public:,
        created_by_id:,
        created_at: created_at.iso8601,
        member_count:,
        has_unread_messages:,
        is_member:,
        type: 'group'
      }
    end
  end
end
