# frozen_string_literal: true

class PasswordResetsController < ApplicationController
  def new; end

  def instructions_sent; end

  def expired; end

  def create
    user = User.find_by(email: params[:email].downcase)
    if user
      user.generate_password_reset_token!
      PasswordResetMailer.with(user:).reset_email.deliver_now
      redirect_to instructions_sent_url
    else
      @server_notifications = [{ message: 'Email not found', type: 'error' }]
      render :new
    end
  end

  def edit
    @user = User.find_by(password_reset_token: params[:token])
    redirect_to reset_password_expired_url unless @user
  end


  def update
    @user = User.find_by(password_reset_token: params[:token])
    if @user&.update(password_params)
      @user.clear_password_reset_token!
      @server_notifications = [{ message: 'Password reset successfully', type: 'success' }]
      redirect_to signin_path
    else
      @server_notifications = [{ message: 'Failed to reset password', type: 'error' }]
      render :edit
    end
  end

  private

  def password_params
    params.permit(:password, :password_confirmation)
  end
end
