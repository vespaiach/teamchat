require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should not save user without first name" do
    user = User.new(last_name: "Doe", email: "john.doe@example.com", password: "password")
    assert_not user.save, "Saved the user without a first name"
  end

  test "should not save user without last name" do
    user = User.new(first_name: "John", email: "john.doe@example.com", password: "password")
    assert_not user.save, "Saved the user without a last name"
  end

  test "should not save user without email" do
    user = User.new(first_name: "John", last_name: "Doe", password: "password")
    assert_not user.save, "Saved the user without an email"
  end

  test "should not save user with invalid email" do
    user = User.new(first_name: "John", last_name: "Doe", email: "invalid_email", password: "password")
    assert_not user.save, "Saved the user with an invalid email"
  end

  test "should not save user with short password" do
    user = User.new(first_name: "John", last_name: "Doe", email: "john.doe@example.com", password: "123")
    assert_not user.save, "Saved the user with a short password"
  end

  test "should save valid user" do
    user = User.new(first_name: "John", last_name: "Doe", email: "john.doe@example.com", password: "password")
    assert user.save, "Failed to save a valid user"
  end

  # Relationship tests
  test "should return created rooms" do
    alice = users(:alice)
    assert_includes alice.created_rooms, rooms(:general)
    assert_not_includes alice.created_rooms, rooms(:random)
  end

  test "should return joined rooms" do
    bob = users(:bob)
    assert_includes bob.joined_rooms, rooms(:general)
    assert_includes bob.joined_rooms, rooms(:random)
    alice = users(:alice)
    assert_includes alice.joined_rooms, rooms(:general)
    assert_not_includes alice.joined_rooms, rooms(:random)
  end

  test "should return user chats" do
    alice = users(:alice)
    assert_includes alice.chats, chats(:alice_text_message)
    assert_includes alice.chats, chats(:alice_link_message)
    assert_not_includes alice.chats, chats(:bob_photo_message)
    bob = users(:bob)
    assert_includes bob.chats, chats(:bob_photo_message)
    assert_not_includes bob.chats, chats(:alice_text_message)
  end

  test "should return room created by" do
    alice = users(:alice)
    rooms = alice.created_rooms
    assert_equal rooms.count, 1
    assert_equal rooms.first.created_by, alice
    assert_not_equal rooms.first.created_by, users(:bob)
  end

  test "should return room joined by" do
    alice = users(:alice)
    rooms = alice.joined_rooms
    assert_equal rooms.count, 2
    assert_includes rooms, rooms(:general)
    assert_includes rooms, rooms(:random)
  end
end
