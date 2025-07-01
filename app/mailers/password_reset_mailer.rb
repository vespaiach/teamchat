# frozen_string_literal: true

class PasswordResetMailer < ApplicationMailer
  include Rails.application.routes.url_helpers

  def reset_email
    @user = params[:user]
    @reset_url = reset_password_edit_url(token: @user.password_reset_token)
    mail(to: @user.email, subject: 'Password Reset Instructions')
  end
end
