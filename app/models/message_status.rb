# frozen_string_literal: true

class MessageStatus < ApplicationRecord
  belongs_to :message
  belongs_to :user

  enum :status, {
    delivered: 'delivered',
    read: 'read'
  }

  validates :status, presence: true
  validates :user_id, uniqueness: { scope: :message_id }

  scope :delivered, -> { where(status: 'delivered') }
  scope :read, -> { where(status: 'read') }
end
