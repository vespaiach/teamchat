# frozen_string_literal: true

class ConversationParticipant < ApplicationRecord
  belongs_to :user
  belongs_to :conversation

  enum role: {
    member: 'member',
    admin: 'admin'
  }, _suffix: true

  validates :role, presence: true
  validates :user_id, uniqueness: { scope: :conversation_id }
end
