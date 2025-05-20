# frozen_string_literal: true

module OnlineStatus
  extend ActiveSupport::Concern

  private

  def user_online?(user_id)
    online_users![user_id]&.> 15.seconds.ago
  end

  def user_online!(user_id)
    users = online_users!
    users[user_id] = Time.current
    Rails.cache.write(cache_key, users)
  end

  # Unnecessary to call this method implicitly
  def user_offline!(user_id)
    users = online_users!
    users.delete(user_id)
    Rails.cache.write(cache_key, users)
  end

  def online_users!
    users = Rails.cache.fetch(cache_key) { {} }
    users = users.select do |user_id, last_seen_at|
      last_seen_at > 15.seconds.ago
    end
    Rails.cache.write(cache_key, users)
    users
  end

  def cache_key
    'list_of_online_users'
  end
end
