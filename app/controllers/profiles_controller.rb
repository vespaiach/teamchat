# frozen_string_literal: true

class ProfilesController < ApplicationController
  before_action :set_user

  def show; end

  def update
    if @user.update(user_params)
      render json: @user.reload.as_json, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :avatar, :time_zone, :role, :department)
  end
end
