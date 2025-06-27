# frozen_string_literal: true

class ConversationParticipant < ApplicationRecord
  belongs_to :conversation, class_name: 'Conversations::Conversation'
  belongs_to :user

  validates :role, presence: true
  validates :user_id, uniqueness: { scope: :conversation_id }

  scope :admins, -> { where(role: 'admin') }
  scope :members, -> { where(role: 'member') }
end
