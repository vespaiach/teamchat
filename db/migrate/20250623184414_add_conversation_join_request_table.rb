# frozen_string_literal: true

class AddConversationJoinRequestTable < ActiveRecord::Migration[8.0]
  def change
    create_enum :request_status, %w[pending approved rejected]

    create_table :conversation_join_requests do |t|
      t.references :conversation, null: false, foreign_key: true
      t.references :user,         null: false, foreign_key: true
      t.enum :status, enum_type: :request_status, null: false, default: :pending
      t.text :message

      t.datetime :deleted_at
      t.timestamps
    end

    add_index :conversation_join_requests, [:conversation_id, :user_id], unique: true, name: "index_join_requests_on_convo_user"
  end
end
