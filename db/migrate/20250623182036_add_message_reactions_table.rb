# frozen_string_literal: true

class AddMessageReactionsTable < ActiveRecord::Migration[8.0]
  def change
    create_table :message_reactions do |t|
      t.references :message, null: false, foreign_key: true
      t.references :user,    null: false, foreign_key: true
      t.string     :emoji,   null: false  # e.g., '👍', '❤️', '😂'

      t.datetime   :deleted_at
      t.timestamps
    end

    add_index :message_reactions, [:message_id, :user_id, :emoji], unique: true, name: 'index_reactions_on_message_user_emoji'
  end
end
