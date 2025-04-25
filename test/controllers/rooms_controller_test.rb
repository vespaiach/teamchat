# frozen_string_literal: true

require 'test_helper'

class RoomsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:alice)
    @room = rooms(:general)
    sign_in_as(@user)
  end
end
