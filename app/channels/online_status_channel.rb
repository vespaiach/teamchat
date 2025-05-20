# frozen_string_literal: true

class OnlineStatusChannel < ApplicationCable::Channel
  include OnlineStatus

  def subscribed
    user_online!(current_user.id)
    transmit(online_users!)
  end

  def unsubscribed; end

  # Users need to ping to maintain their online status
  def ping
    user_online!(current_user.id)
    transmit(online_users!)
  end
end
