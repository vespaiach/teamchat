# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  # allow_browser versions: :modern
  helper_method :current_user, :signed_in?

  before_action :require_login, if: -> { !%w[signin signup password_resets hot_reload].include?(controller_name) }

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def signed_in?
    !current_user.nil?
  end

  def require_login
    unless signed_in?
      redirect_to signin_path, alert: 'Please sign-in'
    end
  end
end
