# frozen_string_literal: true

class HotReloadChannel < ApplicationCable::Channel
  def subscribed
    if Rails.env.development?
      stream_from 'hot_reload'
      # ActionCable.server.broadcast('hot_reload', true)
    else
      reject
    end
  end
end
