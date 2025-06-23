# frozen_string_literal: true

class ConversationJoinRequest < ApplicationRecord
  belongs_to :conversation
  belongs_to :user

  enum status: {
    pending: 'pending',
    approved: 'approved',
    rejected: 'rejected'
  }

  scope :active, -> { where(deleted_at: nil) }
  scope :pending, -> { where(status: 'pending') }

  validates :user_id, uniqueness: { scope: :conversation_id }
end
