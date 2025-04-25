# frozen_string_literal: true

require 'test_helper'

class UserChannelTest < ActionCable::Channel::TestCase
  def setup
    @user = users(:alice) # Assuming 'alice' is defined in test/fixtures/users.yml
  end

  test 'subscribes and streams for current_user' do
    stub_connection current_user: @user

    subscribe

    assert subscription.confirmed?
    assert_has_stream_for @user
    assert @user.reload.online_status
  end

  test 'rejects subscription without current_user' do
    stub_connection current_user: nil

    subscribe
    assert_not subscription.confirmed?
  end

  test 'unsubscribed sets online_status to false' do
    stub_connection current_user: @user

    subscribe
    assert @user.reload.online_status

    unsubscribe
    assert_not @user.reload.online_status
  end
end
