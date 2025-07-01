# frozen_string_literal: true

module OnlineStatus
  extend ActiveSupport::Concern
  include IdExtractor

  TIME_INTERVAL = 15.seconds
  ONLINE_USERS_CACHE_KEY = 'users_last_seen_at'

  def user_online?(user_or_user_id)
    id = extract_id(user_or_user_id)
    users_last_seen = get_users_last_seen_hash
    last_seen_at = users_last_seen[id.to_i]
    return false unless last_seen_at

    last_seen_at > TIME_INTERVAL.ago
  end

  def user_online!(user_or_user_id)
    id = extract_id(user_or_user_id)
    users_last_seen = get_users_last_seen_hash
    users_last_seen[id.to_i] = Time.current
    Rails.cache.write(ONLINE_USERS_CACHE_KEY, users_last_seen)
  end

  def offline!(user_or_user_id)
    id = extract_id(user_or_user_id)
    users_last_seen = get_users_last_seen_hash
    users_last_seen.delete(id.to_i)
    Rails.cache.write(ONLINE_USERS_CACHE_KEY, users_last_seen)
  end

  # Returns a list of online users
  def online_users!
    users_last_seen = get_users_last_seen_hash
    current_time = Time.current

    # Filter out users who are no longer online (based on time threshold)
    current_online_users = users_last_seen.select do |user_id, last_seen_at|
      last_seen_at > (current_time - TIME_INTERVAL)
    end

    # Update the cache to remove expired users
    if current_online_users.size != users_last_seen.size
      Rails.cache.write(ONLINE_USERS_CACHE_KEY, current_online_users)
    end

    # Return serialized data for transmission
    if current_online_users.any?
      current_online_users.keys
    else
      []
    end
  end

  private

  # Get the users last seen hash from cache
  def get_users_last_seen_hash
    Rails.cache.read(ONLINE_USERS_CACHE_KEY) || {}
  end
end
