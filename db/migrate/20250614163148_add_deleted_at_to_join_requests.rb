class AddDeletedAtToJoinRequests < ActiveRecord::Migration[8.0]
  def change
    add_column :join_requests, :deleted_at, :timestamptz
    add_index :join_requests, :deleted_at
  end
end
