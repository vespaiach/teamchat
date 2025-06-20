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
    @users = User.all
    @all_rooms = Room.includes(:users, :join_requests).order(:name).all
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
      render json: { error: 'You are already a member of this room.' }, status: :unprocessable_entity
      return
    end

    # Check if user already has a pending request
    existing_request = JoinRequest.find_by(user: current_user, room: @room)
    if existing_request&.pending?
      render json: { error: 'You already have a pending request for this room.' }, status: :unprocessable_entity
      return
    end

    # Create or update join request
    join_request = JoinRequest.find_or_initialize_by(user: current_user, room: @room)
    join_request.status = 'pending'
    join_request.message = params[:message] || "#{current_user.name} wants to join #{@room.name}"

    if join_request.save
      # TODO: Send notification to room creator
      render json: { message: 'Join request sent successfully.' }, status: :ok
    else
      render json: { error: join_request.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def join_requests
    @room = Room.find(params[:id])

    # Only room creator can view join requests
    unless @room.created_by == current_user
      redirect_to rooms_path, alert: 'You are not authorized to view join requests for this room.'
      return
    end

    @pending_requests = @room.join_requests.pending.includes(:user)
  end

  private

  def room_params
    params.require(:room).permit(:name)
  end
end
