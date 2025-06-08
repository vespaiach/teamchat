# frozen_string_literal: true

class AddIndexToCreatedAtColumn < ActiveRecord::Migration[8.0]
  def change
    add_index :chats, :created_at, unique: true
  end
end
