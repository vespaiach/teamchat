# frozen_string_literal: true

class ProfilesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user

  def show
    # Just display the user's profile
  end

  def edit
    # Form to edit the profile
  end

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

  def authenticate_user!
    redirect_to signin_path, alert: 'You must be signed in to access this page.' unless current_user
  end
end
