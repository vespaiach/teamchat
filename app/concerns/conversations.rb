# frozen_string_literal: true

module Conversations
  extend ActiveSupport::Concern

  def group_conversations
    GroupConversationsQuery.resolve(current_user:).map { |c| conversation_json(c) }
  end

  private

  def conversation_json(conversation, is_group: true)
    {
      id: conversation.id,
      name: conversation.name,
      isGroup: is_group,
      isPublic: conversation.is_public,
      createdById: conversation.created_by_id,
      created_at: conversation.created_at.iso8601,
      memberCount: is_group ? conversation.member_count : nil,
      hasUnreadMessages: conversation.has_unread_messages,
      isMember: conversation.is_member
    }
  end
end
