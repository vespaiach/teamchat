# frozen_string_literal: true

class HotReloadController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    ActionCable.server.broadcast(
      'hot_reload',
      {
        event: 'assets_updated',
        changes: params[:changes] || []
      }
    )
    render json: {}, status: :ok
  end
end
