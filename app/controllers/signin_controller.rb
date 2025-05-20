# frozen_string_literal: true

class SigninController < ApplicationController
  include OnlineStatus

  def new; end

  def create
    user = User.find_by(email: params[:email].downcase)
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      user_online!(current_user.id)
      redirect_to root_url, notice: 'Signed in!'
    else
      flash.now[:alert] = 'Invalid email or password'
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    ActionCable.server.remote_connections.where(current_user:).disconnect

    # Clear both session and cookies to ensure ActionCable disconnects
    session[:user_id] = nil
    cookies.delete(:_chat_chit_session)

    redirect_to root_url, notice: 'Logged out!'
  end
end
