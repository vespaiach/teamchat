class UserChannel < ApplicationCable::Channel
  def subscribed
    reject_unauthorized_connection unless current_user
    stream_or_reject_for current_user
    current_user.update(online_status: true)
  end

  def unsubscribed
    current_user.update(online_status: false) if current_user
  end
end
