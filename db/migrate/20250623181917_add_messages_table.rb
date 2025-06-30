# frozen_string_literal: true

class AddMessagesTable < ActiveRecord::Migration[8.0]
  def change
    create_enum :message_type, %w[text image audio video file]

    create_table :messages do |t|
      t.references  :conversation, null: false, foreign_key: true
      t.references  :sender,       null: false, foreign_key: { to_table: :users }

      t.text        :content
      t.enum        :message_type, enum_type: :message_type, null: false, default: :text

      t.references  :parent_message, foreign_key: { to_table: :messages }

      t.datetime    :deleted_at
      t.timestamps
    end

    add_index :messages, :message_type
    add_index :messages, [:conversation_id, :created_at], name: 'index_messages_on_convo_and_created_at'
  end
end
