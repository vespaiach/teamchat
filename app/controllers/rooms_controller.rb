# frozen_string_literal: true

class RoomsController < ApplicationController
  def show
    @room = Room.eager_load(users: {}, chats: :sender).merge(Chat.order(:id)).find_by(id: params[:id])
    @joined = @room.users.include?(current_user) if @room
  end

  def index
    @all_rooms = Room.includes(:users).order(:name).all
    @joined_rooms = @all_rooms.select { |room| room.users.include?(current_user) }
    @not_joined_rooms = @all_rooms.reject { |room| room.users.include?(current_user) }
  end

  def create
    @room = Room.new(room_params)
    @room.user_id = current_user.id # Set the creator

    if @room.save
      # Automatically add creator to the room
      RoomUser.create!(room: @room, user: current_user)
      redirect_to room_path(@room), notice: 'Room was successfully created.'
    else
      # Re-render the index page with errors
      @all_rooms = Room.includes(:users).order(:name).all
      @joined_rooms = @all_rooms.select { |room| room.users.include?(current_user) }
      @not_joined_rooms = @all_rooms.reject { |room| room.users.include?(current_user) }
      render :index, status: :unprocessable_entity
    end
  end

  private

  def room_params
    params.require(:room).permit(:name)
  end
end
