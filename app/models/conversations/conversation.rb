# frozen_string_literal: true

module Conversations
  class Conversation < ApplicationRecord
    belongs_to :created_by, class_name: 'User', foreign_key: :created_by_id

    has_many :conversation_participants, class_name: 'ConversationParticipant', dependent: :destroy
    has_many :participants, through: :conversation_participants, source: :user
    has_many :messages, dependent: :destroy

    before_validation :ensure_direct_conversations_are_private

    scope :publicly_visible, -> { where(is_public: true) }
    scope :private_only, -> { where(is_public: false) }
    scope :by_creator, -> { where(created_by_id: _1) }

    # STI method - to be overridden in subclasses
    def group?
      false
    end

    def direct?
      false
    end

    def as_json(options = {})
      super(options.merge(only: [:id, :name, :is_public, :created_at]))
    end

    private

    def ensure_direct_conversations_are_private
      self.is_public = false if direct?
    end
  end
end
