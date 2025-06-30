# frozen_string_literal: true

class SigninController < ApplicationController
  include OnlineStatus

  def new; end

  def create
    user = User.find_by(email: params[:email].downcase)
    if user&.authenticate(params[:password])
      session[:user_id] = user.id

      # Handle remember me with separate token
      if params[:remember_me] == 'true' || params[:remember_me] == true
        remember_token = user.generate_remember_token!
        cookies.permanent.signed[:_teamchat_remember_token] = remember_token
      end

      user_online!(current_user.id)
      redirect_to root_url
    else
      flash[:error] = 'Invalid email or password'
      render :new
    end
  end

  def destroy
    ActionCable.server.remote_connections.where(current_user:).disconnect

    # Clear remember token if user is signed in
    current_user&.clear_remember_token!

    # Clear both session and cookies to ensure ActionCable disconnects
    session[:user_id] = nil
    cookies.delete(:_teamchat_session)
    cookies.delete(:_teamchat_remember_token)

    flash[:success] = 'You have been logged out successfully.'
    redirect_to signin_path
  end
end
