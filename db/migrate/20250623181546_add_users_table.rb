# frozen_string_literal: true

class AddUsersTable < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string   :first_name
      t.string   :last_name
      t.string   :email,              null: false, index: { unique: true }
      t.string   :time_zone,          null: false
      t.string   :role
      t.string   :department

      t.string   :password_digest,    null: false
      t.string   :password_reset_token
      t.datetime :password_reset_sent_at
      t.string   :remember_token
      t.datetime :remember_token_expires_at

      t.datetime :deleted_at
      t.timestamps
    end
  end
end
