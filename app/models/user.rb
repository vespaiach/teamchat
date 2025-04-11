class User < ApplicationRecord
  has_many :rooms, through: :room_users
  has_many :chats

  scope :chats_by_room, ->(room_id) { joins(:chats).where(rooms: { id: room_id }) }

  validates :email, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true

  def name
    "#{first_name} #{last_name}"
  end
end
