# frozen_string_literal: true

class PasswordResetsController < ApplicationController
  def new; end

  def create
    user = User.find_by(email: params[:email].downcase)
    if user
      user.generate_password_reset_token!
      PasswordResetMailer.with(user:).reset_email.deliver_now
      redirect_to root_url, notice: 'Password reset instructions have been sent to your email.'
    else
      flash.now[:alert] = 'Email not found'
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @user = User.find_by(password_reset_token: params[:token])
    redirect_to root_url, alert: 'Invalid or expired token' unless @user
  end

  def update
    @user = User.find_by(password_reset_token: params[:token])
    if @user&.update(password_params)
      @user.clear_password_reset_token!
      redirect_to signin_path, notice: 'Password has been reset. Please sign in.'
    else
      flash.now[:alert] = 'Failed to reset password'
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def password_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end
