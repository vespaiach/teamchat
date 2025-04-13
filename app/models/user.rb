class User < ApplicationRecord
  has_secure_password
  has_many :rooms, through: :room_users
  has_many :chats

  scope :chats_by_room, ->(room_id) { joins(:chats).where(rooms: { id: room_id }) }

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }, allow_nil: true

  def name
    "#{first_name} #{last_name}"
  end
end
