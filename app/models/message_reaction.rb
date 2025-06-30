# frozen_string_literal: true

class MessageReaction < ApplicationRecord
  belongs_to :message
  belongs_to :user

  validates :emoji, presence: true
  validates :user_id, uniqueness: { scope: [:message_id, :emoji], message: 'can only react once with the same emoji' }

  scope :active, -> { where(deleted_at: nil) }
end
