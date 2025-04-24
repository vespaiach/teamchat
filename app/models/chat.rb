class Chat < ApplicationRecord
  belongs_to :sender, class_name: "User", foreign_key: "user_id"
  belongs_to :room

  broadcasts_to ->(chat) { chat.room }, inserts_by: "append", partial: "chats/new_chat", target: "chats-container"

  has_one_attached :file_attachment

  validates :sender, presence: true
  validates :room, presence: true
end
