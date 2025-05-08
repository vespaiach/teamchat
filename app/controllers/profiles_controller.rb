# frozen_string_literal: true

class ProfilesController < ApplicationController
  before_action :set_user

  def show; end

  def update
    if @user.update(user_params)
      redirect_to profile_path, notice: 'Your profile has been updated successfully!'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :avatar)
  end
end
