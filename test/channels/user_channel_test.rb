# frozen_string_literal: true

require 'test_helper'

class UserChannelTest < ActionCable::Channel::TestCase
  test 'subscribes and streams for a logged-in user' do
    user = users(:one) # Assuming a fixture or factory for users
    stub_connection current_user: user

    subscribe

    assert subscription.confirmed?
    assert_has_stream_for user
  end

  test 'rejects subscription for an unauthorized user' do
    stub_connection current_user: nil

    subscribe

    assert subscription.rejected?
  end

  test 'unsubscribes and updates user online status' do
    user = users(:one)
    stub_connection current_user: user

    subscribe
    assert user.reload.online_status

    unsubscribe
    assert_not user.reload.online_status
  end
end
