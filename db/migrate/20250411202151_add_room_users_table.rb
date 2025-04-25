# frozen_string_literal: true

class AddRoomUsersTable < ActiveRecord::Migration[8.0]
  def change
    create_table :room_users do |t|
      t.references :room, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamptz :deleted_at
      t.timestamps
    end

    add_index :room_users, [:room_id, :user_id], unique: true
  end
end
