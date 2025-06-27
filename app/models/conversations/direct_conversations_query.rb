# frozen_string_literal: true

module Conversations
  class DirectConversationsQuery < ApplicationQuery
    # relation = DirectConversation is there for rails to map to DirectConversation model not Converstions::Conversation
    def initialize(relation = DirectConversation.all) = super(relation)

    def resolve(current_user:)
      relation
        .unscope(where: [:type, :deleted_at])
        .with(
          my_dms: relation.joins(
              "INNER JOIN conversation_participants ON conversation_participants.conversation_id = conversations.id AND conversation_participants.user_id = #{current_user.id}",
              'LEFT JOIN messages ON messages.conversation_id = conversation_participants.last_read_message_id'
            )
            .group('1,2,3,4')
            .select(
              'conversations.id',
              'conversations.created_by_id',
              'conversations.created_at',
              'conversation_participants.last_read_message_id',
              'COALESCE(MAX(messages.id), 0) > COALESCE(conversation_participants.last_read_message_id, 0) AS has_unread_messages'
            )
        )
        .with(
          participants: ConversationParticipant.joins('INNER JOIN my_dms ON my_dms.id = conversation_participants.conversation_id')
            .joins('INNER JOIN users ON users.id = conversation_participants.user_id')
            .group('1')
            .select(
              'conversation_participants.conversation_id AS id',
              "JSON_AGG(JSON_BUILD_OBJECT('id', users.id, 'email', users.email, 'first_name', users.first_name, 'last_name', users.last_name)) AS participants"
            )
        )
        .from('my_dms')
        .joins('INNER JOIN participants ON participants.id = my_dms.id')
        .select(
          'my_dms.id AS id',
          'my_dms.created_by_id',
          'my_dms.created_at',
          'my_dms.has_unread_messages',
          'participants.participants'
        )
    end
  end
end
