# frozen_string_literal: true

class AddMessageReadTable < ActiveRecord::Migration[8.0]
  def change
    create_enum :message_status, %w[delivered read]

    create_table :message_statuses do |t|
      t.references  :message, null: false, foreign_key: true
      t.references  :user,    null: false, foreign_key: true
      t.enum        :status,  enum_type: :message_status, null: false, default: :delivered

      t.datetime    :deleted_at
      t.timestamps
    end

    add_index :message_statuses, [:message_id, :user_id], unique: true
  end
end
