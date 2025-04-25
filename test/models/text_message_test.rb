# frozen_string_literal: true

require 'test_helper'

class TextMessageTest < ActiveSupport::TestCase
  test 'should not save text message without content' do
    text_message = TextMessage.new(sender: users(:alice), room: rooms(:general))
    assert_raises(ActiveRecord::RecordInvalid, "Message can't be blank") do
      text_message.save!
    end
  end

  test 'should not save text message without sender' do
    text_message = TextMessage.new(message: 'Hello', room: rooms(:general))
    assert_raises(ActiveRecord::RecordInvalid, "Message can't be blank") do
      assert_not text_message.save!, "Sender must exist, Sender can't be blank"
    end
  end

  test 'should not save text message without room' do
    text_message = TextMessage.new(message: 'Hello', sender: users(:alice))
    assert_raises(ActiveRecord::RecordInvalid, "Room must exist, Room can't be blank") do
      text_message.save!
    end
  end

  test 'should save valid text message' do
    text_message = TextMessage.new(message: 'Hello', sender: users(:alice), room: rooms(:general))
    assert text_message.save
  end

  test 'get all test messages' do
    text_messages = TextMessage.all
    assert_includes text_messages, chats(:alice_text_message1)
    assert_includes text_messages, chats(:bob_text_message1)
  end
end
