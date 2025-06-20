# frozen_string_literal: true

class CreateJoinRequests < ActiveRecord::Migration[8.0]
  def change
    create_table :join_requests do |t|
      t.references :user, null: false, foreign_key: true
      t.references :room, null: false, foreign_key: true
      t.string :status, default: 'pending', null: false
      t.text :message
      t.timestamptz :deleted_at

      t.timestamps
    end

    add_index :join_requests, [:user_id, :room_id], unique: true
    add_index :join_requests, :deleted_at
  end
end
