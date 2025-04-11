class Room < ApplicationRecord
  has_many :room_users
  has_many :chats
  has_many :users, through: :room_users
  belongs_to :created_by, class_name: "User", foreign_key: "user_id"

  validates :created_by, presence: true
end
