# frozen_string_literal: true

class UsersController < ApplicationController
  def avatar
    user = User.find(params[:id])
    if user.avatar.attached?
      # Serve the avatar image directly
      redirect_to rails_blob_path(user.avatar, disposition: 'attachment', only_path: true)
    else
      # Fallback to a default avatar if no avatar is attached
      redirect_to '/default_avatar.png'
    end
  rescue ActiveRecord::RecordNotFound
    render plain: 'User not found', status: :not_found
  rescue StandardError => e
    Rails.logger.error("Error serving avatar for user #{params[:id]}: #{e.message}")
    render plain: 'Internal server error', status: :internal_server_error
  end

  def index
    users = User.all
    render json: users.map(&:as_json), status: :ok
  end
end
