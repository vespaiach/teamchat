# frozen_string_literal: true

class ConversationsQuery < ApplicationQuery
  def resolve(current_user:)
    relation
      .joins("LEFT JOIN conversation_participants cp_self ON cp_self.conversation_id = conversations.id AND cp_self.user_id = #{current_user.id}")
      .joins('LEFT JOIN conversation_participants cp_all ON cp_all.conversation_id = conversations.id')
      .left_joins(:messages)
      .select(
        'conversations.*',
        'COUNT(DISTINCT cp_all.user_id) AS member_count',
        is_member_case_sql(current_user.id),
        unread_case_sql
      )
      .group('conversations.id, cp_self.last_read_message_id')
      .order('conversations.updated_at DESC')
  end

  private

  def is_member_case_sql(user_id)
    <<-SQL.squish
      CASE
        WHEN cp_self.user_id IS NOT NULL THEN TRUE
        ELSE FALSE
      END AS is_member
    SQL
  end

  def unread_case_sql
    <<-SQL.squish
      CASE
        WHEN cp_self.user_id IS NULL THEN FALSE
        WHEN cp_self.last_read_message_id IS NULL AND MAX(messages.id) IS NOT NULL THEN TRUE
        WHEN MAX(messages.id) IS NULL THEN FALSE
        ELSE MAX(messages.id) > cp_self.last_read_message_id
      END AS has_unread
    SQL
  end
end
