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

  def avatar
    if params[:avatar].present?
      # Validate file type
      allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      unless allowed_types.include?(params[:avatar].content_type)
        render json: { error: 'Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.' }, status: :bad_request
        return
      end

      # Validate file size (max 10MB)
      max_size = 10.megabytes
      if params[:avatar].size > max_size
        render json: { error: 'File size must be less than 10MB.' }, status: :bad_request
        return
      end

      @user.avatar.attach(params[:avatar])
      if @user.save
        render json: { message: 'Avatar uploaded successfully' }, status: :ok
      else
        render json: { error: 'Failed to save avatar' }, status: :unprocessable_entity
      end
    else
      render json: { error: 'No avatar file provided' }, status: :bad_request
    end
  rescue ActiveRecord::RecordNotFound
    render plain: 'User not found', status: :not_found
  rescue StandardError => e
    Rails.logger.error("Error handling avatar for user #{params[:id]}: #{e.message}")
    render plain: 'Internal server error', status: :internal_server_error
  end

  private

  def set_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :avatar, :time_zone, :role, :department)
  end
end
