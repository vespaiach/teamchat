# frozen_string_literal: true

class HomesController < ApplicationController
  def show
    @users = User.all
    @rooms = Room.includes(:users, :join_requests).order(:name).all
  end
end
