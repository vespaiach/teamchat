class AddOnlineStatusToUserTable < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :online_status, :boolean, default: false, null: false
  end
end
