class AddCompositeIndexToChats < ActiveRecord::Migration[8.0]
  def change
    # Add composite index for efficient pagination queries
    add_index :chats, [:room_id, :id], name: 'index_chats_on_room_id_and_id'

    # Add index for deleted_at if using soft deletes
    add_index :chats, :deleted_at
  end
end
