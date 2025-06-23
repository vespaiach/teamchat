# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :conversation
  belongs_to :sender, class_name: 'User'
  belongs_to :parent_message, class_name: 'Message', optional: true

  has_many :replies, class_name: 'Message', foreign_key: :parent_message_id, dependent: :nullify

  has_many_attached :files
  has_many :message_reactions, dependent: :destroy
  has_many :message_statuses, dependent: :destroy

  enum message_type: {
    text: 'text',
    image: 'image',
    audio: 'audio',
    file: 'file'
  }, _suffix: true

  scope :active, -> { where(deleted_at: nil) }
  scope :recent, -> { order(created_at: :desc) }

  validates :message_type, presence: true
  validates :content, presence: true, if: -> { text? }
end
