# frozen_string_literal: true

module Conversations
  class GroupConversation < Conversation
    scope :groups, GroupConversationsQuery

    # Virtual attributes for query results - using attribute method for proper mapping
    attribute :member_count, :integer
    attribute :has_unread_messages, :boolean
    attribute :is_member, :boolean
    attribute :description, :string

    validates :name, presence: true, length: { minimum: 1, maximum: 100 }

    # Manual attribute assignment for query results (fallback if attribute method doesn't work)
    def assign_query_attributes(attrs = {})
      self.member_count = attrs['member_count'] if attrs.key?('member_count')
      self.has_unread_messages = attrs['has_unread_messages'] if attrs.key?('has_unread_messages') 
      self.is_member = attrs['is_member'] if attrs.key?('is_member')
      self.description = attrs['description'] if attrs.key?('description')
      self
    end

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
        is_member:
      }
    end
  end
end
