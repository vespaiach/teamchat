# frozen_string_literal: true

class DevelopmentChannel < ApplicationCable::Channel
  def subscribed
    if Rails.env.development?
      stream_from 'development_channel'
    else
      reject
    end
  end
end
