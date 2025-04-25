# frozen_string_literal: true

require "test_helper"

class PhotoMessageTest < ActiveSupport::TestCase
  test "should not save photo message without custom_data url" do
    photo_message = PhotoMessage.new(sender: users(:alice), room: rooms(:general))
    assert_raises(ActiveRecord::RecordInvalid, "Url can't be blank, Size can't be blank, Size is not a number") do
      photo_message.save!
    end
  end

  test "should save valid photo message" do
    photo_message = PhotoMessage.new(sender: users(:alice), room: rooms(:general), url: "https://example.com/photo.jpg", size: 1024)
    assert photo_message.save
  end

  test "should get all photo messages from fixtures" do
    photo_messages = PhotoMessage.all
    assert_includes photo_messages, chats(:alice_photo_message1)
    assert_includes photo_messages, chats(:bob_photo_message1)
  end
end
