# frozen_string_literal: true

class User < ApplicationRecord
  # Modules
  has_secure_password

  # Associations
  has_one_attached :avatar
  has_many :room_users
  has_many :chats
  has_many :created_rooms, class_name: 'Room', foreign_key: 'user_id'
  has_many :joined_rooms, through: :room_users, source: :room

  # Scopes
  scope :chats_by_room, ->(room_id) { joins(:chats).where(rooms: { id: room_id }) }

  # Validations
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }, allow_nil: true

  def name
    "#{first_name} #{last_name}"
  end

  def generate_password_reset_token!
    update!(
      password_reset_token: SecureRandom.urlsafe_base64,
      password_reset_sent_at: Time.current
    )
  end

  def clear_password_reset_token!
    update!(password_reset_token: nil, password_reset_sent_at: nil)
  end

  def online?
    channels = Rails.cache.fetch("user_#{id}_online_channels_ids") { {} }
    channels.any? { |_, timestamp| timestamp > Time.current }
  end
end
