# frozen_string_literal: true

class DevelopmentController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:manifest]

  def manifest
    return head :forbidden unless Rails.env.development?

    ActionCable.server.broadcast('development_channel', params[:manifest].as_json)
  end
end
