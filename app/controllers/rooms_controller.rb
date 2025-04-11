class RoomsController < ApplicationController
  def show
    @room = Room.eager_load(:users, chats: :user).find(params[:id])
  end
end
