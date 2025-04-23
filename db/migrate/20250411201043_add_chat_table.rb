# frozen_string_literal: true

class AddChatTable < ActiveRecord::Migration[8.0]
  def change
    create_table :chats do |t|
      t.references :user, null: false, foreign_key: true
      t.references :room, null: false, foreign_key: true
      t.text :message
      t.jsonb :custom_data, null: false, default: {}

      t.timestamptz :deleted_at
      t.timestamps
    end
  end
end
