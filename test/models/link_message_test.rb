require "test_helper"

class LinkMessageTest < ActiveSupport::TestCase
  test "should not save link message without custom_data url" do
    link_message = LinkMessage.new(sender: users(:alice), room: rooms(:general))
    assert_raises(ActiveRecord::RecordInvalid, "Url can't be blank") do
      link_message.save!
    end
  end

  test "should save valid link message" do
    link_message = LinkMessage.new(sender: users(:alice), room: rooms(:general), url: "https://example.com ")
    assert link_message.save
  end

  test "should get all link messages from fixtures" do
    link_messages = LinkMessage.all
    assert_includes link_messages, chats(:alice_link_message1)
    assert_includes link_messages, chats(:bob_link_message1)
    alice_message = link_messages.find { |msg| msg.id == chats(:alice_link_message1).id }
    assert_equal alice_message.url, "https://www.example.com"
    assert_equal alice_message.caption, "Example"
    assert_equal alice_message.description, "This is an example link message."
  end
end
