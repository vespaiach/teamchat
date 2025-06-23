# frozen_string_literal: true

class Conversation < ApplicationRecord
  belongs_to :creator, class_name: 'User', foreign_key: :created_by_id

  has_many :conversation_participants, dependent: :destroy
  has_many :participants, through: :conversation_participants, source: :user
  has_many :messages, dependent: :destroy

  scope :publicly_visible, -> { where(is_public: true) }
  scope :private_only, -> { where(is_public: false) }
  scope :group_chats, -> { where(is_group: true) }
  scope :direct_chats, -> { where(is_group: false) }

  validates :is_group, inclusion: { in: [true, false] }
end
