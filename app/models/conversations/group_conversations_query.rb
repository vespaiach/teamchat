# frozen_string_literal: true

module Conversations
  class GroupConversationsQuery < ApplicationQuery
    def initialize(relation = GroupConversation.all) = super(relation)

    def resolve(current_user:)
      relation
        .joins("LEFT JOIN conversation_participants cp_self ON cp_self.conversation_id = conversations.id AND cp_self.user_id = #{current_user.id}")
        .left_joins(:conversation_participants)
        .left_joins(:messages)
        .select(
          'conversations.id',
          'conversations.name',
          'conversations.description',
          'conversations.is_public',
          'conversations.created_by_id',
          'conversations.created_at',
          'cp_self.last_read_message_id',
          'cp_self.id IS NOT NULL AS is_member',
          'COUNT(DISTINCT conversation_participants.user_id) AS member_count',
          'COALESCE(MAX(messages.id), 0) > COALESCE(cp_self.last_read_message_id, 0) AS has_unread_messages'
        )
        .group('1, 2, 3, 4, 5, 6, 7, 8')
        .order('has_unread_messages DESC, conversations.name ASC')
    end
  end
end
