# frozen_string_literal: true

class UserChannel < ApplicationCable::Channel
  def subscribed
    return reject unless current_user
    stream_for current_user
    current_user.update(online_status: true)
  end

  def unsubscribed
    current_user.update(online_status: false) if current_user
  end
end
