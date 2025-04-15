class User < ApplicationRecord
  has_secure_password

  has_many :room_users
  has_many :chats
  has_many :created_rooms, class_name: "Room", foreign_key: "user_id"
  has_many :joined_rooms, through: :room_users, source: :room

  scope :chats_by_room, ->(room_id) { joins(:chats).where(rooms: { id: room_id }) }

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }, allow_nil: true

  def name
    "#{first_name} #{last_name}"
  end
end
