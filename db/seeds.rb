# frozen_string_literal: true

puts "🌱 Starting chat seeding with realistic conversations..."

trinh = User.create!([
  {
    first_name: "Trinh",
    last_name: "Nguyen  ",
    email: "nta.toan@gmail.com",
    password: "123456"
}])

Conversation.create!([
  {
    name: "General Discussion",
    is_group: true,
    is_public: true,
    created_by: trinh
  }])
