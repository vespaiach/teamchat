# frozen_string_literal: true

class AddConversationsTable < ActiveRecord::Migration[8.0]
  def change
    create_table :conversations do |t|
      t.string      :name
      t.string      :description
      t.boolean     :is_public,       null: false, default: true
      t.references  :created_by,      null: false, foreign_key: { to_table: :users }
      t.string      :type,            null: false, default: 'Conversations::GroupConversation'

      t.datetime :deleted_at
      t.timestamps
    end

    add_index :conversations, :is_public
    add_index :conversations, :type
  end
end
