# frozen_string_literal: true

class AddConversationsTable < ActiveRecord::Migration[8.0]
  def change
    create_table :conversations do |t|
      t.string   :name
      t.boolean  :is_group,        null: false, default: false
      t.references :created_by,    null: false, foreign_key: { to_table: :users }

      t.datetime :deleted_at
      t.timestamps
    end

    add_index :conversations, :is_group
  end
end
