# frozen_string_literal: true

class HotReloadChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'hot_reload'
  end
end
