class Chat < ApplicationRecord
  belongs_to :sender, class_name: "User", foreign_key: "user_id"
  belongs_to :room

  validates :sender, presence: true
  validates :room, presence: true
  validates :type, presence: true
end
