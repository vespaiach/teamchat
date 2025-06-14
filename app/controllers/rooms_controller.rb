# frozen_string_literal: true

class RoomsController < ApplicationController
  include LoadChats

  helper_method :recent_chats_by_room

  def show
    @room = Room.eager_load(:users).find(params[:id])
    @joined = @room.users.include?(current_user) if @room

    unless @joined
      redirect_to rooms_path, alert: 'You must be a member to access this room.'
      nil
    end
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

  def join_request
    @room = Room.find(params[:id])

    # Check if user is already a member
    if @room.users.include?(current_user)
      redirect_to room_path(@room), notice: 'You are already a member of this room.'
      return
    end

    # TODO: Implement join request logic (e.g., send notification to room creator)
    # For now, we'll just show a success message
    redirect_to rooms_path, notice: 'Join request sent successfully.'
  end

  private

  def room_params
    params.require(:room).permit(:name)
  end
end
