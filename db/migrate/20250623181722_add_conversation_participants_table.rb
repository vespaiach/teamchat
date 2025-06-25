# frozen_string_literal: true

class AddConversationParticipantsTable < ActiveRecord::Migration[8.0]
  def change
    create_enum :conversation_role, %w[admin member]

    create_table    :conversation_participants do |t|
      t.references  :conversation,  null: false, foreign_key: true
      t.references  :user,          null: false, foreign_key: true
      t.enum        :role,          enum_type: :conversation_role, default: :member, null: false
      t.datetime    :joined_at,     null: false, default: -> { 'CURRENT_TIMESTAMP' }

      t.datetime    :deleted_at
      t.timestamps
    end

    add_index :conversation_participants, [:conversation_id, :user_id], unique: true, name: 'index_convo_participants_on_convo_id_and_user_id'
  end
end
