class RoomsController < ApplicationController
  def show
    @room = Room.eager_load(:users, chats: :sender).find_by(id: params[:id])
    @joined = @room.users.include?(current_user)
  end

  def index
    @all_rooms = Room.includes(:users).order(:name).all
    @joined_rooms = @all_rooms.select { |room| room.users.include?(current_user) }
    @not_joined_rooms = @all_rooms.reject { |room| room.users.include?(current_user) }
  end
end
