# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  # allow_browser versions: :modern
  helper_method :current_user, :signed_in?, :server_notifications

  before_action :require_login, if: -> { !%w[signin signup password_resets hot_reload].include?(controller_name) }

  def current_user
    @current_user ||= (
      User.find_by(id: session[:user_id]) if session[:user_id]
    ) || authenticate_with_remember_token
  end

  def signed_in?
    !current_user.nil?
  end

  def require_login
    unless signed_in?
      flash[:alert] = 'Please sign-in'
      redirect_to signin_path
    end
  end

  def server_notifications
    notifications = []

    # Convert flash messages to notification format
    flash.each do |type, message|
      notifications << { message:, type: }
    end

    notifications
  end

  private

  def authenticate_with_remember_token
    return unless cookies.signed[:remember_token]

    user = User.find_by(remember_token: cookies.signed[:remember_token])

    if user&.remember_token_valid?
      session[:user_id] = user.id
      # Rotate token for security
      user.generate_remember_token!
      cookies.permanent.signed[:remember_token] = user.remember_token
      user
    else
      cookies.delete(:remember_token)
      nil
    end
  end
end
