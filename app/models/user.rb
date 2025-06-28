# frozen_string_literal: true

class User < ApplicationRecord
  include OnlineStatus
  has_secure_password

  has_many :conversation_participants, dependent: :destroy
  has_many :conversations, through: :conversation_participants

  has_many :messages, foreign_key: :sender_id, dependent: :nullify
  has_many :message_reactions, dependent: :destroy
  has_many :message_statuses, dependent: :destroy

  has_one_attached :avatar

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
    user_online?(id)
  end

  def as_json(options = {})
    super(options.merge(only: [:id, :first_name, :last_name, :email, :created_at]))
  end

  def generate_remember_token!
    update!(
      remember_token: SecureRandom.urlsafe_base64,
      remember_token_expires_at: 1.year.from_now
    )
  end

  def clear_remember_token!
    update!(remember_token: nil, remember_token_expires_at: nil)
  end

  def remember_token_valid?
    remember_token.present? && remember_token_expires_at&.future?
  end

  # Bypass type casting for password_reset_token
  def password_reset_token
    @attributes['password_reset_token']&.value_before_type_cast ||
    @attributes['password_reset_token']&.value
  end

  # Bypass type casting for remember_token
  def remember_token
    @attributes['remember_token']&.value_before_type_cast ||
    @attributes['remember_token']&.value
  end
end
