class Chat < ApplicationRecord
  belongs_to :sender, class_name: "User", foreign_key: "user_id"
  belongs_to :room

  broadcasts_to ->(chat) { [ chat.room, :chats ] }, inserts_by: :append, partial: "chats/chat", target: "room_chats"

  validates :sender, presence: true
  validates :room, presence: true
  validates :type, presence: true
end
