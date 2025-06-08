# frozen_string_literal: true

class Chat < ApplicationRecord
  belongs_to :sender, class_name: 'User', foreign_key: 'user_id'
  belongs_to :room

  # Scopes for efficient querying
  scope :by_room, ->(room_id) { where(room_id: room_id) }
  scope :after_id, ->(id) { where('id > ?', id) }
  scope :before_id, ->(id) { where('id < ?', id) }
  scope :with_sender, -> { includes(:sender) }
  scope :recent_first, -> { order(id: :desc) }
  scope :chronological, -> { order(:id) }
  scope :active, -> { where(deleted_at: nil) }

  broadcasts_to ->(chat) { [chat.room] }, inserts_by: 'append', partial: 'rooms/chat', target: 'chats-container'

  has_one_attached :file_attachment

  validates :sender, presence: true
  validates :room, presence: true
end
