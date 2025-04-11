# frozen_string_literal: true

class AddRoomTable < ActiveRecord::Migration[8.0]
  def change
    create_table :rooms do |t|
      t.string :name
      t.references :user, null: false, foreign_key: true

      t.timestamptz :deleted_at
      t.timestamps
    end
  end
end
