# frozen_string_literal: true

class AddUserTable < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email, null: false, index: { unique: true }

      t.timestamptz :deleted_at
      t.timestamps
    end
  end
end
