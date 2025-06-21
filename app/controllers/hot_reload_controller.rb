# frozen_string_literal: true

class HotReloadController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    ActionCable.server.broadcast('hot_reload', true)
    head :ok
  end
end
